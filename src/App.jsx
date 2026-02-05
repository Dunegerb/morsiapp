import React, { useState, useEffect } from 'react';
import { onAuthChange, initializeAuth } from './services/firebase';
import CreateIdentity from './components/CreateIdentity';
import ServerSelection from './components/ServerSelection';
import ServerView from './components/ServerView';
import './styles/app.css';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentScreen, setCurrentScreen] = useState('identity');
    const [userProfile, setUserProfile] = useState(null);
    const [selectedServer, setSelectedServer] = useState(null);

    useEffect(() => {
        // Timeout de segurança - se não conectar em 10 segundos, continua mesmo assim
        const safetyTimeout = setTimeout(() => {
            console.log('Timeout reached - continuing without Firebase auth');
            setLoading(false);
        }, 10000);

        // Check authentication status
        const unsubscribe = onAuthChange(async (firebaseUser) => {
            clearTimeout(safetyTimeout); // Cancelar timeout se conectou

            if (firebaseUser) {
                setUser(firebaseUser);

                // Check if user has profile in localStorage
                const savedProfile = localStorage.getItem('morsi_user_profile');
                if (savedProfile) {
                    const profile = JSON.parse(savedProfile);
                    setUserProfile(profile);
                    setCurrentScreen('serverSelection');
                }
            } else {
                // Sign in anonymously
                try {
                    await Promise.race([
                        initializeAuth(),
                        new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('Auth timeout')), 8000)
                        )
                    ]);
                } catch (error) {
                    console.error('Auto sign-in failed or timed out:', error);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleIdentityCreated = (profile) => {
        setUserProfile(profile);
        localStorage.setItem('morsi_user_profile', JSON.stringify(profile));
        setCurrentScreen('serverSelection');
    };

    const handleServerSelected = (server) => {
        setSelectedServer(server);
        setCurrentScreen('serverView');
    };

    const handleBackToServers = () => {
        setSelectedServer(null);
        setCurrentScreen('serverSelection');
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <h2>MORSI</h2>
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className="app">
            {currentScreen === 'identity' && (
                <CreateIdentity onComplete={handleIdentityCreated} />
            )}

            {currentScreen === 'serverSelection' && (
                <ServerSelection
                    userProfile={userProfile}
                    onServerSelect={handleServerSelected}
                />
            )}

            {currentScreen === 'serverView' && selectedServer && (
                <ServerView
                    server={selectedServer}
                    userProfile={userProfile}
                    onBack={handleBackToServers}
                />
            )}
        </div>
    );
}

export default App;
