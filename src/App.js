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
import SettingsProfile from './pages/settings/general/SettingsProfile';
import SettingsEmail from './pages/settings/general/SettingsEmail';
import SettingsSecurity from './pages/settings/general/SettingsSecurity';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import SettingsUsersTeam from './pages/settings/UsersTeam';
import SettingsTeam from './pages/settings/SettingsTeam';
import ConnectedApps from './pages/settings/integration/ConnectedApps ';
import ConnectedAppsAlerts from './pages/settings/integration/ConnectedAppsAlerts';
import PrivateApps from './pages/settings/integration/PrivateApps';
import EmailServiceProvide from './pages/settings/integration/EmailServiceProvider';
import BrandIdentity from './pages/settings/BrandIdentity';
import Tracking from './pages/settings/Tracking';
import AdvancedTracking from './pages/settings/AdvancedTracking';
import SettingsRoles from './pages/settings/SettingsRoles';
import HuberwayAssistant from "./components/HuberwayAssistant";
import ThankYou from "./pages/ThankYou";
import CancelSubscription from "./pages/CancelSubscription";

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
                <Route path="/account/pricing/thank-you" element={<ThankYou />} />
                <Route path="/account/pricing/canceled" element={<CancelSubscription />} />
                <Route path="/account/checkout" element={<Checkout />} />
                <Route path="/account/projects" element={<ProjectManagament />} />
                <Route path="/account/settings" element={<SettingsLayout />}>
                    <Route path="user-preferences/profile" element={<SettingsProfile />} />
                    <Route path="user-preferences/email" element={<SettingsEmail />} />
                    <Route path="user-preferences/security" element={<SettingsSecurity />} />
                    <Route path="account-managament/users-team/users" element={<SettingsUsersTeam />} />
                    <Route path="account-managament/users-team/team" element={<SettingsTeam />} />
                    <Route path="account-managament/users-team/roles" element={<SettingsRoles />} />
                    <Route path="account-managament/integration/connected-apps" element={<ConnectedApps />} />
                    <Route path="account-managament/integration/connected-apps/alerts" element={<ConnectedAppsAlerts />} />
                    <Route path="account-managament/integration/private-apps" element={<PrivateApps />} />
                    <Route path="account-managament/integration/email-service-provider" element={<EmailServiceProvide />} />
                    <Route path="account-managament/brand-identity" element={<BrandIdentity />} />
                    <Route path="account-managament/tracking" element={<Tracking />} />
                    <Route path="account-managament/advanced-tracking" element={<AdvancedTracking />} />

                </Route>

                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
