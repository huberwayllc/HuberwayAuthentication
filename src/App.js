import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DynamicTitle from './components/DynamicTitle';
import Error from './pages/Error';
import RegisterForm from './pages/RegisterForm';
import Recovery from './pages/Recovery';
import Login from './pages/Login';
import './App.css';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';
import AboutUs from './pages/AboutUs';
import ProjectManagament from "./pages/ProjectManagament";
import SettingsLayout from './pages/settings/SettingsLayout';
import SettingsProfile from './pages/settings/SettingsProfile';
import SettingsEmail from './pages/settings/SettingsEmail';
import SettingsSecurity from './pages/settings/SettingsSecurity';

function App() {

    return (
        <>
            <DynamicTitle />
            <Routes>
                <Route path="/account" element={<Login />} />
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/aboutUs" element={<AboutUs />} />
                <Route path="/account/register-huberway" element={<RegisterForm />} />
                <Route path="/account/recovery" element={<Recovery />} />
                <Route path="/account/dashboard" element={<Dashboard />} />
                <Route path="/account/pricing" element={<Pricing />} />
                <Route path="/account/checkout" element={<Checkout />} />
                <Route path="/account/projects" element={<ProjectManagament />} />

                <Route path="/settings" element={<SettingsLayout />}>
                    <Route path="user-preferences/profile" element={<SettingsProfile />} />
                    <Route path="user-preferences/email" element={<SettingsEmail />} />
                    <Route path="user-preferences/security" element={<SettingsSecurity />} />

                </Route>

                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
