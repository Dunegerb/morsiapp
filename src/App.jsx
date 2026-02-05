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
        // Check authentication status
        const unsubscribe = onAuthChange(async (firebaseUser) => {
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
                    await initializeAuth();
                } catch (error) {
                    console.error('Auto sign-in failed:', error);
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
