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
import SettingsLayout from './pages/settings/SettingsLayout';  // Il layout per le impostazioni
import SettingsProfile from './pages/settings/SettingsProfile'; // Profilo delle impostazioni

function App() {
    useEffect(() => {
        // Puoi mettere logiche qui, per esempio il controllo dell'auth_token
    }, []);

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

                {/* Rotte per le impostazioni con la Sidebar */}
                <Route path="/settings" element={<SettingsLayout />}>
                    <Route path="profile" element={<SettingsProfile />} />

                </Route>

                {/* Fallback per le pagine non trovate */}
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
