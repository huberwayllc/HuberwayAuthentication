/** HEADER MODERNO UNIFICATO HUBCONNECT STYLE **/
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getAccountDetails } from "../backend/api";
import Avatar from "@mui/material/Avatar";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SearchIcon from "@mui/icons-material/Search";
import UserMenu from "./UserMenu";
import VoiceAssistantModal from "./IA/VoiceAssistantModal";
import AppsMenu from "./AppsMenu";
import { SquaresPlusIcon, StarIcon } from "@heroicons/react/24/outline";
import "../styles/Header.css";
import SearchModal from "./SearchModal";

function Header({ onActionClick }) {
    const [user, setUser] = useState({ email: "", name: "", id: null });
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);
    const [iaOpen, setIaOpen] = useState(false);
    const [appsOpen, setAppsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const searchInputRef = useRef(null);

    useEffect(() => {
        getAccountDetails()
            .then((data) => {
                setUser({
                    email: data.data.user.email,
                    name: data.data.user.username,
                    id: data.data.user.id,
                    company: data.data.company,
                    sub_accounts: data.data.sub_accounts,
                    subscription: data.data.subscription,
                });
            })
            .catch(() => navigate("/account/login"));
    }, [navigate]);

    const handleLogout = () => {
        const cookies = document.cookie.split(";");
        cookies.forEach((cookie) => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; Path=/; Domain=.huberway.com; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict`;
        });
        navigate("/account/login");
    };

    const toggleMenu = () => setMenuVisible((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const getPageData = () => {
        if (location.pathname.includes("websites")) {
            return { title: "Websites", button: "+ Add Website", buttonLink: "/account/websites" };
        } else if (location.pathname.includes("dashboard")) {
            return { title: "Dashboard", };
        }
        return { title: "Huberway", button: null };
    };

    const pageData = getPageData();


    const handleActionClick = () => {
        if (onActionClick) return onActionClick();
        if (pageData.buttonLink) navigate(pageData.buttonLink);
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <header className="hw-header">
                <div className="hw-header-left">
                    <img
                        src="https://cdn.huberway.com/site/logo-icon.svg"
                        alt="Huberway Logo"
                        className="hw-logo"
                        onClick={() => navigate("/account/dashboard")}
                    />
                    <span className="hw-separator"></span>
                    <h1 className="hw-section-title">{pageData.title}</h1>
                    <span className="hw-separator"></span>

                    <div className="hw-search-wrapper">
                        <SearchIcon className="hw-search-icon" />
                        <input
                            ref={searchInputRef}
                            className="hw-search-input"
                            placeholder="Cerca..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSearch(true)}
                        />
                        <kbd className="hw-kbd">Ctrl K</kbd>
                        {showSearch && (
                            <SearchModal
                                onClose={() => setShowSearch(false)}
                                query={searchQuery}
                                setQuery={setSearchQuery}
                            />
                        )}
                    </div>
                </div>

                <div className="hw-header-center">

                </div>

                <div className="hw-header-right" ref={menuRef}>
                    <span className="hw-separator"></span>
                    <button
                        className="hw-icon-button"
                        onClick={() => setAppsOpen(!appsOpen)}
                        title="App menu"
                    >
                        <SquaresPlusIcon className="hw-icon"/>
                    </button>

                    <AppsMenu open={appsOpen} setOpen={setAppsOpen}/>

                    <Link to="/account/pricing" className="hw-button primary"><StarIcon /> Upgrade</Link>

                    <span className="hw-separator"></span>

                    {pageData.button && (
                        <button className="hw-button primary" onClick={handleActionClick}>
                            {pageData.button}
                        </button>
                    )}

                    <div onClick={toggleMenu} className="hw-avatar-wrapper">
                        <Avatar sx={{bgcolor: "#3b82f6"}}>
                            {(user.name || "U").charAt(0).toUpperCase()}
                        </Avatar>
                    </div>

                    {menuVisible && <UserMenu user={user} onLogout={handleLogout}/>}
                </div>
            </header>

            {iaOpen && <VoiceAssistantModal onClose={() => setIaOpen(false)}/>}
            <div style={{ marginTop: "65px" }}></div>
        </>
    );
}

export default Header;
