// SettingsLayout.js
import React from 'react';
import SidebarSettings from '../../components/SidebarSettings';
import { Outlet } from 'react-router-dom';

const SettingsLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <SidebarSettings />
            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default SettingsLayout;
