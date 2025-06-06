import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        //const authToken = Cookies.get('auth_token');
         const authToken = ['774766dc33eb73f3abcbb0b19a4f46f4'];
        
        if (!authToken) {
            // Se non c'è il token, reindirizza alla pagina di login
            window.location.href = 'https://app.huberway.com/account/login';
        } else {
            // Qui puoi fare un'ulteriore verifica del token se necessario
            // oppure continuare a mostrare il contenuto dell'applicazione
        }
    }, [navigate]);

    return <>{children}</>;
};

export default Auth;
