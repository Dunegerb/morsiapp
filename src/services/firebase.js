import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, serverTimestamp, where } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration - VOCÊ PRECISA SUBSTITUIR COM SUAS CREDENCIAIS
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

let app;
let db;
let auth;
let messaging;

export const initializeFirebase = () => {
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);

        // Messaging only works in browser with HTTPS
        if (typeof window !== 'undefined' && 'Notification' in window) {
            try {
                messaging = getMessaging(app);
            } catch (err) {
                console.log('Messaging not available:', err);
            }
        }

        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Firebase initialization error:', error);
    }
};

export const signInUser = async () => {
    try {
        const result = await signInAnonymously(auth);
        return result.user;
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
};

export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// User Profile
export const createUserProfile = async (userData) => {
    try {
        const docRef = await addDoc(collection(db, 'users'), {
            ...userData,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
};

// Server (Community) functions
export const getServers = (callback) => {
    const q = query(collection(db, 'servers'), orderBy('name'));
    return onSnapshot(q, (snapshot) => {
        const servers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(servers);
    });
};

// Counter functions
export const updateUserCounter = async (userId, days) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            cleanDays: days,
            lastUpdate: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating counter:', error);
        throw error;
    }
};

// Chat functions
export const sendMessage = async (serverId, message, userId, userName) => {
    try {
        await addDoc(collection(db, 'messages'), {
            serverId,
            message,
            userId,
            userName,
            timestamp: serverTimestamp(),
            mentions: extractMentions(message)
        });
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const getMessages = (serverId, callback) => {
    const q = query(
        collection(db, 'messages'),
        where('serverId', '==', serverId),
        orderBy('timestamp', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(messages);
    });
};

const extractMentions = (text) => {
    const mentionRegex = /@(\w+)/g;
    const mentions = [];
    let match;

    while ((match = mentionRegex.exec(text)) !== null) {
        mentions.push(match[1]);
    }

    return mentions;
};

// Push Notifications
export const requestNotificationPermission = async () => {
    if (!messaging) return null;

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging, {
                vapidKey: 'YOUR_VAPID_KEY'
            });
            return token;
        }
    } catch (error) {
        console.error('Notification permission error:', error);
    }
    return null;
};

export const onMessageReceived = (callback) => {
    if (!messaging) return () => { };
    return onMessage(messaging, callback);
};

export { db, auth };
