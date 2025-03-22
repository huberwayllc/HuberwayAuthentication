// src/components/AccountDetails.js
import React, { useEffect, useState } from 'react';
import { getAccountDetails } from '../backend/api';

const AccountDetails = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        getAccountDetails()
            .then(data => {
                setUsername(data.data.username);
            })
            .catch(error => {
                console.error('Errore nel recupero dei dettagli dell\'account:', error);
                // Potresti gestire la redirezione alla pagina di login qui se il token è invalido
            });
    }, []);

    return (
        <div class="user-menu">
            <ul>
                <li>
                    <a href="#"><i class="fas fa-question-circle"></i></a>
                </li>
                <li>
                    <a href="#"><i class="fas fa-bell"></i></a>
                </li>
                <li class="profile">
                    <a class="" href="#" id="account_detail_username">Hello, {username}</a>
                    <a class="" href="#" id="account_detail_mobile"><i class="fas fa-user"></i></a>
                    <ul class="dropdown">
                        <li>
                            <a href="#" data-ajax="edit-profile" >
                                <b id="dropdown_username">{username}</b>
                                Edit Profile
                            </a>
                        </li>
                        <li>
                            <a href="#" data-ajax="settings" >My Account</a>
                        </li>
                        <li>
                            <a href="https://app.huberway.org/account/logout" data-ajax="https://app.huberway.org/account/logout">Logout</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

    );
};

export default AccountDetails;
