import React, { useState } from 'react';
import { createUserProfile } from '../services/firebase';
import '../styles/create-identity.css';

function CreateIdentity({ onComplete }) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        avatar: '👤',
        addiction: ''
    });
    const [isAnimating, setIsAnimating] = useState(false);

    const avatars = ['👤', '😊', '🦸', '🧑', '👨', '👩', '🧔', '👱', '🧑‍💼', '🧑‍🎓', '🥷', '🦹'];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsAnimating(true);

        try {
            const userId = await createUserProfile({
                ...formData,
                cleanDays: 0,
                rank: 'Iniciante',
                joinedAt: new Date().toISOString()
            });

            setTimeout(() => {
                onComplete({
                    id: userId,
                    ...formData,
                    cleanDays: 0,
                    rank: 'Iniciante'
                });
            }, 2000);
        } catch (error) {
            console.error('Error creating profile:', error);
            setIsAnimating(false);
        }
    };

    const canProceed = () => {
        switch (step) {
            case 0: return formData.name.trim().length > 0;
            case 1: return formData.age.trim().length > 0;
            case 2: return true; // Avatar always has default
            case 3: return formData.addiction.trim().length > 0;
            default: return false;
        }
    };

    if (isAnimating) {
        return (
            <div className="identity-container animating">
                <div className="identity-card-animation">
                    <div className="id-card">
                        <div className="id-header">MORSI ID</div>
                        <div className="id-avatar">{formData.avatar}</div>
                        <div className="id-field">
                            <span className="id-label">Nome:</span>
                            <span className="id-value typing">{formData.name}</span>
                        </div>
                        <div className="id-field">
                            <span className="id-label">Idade:</span>
                            <span className="id-value typing delay-1">{formData.age}</span>
                        </div>
                        <div className="id-field">
                            <span className="id-label">Vício:</span>
                            <span className="id-value typing delay-2">{formData.addiction}</span>
                        </div>
                        <div className="id-field">
                            <span className="id-label">Dias Limpo:</span>
                            <span className="id-value typing delay-3">0</span>
                        </div>
                        <div className="id-field">
                            <span className="id-label">Patente:</span>
                            <span className="id-value typing delay-4">Iniciante</span>
                        </div>
                        <div className="id-stamp">✓ VERIFICADO</div>
                    </div>
                </div>
                <p className="creating-text">Criando sua identidade...</p>
            </div>
        );
    }

    return (
        <div className="identity-container">
            <div className="identity-header">
                <h1 className="logo">MORSI</h1>
                <p className="tagline">Sua jornada de superação começa aqui</p>
            </div>

            <div className="progress-bar">
                <div className="progress" style={{ width: `${((step + 1) / 4) * 100}%` }}></div>
            </div>

            <div className="identity-form">
                {step === 0 && (
                    <div className="form-step fade-in">
                        <h2>Qual é o seu nome?</h2>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Digite seu nome"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            autoFocus
                        />
                    </div>
                )}

                {step === 1 && (
                    <div className="form-step fade-in">
                        <h2>Quantos anos você tem?</h2>
                        <input
                            type="number"
                            className="input-field"
                            placeholder="Sua idade"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            autoFocus
                        />
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step fade-in">
                        <h2>Escolha seu avatar</h2>
                        <div className="avatar-grid">
                            {avatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    className={`avatar-option ${formData.avatar === avatar ? 'selected' : ''}`}
                                    onClick={() => handleInputChange('avatar', avatar)}
                                >
                                    {avatar}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step fade-in">
                        <h2>Qual vício você quer superar?</h2>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Ex: Cigarro, Álcool, Jogos..."
                            value={formData.addiction}
                            onChange={(e) => handleInputChange('addiction', e.target.value)}
                            autoFocus
                        />
                    </div>
                )}
            </div>

            <div className="form-actions">
                {step > 0 && (
                    <button className="btn-secondary" onClick={() => setStep(step - 1)}>
                        Voltar
                    </button>
                )}
                <button
                    className="btn-primary"
                    onClick={handleNext}
                    disabled={!canProceed()}
                >
                    {step < 3 ? 'Próximo' : 'Criar Identidade'}
                </button>
            </div>
        </div>
    );
}

export default CreateIdentity;
