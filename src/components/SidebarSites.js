import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SidebarSites() {
    const location = useLocation();

    return (
        <div className="sidebar">
            <ul>
                <li className={location.pathname === '/sites' ? 'active' : '' || location.pathname === '/' ? 'active' : '' }>
                    <Link to="/sites"><i className="fad fa-sitemap"></i> <span>Sites</span></Link>
                </li>
                <li className={location.pathname === '/domains' ? 'active' : ''}>
                    <Link to="/domains"><i className="fad fa-globe"></i> <span>Domains</span></Link>
                </li>
                <li className={location.pathname === '/themes' ? 'active' : ''}>
                    <Link to="/themes"><i className="fad fa-pen-fancy"></i> <span>Themes</span></Link>
                </li>
                <li className={location.pathname === '/plugins' ? 'active' : ''}>
                    <Link to="/plugins"><i className="fad fa-plug"></i> <span>Plugins</span></Link>
                </li>
            </ul>
        </div>
    );
}

export default SidebarSites;
