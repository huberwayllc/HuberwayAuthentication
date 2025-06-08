// src/backend/api.js
import Cookies from 'js-cookie';
import { getAuthData } from "./AuthData";

const API_URL = 'https://api.huberway.com';

// Funzione per ottenere i dettagli dell'account
export const getAccountDetails = async () => {
    const { auth_token, email } = getAuthData();

    if (!auth_token) {
        throw new Error('No auth token found');
    }

    const response = await fetch(`${API_URL}/AuthController/accountDetails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_token: auth_token,  email: email }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch account details');
    }

    return await response.json();
};

// Funzione per ottenere i dettagli del sito web
export const getWebsiteDetails = async (website_id) => {

    const { auth_token } = getAuthData();

    if (!auth_token) {
        throw new Error('No auth token found');
    }

    const response = await fetch(`${API_URL}/WebsiteController/website`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_token: auth_token, website_id }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch website details');
    }

    return await response.json();
};


// Funzione per ottenere le app dei clienti in base all'utente
export const getClientApps = async (userId) => {
    const { auth_token } = getAuthData();

    if (!auth_token) {
        throw new Error('No auth token found');
    }

    const response = await fetch(`${API_URL}/AuthController/getClientApps`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_token: auth_token, user_id: userId }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch client apps');
    }

    return await response.json();
};

