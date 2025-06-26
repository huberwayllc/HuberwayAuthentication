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
import WebsitesList from "./pages/websites/WebsitesList";
import WebsiteDetail from "./pages/websites/WebsiteDetail";
import SupportBoardEntry from "./pages/smartchat/SupportBoardEntry";
import MarketingHub from "./pages/marketing/MarketingHub";

function App() {

    return (
        <>
            {/* <DynamicTitle /> */}
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/account" element={<Login />} />
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/aboutUs" element={<AboutUs />} />
                <Route path="/account/register-huberway" element={<RegisterForm />} />
                <Route path="/account/recovery" element={<Recovery />} />
                <Route path="/account/dashboard" element={<Dashboard />} />
                <Route path="/account/pricing" element={<Pricing />} />
                <Route path="/account/pricing/success" element={<ThankYou />} />
                <Route path="/account/pricing/canceled" element={<CancelSubscription />} />
                <Route path="/account/checkout" element={<Checkout />} />
                <Route path="/account/websites" element={<WebsitesList />} />
                <Route path="/account/websites/:id" element={<WebsiteDetail />} />
                <Route path="/account/projects" element={<ProjectManagament />} />
                <Route path="/account/marketing" element={<MarketingHub/>}></Route>
                <Route path="/account/marketing/campaigns" element={<MarketingHub/>}></Route>
                <Route path="/account/marketing/automations" element={<MarketingHub/>}></Route>
                <Route path="/account/marketing/lists" element={<MarketingHub/>}></Route>
                <Route path="/account/marketing/templates" element={<MarketingHub/>}></Route>
                <Route path="/account/marketing/sending" element={<MarketingHub/>}></Route>
                <Route path="/account/marketing/reports" element={<MarketingHub/>}></Route>
                <Route path="/account/smartchat" element={<SupportBoardEntry />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
