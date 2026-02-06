/**
 * MORSI Haptics Utility
 * Padrões de vibração tátel sincronizados com feedback visual
 * Baseado em princípios de feedback multicanal
 */

import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/**
 * Verifica se o dispositivo suporta haptics
 */
const isHapticsAvailable = async () => {
    try {
        // Tentar executar um haptic silencioso para verificar suporte
        await Haptics.impact({ style: ImpactStyle.Light });
        return true;
    } catch (error) {
        console.log('Haptics not available on this device');
        return false;
    }
};

/**
 * Feedback tátil leve - para interações comuns
 * Uso: tap em botão, seleção de item
 */
export const lightImpact = async () => {
    try {
        await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
        // Falha silenciosa - device não suporta
    }
};

/**
 * Feedback tátil médio - para ações importantes
 * Uso: enviar mensagem, confirmar ação
 */
export const mediumImpact = async () => {
    try {
        await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
        // Falha silenciosa
    }
};

/**
 * Feedback tátil forte - para avisos
 * Uso: antes de ação destrutiva, erro crítico
 */
export const heavyImpact = async () => {
    try {
        await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
        // Falha silenciosa
    }
};

/**
 * Notificação de sucesso
 * Uso: completou step, subiu de patente, ação bem-sucedida
 */
export const successNotification = async () => {
    try {
        await Haptics.notification({ type: NotificationType.Success });
    } catch (error) {
        // Falha silenciosa
    }
};

/**
 * Notificação de warning
 * Uso: erro não crítico, atenção necessária
 */
export const warningNotification = async () => {
    try {
        await Haptics.notification({ type: NotificationType.Warning });
    } catch (error) {
        // Falha silenciosa
    }
};

/**
 * Notificação de erro
 * Uso: erro crítico, ação falhou
 */
export const errorNotification = async () => {
    try {
        await Haptics.notification({ type: NotificationType.Error });
    } catch (error) {
        // Falha silenciosa
    }
};

/**
 * Vibração customizada com padrão específico
 * @param {number} duration - Duração em ms
 */
export const customVibrate = async (duration = 200) => {
    try {
        await Haptics.vibrate({ duration });
    } catch (error) {
        // Falha silenciosa
    }
};

/**
 * Seleção - feedback ao navegar por lista
 * Uso: swipe entre itens, scroll com snap
 */
export const selectionChanged = async () => {
    try {
        await Haptics.selectionChanged();
    } catch (error) {
        // Falha silenciosa
    }
};

export default {
    lightImpact,
    mediumImpact,
    heavyImpact,
    successNotification,
    warningNotification,
    errorNotification,
    customVibrate,
    selectionChanged,
    isHapticsAvailable,
};
