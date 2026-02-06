import React, { useState } from 'react';
import './Input.css';

/**
 * Componente Input com estados evidentes
 * - Feedback visual imediato
 * - Label flutuante para contexto persistente
 * - Estados claros (empty, filled, focused, error, disabled)
 * - Validação visual
 */
const Input = ({
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
    error,
    disabled = false,
    maxLength,
    showCharCount = false,
    autoFocus = false,
    className = '',
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;
    const hasError = error && error.length > 0;

    const inputClass = `
    input
    ${hasValue ? 'input--filled' : ''}
    ${isFocused ? 'input--focused' : ''}
    ${hasError ? 'input--error' : ''}
    ${disabled ? 'input--disabled' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <div className="input-wrapper">
            <div className="input-container">
                <input
                    type={type}
                    className={inputClass}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={maxLength}
                    autoFocus={autoFocus}
                    aria-label={label}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${label}-error` : undefined}
                    {...props}
                />

                {label && (
                    <label className={`input-label ${hasValue || isFocused ? 'input-label--floating' : ''}`}>
                        {label}
                    </label>
                )}

                {/* Ícone de validação */}
                {hasValue && !hasError && !disabled && (
                    <span className="input-icon input-icon--success" aria-hidden="true">
                        ✓
                    </span>
                )}

                {hasError && (
                    <span className="input-icon input-icon--error" aria-hidden="true">
                        ⚠
                    </span>
                )}
            </div>

            {/* Character count */}
            {showCharCount && maxLength && (
                <div className="input-char-count">
                    {value?.length || 0} / {maxLength}
                </div>
            )}

            {/* Error message */}
            {hasError && (
                <div className="input-error" id={`${label}-error`} role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Input;
