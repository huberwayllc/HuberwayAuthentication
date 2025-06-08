import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthData } from "./AuthData";

const Auth = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const { auth_token } = getAuthData();

            if (!auth_token) {
                throw new Error('No token');
            }

            // Puoi fare altre verifiche sul token se necessario
        } catch (err) {
            // Reindirizza alla login se il token non è valido o mancante
            window.location.href = 'https://app.huberway.com/account/login';
        }
    }, [navigate]);

    return <>{children}</>;
};

export default Auth;
