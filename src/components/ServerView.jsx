import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, getMessages } from '../services/firebase';
import Button from './ui/Button';
import { lightImpact, mediumImpact, successNotification } from '../utils/haptics';
import '../styles/server-view.css';

const RANKS = [
    { name: 'Iniciante', minDays: 0, icon: '🌱', color: '#8B4513' },
    { name: 'Determinado', minDays: 7, icon: '🔥', color: '#FF6B35' },
    { name: 'Persistente', minDays: 30, icon: '⚡', color: '#F7931E' },
    { name: 'Guerreiro', minDays: 60, icon: '⚔️', color: '#FFC107' },
    { name: 'Veterano', minDays: 90, icon: '🛡️', color: '#4CAF50' },
    { name: 'Mestre', minDays: 180, icon: '👑', color: '#2196F3' },
    { name: 'Lenda', minDays: 300, icon: '🏆', color: '#9C27B0' },
];

function ServerView({ server, userProfile, onBack }) {
    const [cleanDays, setCleanDays] = useState(() => {
        const saved = localStorage.getItem(`morsi_clean_days_${server.id}`);
        return saved ? parseInt(saved) : 0;
    });

    const [startDate, setStartDate] = useState(() => {
        const saved = localStorage.getItem(`morsi_start_date_${server.id}`);
        return saved ? new Date(saved) : new Date();
    });

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Calculate days automatically
        const interval = setInterval(() => {
            const now = new Date();
            const diff = now - startDate;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            setCleanDays(days);
            localStorage.setItem(`morsi_clean_days_${server.id}`, days.toString());
        }, 1000 * 60); // Update every minute

        return () => clearInterval(interval);
    }, [startDate, server.id]);

    useEffect(() => {
        // Listen to messages
        const unsubscribe = getMessages(server.id, (newMessages) => {
            setMessages(newMessages.reverse());
        });

        return () => unsubscribe();
    }, [server.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const getCurrentRank = () => {
        for (let i = RANKS.length - 1; i >= 0; i--) {
            if (cleanDays >= RANKS[i].minDays) {
                return RANKS[i];
            }
        }
        return RANKS[0];
    };

    const getNextRank = () => {
        const currentRank = getCurrentRank();
        const currentIndex = RANKS.findIndex(r => r.name === currentRank.name);
        return currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : null;
    };

    const getProgressToNextRank = () => {
        const nextRank = getNextRank();
        if (!nextRank) return 100;

        const currentRank = getCurrentRank();
        const range = nextRank.minDays - currentRank.minDays;
        const progress = cleanDays - currentRank.minDays;
        return (progress / range) * 100;
    };

    const handleReset = async () => {
        // Haptic forte antes de ação destrutiva
        await mediumImpact();

        if (confirm('Tem certeza que deseja resetar sua contagem? Essa ação não pode ser desfeita.')) {
            const newStart = new Date();
            setStartDate(newStart);
            setCleanDays(0);
            localStorage.setItem(`morsi_start_date_${server.id}`, newStart.toISOString());
            localStorage.setItem(`morsi_clean_days_${server.id}`, '0');
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageText = replyingTo
            ? `@${replyingTo.userName} ${newMessage}`
            : newMessage;

        try {
            // Haptic de sucesso ao enviar mensagem
            await successNotification();

            await sendMessage(server.id, messageText, userProfile.id, userProfile.name);
            setNewMessage('');
            setReplyingTo(null);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleReply = async (message) => {
        await lightImpact();
        setReplyingTo(message);
        setNewMessage('');
    };

    const handleMention = async (userName) => {
        await lightImpact();
        setNewMessage(prev => `${prev}@${userName} `);
    };

    const currentRank = getCurrentRank();
    const nextRank = getNextRank();
    const progress = getProgressToNextRank();

    return (
        <div className="server-view-container">
            <div className="server-header-bar">
                <Button
                    variant="secondary"
                    onClick={onBack}
                    ariaLabel="Voltar para seleção de comunidades"
                >
                    ← Voltar
                </Button>
                <div className="server-title">
                    <span className="server-icon-small">{server.icon}</span>
                    <h2>{server.name}</h2>
                </div>
            </div>

            <div className="counter-section">
                <div className="counter-main">
                    <div className="days-display">
                        <span className="days-number">{cleanDays}</span>
                        <span className="days-label">dias limpo</span>
                    </div>

                    <div className="rank-display">
                        <div className="current-rank" style={{ color: currentRank.color }}>
                            <span className="rank-icon">{currentRank.icon}</span>
                            <span className="rank-name">{currentRank.name}</span>
                        </div>
                    </div>

                    {nextRank && (
                        <div className="rank-progress">
                            <div className="progress-info">
                                <span>Próxima patente: {nextRank.icon} {nextRank.name}</span>
                                <span>{nextRank.minDays - cleanDays} dias restantes</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: `${progress}%`,
                                        backgroundColor: nextRank.color
                                    }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <Button
                        variant="danger"
                        onClick={handleReset}
                        ariaLabel="Resetar contagem de dias limpos"
                    >
                        🔄 Resetar Contagem
                    </Button>
                </div>

                <div className="ranks-sidebar">
                    <h3>Patentes</h3>
                    <div className="ranks-list">
                        {RANKS.map((rank, index) => (
                            <div
                                key={index}
                                className={`rank-item ${cleanDays >= rank.minDays ? 'unlocked' : 'locked'}`}
                                style={{ borderColor: rank.color }}
                            >
                                <span className="rank-item-icon">{rank.icon}</span>
                                <div className="rank-item-info">
                                    <span className="rank-item-name">{rank.name}</span>
                                    <span className="rank-item-days">{rank.minDays}+ dias</span>
                                </div>
                                {cleanDays >= rank.minDays && <span className="unlocked-badge">✓</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="chat-section">
                <h3 className="chat-title">💬 Chat da Comunidade</h3>

                <div className="messages-container">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.userId === userProfile.id ? 'own-message' : ''}`}
                        >
                            <div className="message-header">
                                <span className="message-author">{message.userName}</span>
                                <span className="message-time">
                                    {message.timestamp?.toDate?.()?.toLocaleTimeString('pt-BR', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            <div className="message-content">
                                {message.message.split(/(@\w+)/g).map((part, i) =>
                                    part.startsWith('@') ? (
                                        <span
                                            key={i}
                                            className="mention"
                                            onClick={() => handleMention(part.slice(1))}
                                        >
                                            {part}
                                        </span>
                                    ) : (
                                        <span key={i}>{part}</span>
                                    )
                                )}
                            </div>
                            {message.userId !== userProfile.id && (
                                <button
                                    className="reply-button"
                                    onClick={() => handleReply(message)}
                                >
                                    ↩️ Responder
                                </button>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="message-input-container">
                    {replyingTo && (
                        <div className="replying-banner">
                            <span>Respondendo a {replyingTo.userName}</span>
                            <button onClick={() => setReplyingTo(null)}>✕</button>
                        </div>
                    )}
                    <div className="message-input-box">
                        <input
                            type="text"
                            className="message-input"
                            placeholder="Digite sua mensagem..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="send-button" onClick={handleSendMessage}>
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServerView;
