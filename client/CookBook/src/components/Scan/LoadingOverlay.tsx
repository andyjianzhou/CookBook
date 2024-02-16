import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingOverlay() {
    const messages = ["Almost done analyzing!", "Almost done serving!", "It's Sizzling!"];
    const [currentMessage, setCurrentMessage] = useState(messages[0]);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const cycleMessages = setInterval(() => {
            setCurrentMessage((prevMessage) => {
                const index = (messages.indexOf(prevMessage) + 1) % messages.length;
                setFade(false); 
                setTimeout(() => setFade(true), 1000); // After half the interval, start fading in the next message
                return messages[index];
            });
        }, 4000); // Change message every 4 seconds

        return () => clearInterval(cycleMessages);
    }, [messages]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        }}>
            <CircularProgress />
            <div style={{
                marginTop: '20px',
                color: '#1976d2',
                opacity: fade ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                fontSize: '1.25rem',
            }}>
                {currentMessage}
            </div>
        </div>
    );
}
