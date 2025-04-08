import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import DynamicTitle from './components/DynamicTitle';
import Error from './pages/Error';
import RegisterForm from './pages/RegisterForm';
import Recovery from './pages/Recovery';
import Login from './pages/Login';
import './App.css';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';

function App() {

    useEffect(() => {
        // // Funzione per ottenere il valore di un cookie
        // const getCookie = (name) => {
        //     const value = `; ${document.cookie}`;  // Preleva tutti i cookie
        //     const parts = value.split(`; ${name}=`);  // Cerca il cookie con il nome specificato
        //     if (parts.length === 2) return parts.pop().split(';').shift();  // Restituisce il valore del cookie
        // };

        // // Controlla se esiste l'auth_token nei cookie
        // const authToken = getCookie('auth_token');  // Ottieni l'auth_token dai cookie
        // // Se esiste l'auth_token, reindirizza l'utente alla dashboard
        // if (authToken) {
        //     window.location.href = 'https://app.huberway.com';
        // }
    }, []);
    return (
        <>
            <DynamicTitle />
            <Routes>
                <Route path="/account" element={<Login />} />
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/register-huberway" element={<RegisterForm />} />
                <Route path="/account/recovery" element={<Recovery />} />
                <Route path="/account/dashboard" element={<Dashboard />} />
                <Route path="/account/pricing" element={<Pricing />} />
                <Route path="*" element={<Error />} />
                {/* Rotta di fallback per gestire le pagine non trovate */}
            </Routes>
        </>
    );
}

export default App;
