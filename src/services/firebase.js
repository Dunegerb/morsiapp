import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
    updateDoc,
    serverTimestamp,
    addDoc
} from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzyaweStPTj9CPMNbNKUC61vkJzFbz8GU",
    authDomain: "morsi-efc10.firebaseapp.com",
    projectId: "morsi-efc10",
    storageBucket: "morsi-efc10.firebasestorage.app",
    messagingSenderId: "697690891939",
    appId: "1:697690891939:web:8a1a3c4bbc798a4e99c116"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let messaging = null;

// Initialize messaging only in supported environments
try {
    messaging = getMessaging(app);
} catch (error) {
    console.log('Firebase Messaging not supported in this environment');
}

// ============================================
// AUTHENTICATION
// ============================================
export const initializeAuth = async () => {
    try {
        const userCredential = await signInAnonymously(auth);
        return userCredential.user;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

export const getCurrentUser = () => {
    return auth.currentUser;
};

export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// ============================================
// USER PROFILE
// ============================================
export const saveUserProfile = async (profileData) => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('No user logged in');

        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
            ...profileData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return { ...profileData, userId: user.uid };
    } catch (error) {
        console.error('Error saving profile:', error);
        throw error;
    }
};

export const getUserProfile = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return { id: userSnap.id, ...userSnap.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (userId, updates) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        return updates;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

// ============================================
// SERVERS/COMMUNITIES
// ============================================
const DEFAULT_SERVERS = [
    { id: 'cigarette', name: 'Cigarro', icon: '🚬', memberCount: 0 },
    { id: 'alcohol', name: 'Álcool', icon: '🍺', memberCount: 0 },
    { id: 'gambling', name: 'Jogos de Azar', icon: '🎰', memberCount: 0 },
    { id: 'pornography', name: 'Pornografia', icon: '🔞', memberCount: 0 },
    { id: 'drugs', name: 'Drogas', icon: '💊', memberCount: 0 },
    { id: 'social-media', name: 'Redes Sociais', icon: '📱', memberCount: 0 },
    { id: 'shopping', name: 'Compras Compulsivas', icon: '🛍️', memberCount: 0 },
    { id: 'gaming', name: 'Videogames', icon: '🎮', memberCount: 0 }
];

export const getServers = async () => {
    return DEFAULT_SERVERS;
};

export const getServerById = async (serverId) => {
    return DEFAULT_SERVERS.find(s => s.id === serverId);
};

export const joinServer = async (userId, serverId) => {
    try {
        await updateUserProfile(userId, {
            serverId: serverId,
            joinedAt: serverTimestamp(),
            startDate: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('Error joining server:', error);
        throw error;
    }
};

// ============================================
// COUNTER / DAYS TRACKING
// ============================================
export const resetCounter = async (userId, serverId) => {
    try {
        await updateUserProfile(userId, {
            startDate: new Date().toISOString(),
            lastReset: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error resetting counter:', error);
        throw error;
    }
};

export const getDaysCount = (startDate) => {
    if (!startDate) return 0;

    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

// ============================================
// CHAT / MESSAGES
// ============================================
export const getMessages = async (serverId) => {
    try {
        const messagesRef = collection(db, 'servers', serverId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting messages:', error);
        return [];
    }
};

export const sendMessage = async (serverId, messageData) => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('No user logged in');

        const messagesRef = collection(db, 'servers', serverId, 'messages');
        const messageDoc = await addDoc(messagesRef, {
            ...messageData,
            authorId: user.uid,
            timestamp: serverTimestamp(),
            createdAt: new Date().toISOString()
        });

        return { id: messageDoc.id, ...messageData };
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const subscribeToMessages = (serverId, callback) => {
    try {
        const messagesRef = collection(db, 'servers', serverId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        return onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(messages);
        });
    } catch (error) {
        console.error('Error subscribing to messages:', error);
        return () => { };
    }
};

// ============================================
// PUSH NOTIFICATIONS
// ============================================
export const requestNotificationPermission = async () => {
    try {
        if (!messaging) {
            console.log('Messaging not supported');
            return null;
        }

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging, {
                vapidKey: 'YOUR_VAPID_KEY' // You'll need to generate this in Firebase Console
            });
            return token;
        }
        return null;
    } catch (error) {
        console.error('Error getting notification permission:', error);
        return null;
    }
};

export const subscribeToTopic = async (topic) => {
    // This requires a backend function to subscribe the token to a topic
    // For now, just log it
    console.log('Subscribe to topic:', topic);
    return true;
};

export const onMessageReceived = (callback) => {
    if (!messaging) return () => { };

    return onMessage(messaging, (payload) => {
        console.log('Message received:', payload);
        callback(payload);
    });
};

// ============================================
// INITIALIZATION
// ============================================
export const initializeFirebase = async () => {
    try {
        const user = await initializeAuth();
        console.log('Firebase initialized successfully');
        return user;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        throw error;
    }
};

export default {
    initializeAuth,
    getCurrentUser,
    onAuthChange,
    saveUserProfile,
    getUserProfile,
    updateUserProfile,
    getServers,
    getServerById,
    joinServer,
    resetCounter,
    getDaysCount,
    getMessages,
    sendMessage,
    subscribeToMessages,
    requestNotificationPermission,
    subscribeToTopic,
    onMessageReceived,
    initializeFirebase
};
