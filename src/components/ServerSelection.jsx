import React, { useState, useEffect } from 'react';
import { getServers } from '../services/firebase';
import { lightImpact } from '../utils/haptics';
import '../styles/server-selection.css';

// Servidores padrão caso Firebase não esteja configurado
const defaultServers = [
    { id: '1', name: 'Cigarro', icon: '🚭', description: 'Comunidade para quem quer parar de fumar', members: 1247 },
    { id: '2', name: 'Álcool', icon: '🍺', description: 'Apoio para superar o alcoolismo', members: 892 },
    { id: '3', name: 'Jogos de Azar', icon: '🎰', description: 'Recuperação de vício em apostas', members: 634 },
    { id: '4', name: 'Pornografia', icon: '🔞', description: 'Superando a dependência sexual', members: 2103 },
    { id: '5', name: 'Drogas', icon: '💊', description: 'Caminho para uma vida livre das drogas', members: 756 },
    { id: '6', name: 'Redes Sociais', icon: '📱', description: 'Controle do uso excessivo de redes sociais', members: 1589 },
    { id: '7', name: 'Compras Compulsivas', icon: '🛒', description: 'Gerenciando compulsão por compras', members: 421 },
    { id: '8', name: 'Videogames', icon: '🎮', description: 'Equilibrando o tempo de jogo', members: 987 }
];

function ServerSelection({ userProfile, onServerSelect }) {
    const [servers, setServers] = useState(defaultServers);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Try to get servers from Firebase
        const unsubscribe = getServers((firebaseServers) => {
            if (firebaseServers.length > 0) {
                setServers(firebaseServers);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleServerClick = async (server) => {
        // Haptic feedback ao selecionar servidor
        await lightImpact();
        onServerSelect(server);
    };

    const filteredServers = servers.filter(server =>
        server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="server-selection-container">
            <div className="server-header">
                <div className="user-info">
                    <div className="user-avatar">{userProfile.avatar}</div>
                    <div className="user-details">
                        <h3>{userProfile.name}</h3>
                        <p className="user-rank">{userProfile.rank}</p>
                    </div>
                </div>

                <div className="header-title">
                    <h1>MORSI</h1>
                    <p>Escolha sua comunidade</p>
                </div>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="🔍 Buscar comunidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Buscar comunidade"
                />
            </div>

            <div className="servers-grid">
                {filteredServers.map((server) => (
                    <div
                        key={server.id}
                        className="server-card"
                        onClick={() => handleServerClick(server)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleServerClick(server);
                            }
                        }}
                        aria-label={`Entrar na comunidade ${server.name}`}
                    >
                        <div className="server-icon">{server.icon}</div>
                        <div className="server-info">
                            <h3>{server.name}</h3>
                            <p className="server-description">{server.description}</p>
                            <div className="server-stats">
                                <span className="members-count">👥 {server.members.toLocaleString()} membros</span>
                            </div>
                        </div>
                        <div className="server-arrow">→</div>
                    </div>
                ))}
            </div>

            {filteredServers.length === 0 && (
                <div className="no-results">
                    <p>Nenhuma comunidade encontrada</p>
                    <p className="no-results-hint">Tente outros termos de busca</p>
                </div>
            )}
        </div>
    );
}

export default ServerSelection;
