import Cookies from 'js-cookie';

const DEV_MODE = true; // ✅ Imposta `true` per la modalità sviluppo

const DEV_AUTH = {
    auth_token: '774766dc33eb73f3abcbb0b19a4f46f4',
    email: 'hello@huberway.com'
};

export const getAuthData = () => {
    if (DEV_MODE) {
        return DEV_AUTH;
    }

    const auth_token = Cookies.get('auth_token') || localStorage.getItem('auth_token');
    const email = Cookies.get('user_email') || localStorage.getItem('user_email');

    if (!auth_token) {
        throw new Error('No auth token found');
    }

    return { auth_token, email };
};
