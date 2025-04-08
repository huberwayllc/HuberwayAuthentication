// src/backend/api.js
import Cookies from 'js-cookie';

const API_URL = 'https://api.huberway.com';

// Funzione per ottenere i dettagli dell'account
export const getAccountDetails = async () => {
    // const authToken = Cookies.get('auth_token');


     const authToken = '774766dc33eb73f3abcbb0b19a4f46f4';

    if (!authToken) {
        throw new Error('No auth token found');
    }

    const response = await fetch(`${API_URL}/AuthController/accountDetails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_token: authToken }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch account details');
    }

    return await response.json();
};

// Funzione per ottenere i dettagli del sito web
export const getWebsiteDetails = async (website_id) => {
    const authToken = Cookies.get('auth_token');


    // const authToken = '774766dc33eb73f3abcbb0b19a4f46f4';

    if (!authToken) {
        throw new Error('No auth token found');
    }

    const response = await fetch(`${API_URL}/WebsiteController/website`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_token: authToken, website_id }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch website details');
    }

    return await response.json();
};


// Funzione per ottenere le app dei clienti in base all'utente
export const getClientApps = async (userId) => {
    const authToken = Cookies.get('auth_token');


    // const authToken = '774766dc33eb73f3abcbb0b19a4f46f4';
    if (!authToken) {
        throw new Error('No auth token found');
    }

    const response = await fetch(`${API_URL}/AuthController/getClientApps`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_token: authToken, user_id: userId }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch client apps');
    }

    return await response.json();
};

