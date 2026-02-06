import React, { useState } from 'react';
import { saveUserProfile } from '../services/firebase';
import Button from './ui/Button';
import { successNotification, lightImpact } from '../utils/haptics';
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

    const handleNext = async () => {
        // Haptic feedback em cada step
        await lightImpact();

        if (step < 3) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = async () => {
        await lightImpact();
        setStep(step - 1);
    };

    const handleAvatarSelect = async (avatar) => {
        await lightImpact();
        handleInputChange('avatar', avatar);
    };

    const handleSubmit = async () => {
        setIsAnimating(true);

        // Haptic de sucesso ao completar
        await successNotification();

        try {
            const profile = await saveUserProfile({
                ...formData,
                cleanDays: 0,
                rank: 'Iniciante',
                joinedAt: new Date().toISOString()
            });

            setTimeout(() => {
                onComplete({
                    id: profile.userId,
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
                            <span className="id-value">{formData.name}</span>
                        </div>
                        <div className="id-field">
                            <span className="id-label">Idade:</span>
                            <span className="id-value">{formData.age}</span>
                        </div>
                        <div className="id-field">
                            <span className="id-label">Vício:</span>
                            <span className="id-value">{formData.addiction}</span>
                        </div>
                        <div className="id-field">
                            <span className="id-label">Dias Limpo:</span>
                            <span className="id-value">0</span>
                        </div>
                        <div className="id-field">
                            <span className="id-label">Patente:</span>
                            <span className="id-value">Iniciante</span>
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

            <div className="progress-bar" role="progressbar" aria-valuenow={((step + 1) / 4) * 100} aria-valuemin="0" aria-valuemax="100">
                <div className="progress" style={{ width: `${((step + 1) / 4) * 100}%` }}></div>
            </div>

            <div className="identity-form">
                {step === 0 && (
                    <div className="form-step" key="step-0">
                        <h2>Qual é o seu nome?</h2>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Digite seu nome"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                            autoFocus
                            aria-label="Digite seu nome"
                        />
                    </div>
                )}

                {step === 1 && (
                    <div className="form-step" key="step-1">
                        <h2>Quantos anos você tem?</h2>
                        <input
                            type="number"
                            className="input-field"
                            placeholder="Sua idade"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                            autoFocus
                            min="1"
                            max="120"
                            aria-label="Digite sua idade"
                        />
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step" key="step-2">
                        <h2>Escolha seu avatar</h2>
                        <div className="avatar-grid" role="radiogroup" aria-label="Escolha seu avatar">
                            {avatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    className={`avatar-option ${formData.avatar === avatar ? 'selected' : ''}`}
                                    onClick={() => handleAvatarSelect(avatar)}
                                    role="radio"
                                    aria-checked={formData.avatar === avatar}
                                    tabIndex={0}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleAvatarSelect(avatar);
                                        }
                                    }}
                                >
                                    {avatar}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step" key="step-3">
                        <h2>Qual vício você quer superar?</h2>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Ex: Cigarro, Álcool, Jogos..."
                            value={formData.addiction}
                            onChange={(e) => handleInputChange('addiction', e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                            autoFocus
                            aria-label="Digite o vício que você quer superar"
                        />
                    </div>
                )}
            </div>

            <div className="form-actions">
                {step > 0 && (
                    <Button
                        variant="secondary"
                        onClick={handleBack}
                        ariaLabel="Voltar para etapa anterior"
                    >
                        ← Voltar
                    </Button>
                )}
                <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    ariaLabel={step < 3 ? 'Próxima etapa' : 'Criar identidade'}
                >
                    {step < 3 ? 'Próximo →' : 'Criar Identidade'}
                </Button>
            </div>
        </div>
    );
}

export default CreateIdentity;
