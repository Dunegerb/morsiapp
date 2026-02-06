import React from 'react';
import { lightImpact } from '../../utils/haptics';
import './Button.css';

/**
 * Componente Button com feedback multicanal
 * - Estados visuais claros
 * - Feedback háptico sincronizado
 * - Áreas tocáveis generosas (Lei de Fitts)
 * - Acessibilidade completa
 */
const Button = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    loading = false,
    type = 'button',
    className = '',
    ariaLabel,
    ...props
}) => {
    const handleClick = async (e) => {
        if (disabled || loading) return;

        // Haptic feedback
        await lightImpact();

        // Callback
        if (onClick) {
            onClick(e);
        }
    };

    const buttonClass = `
    button
    button--${variant}
    ${loading ? 'button--loading' : ''}
    ${disabled ? 'button--disabled' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={handleClick}
            disabled={disabled || loading}
            aria-label={ariaLabel}
            aria-busy={loading}
            {...props}
        >
            {loading && (
                <span className="button__spinner" aria-hidden="true">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                </span>
            )}
            <span className={loading ? 'button__text--hidden' : ''}>
                {children}
            </span>
        </button>
    );
};

export default Button;
