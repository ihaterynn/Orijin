// src/components/navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import ConnectWallet from '../components/connectWallet';
import './navbar.css'; 
import Logo from '../graphics/Logo2.png'; 

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={Logo} alt="Orijin Logo" className="navbar-logo" />
            </div>
            <div className="nav-links">
                <NavLink exact to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    HOME
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    PROFILE
                </NavLink>
                <NavLink to="/marketplace" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    MARKETPLACE
                </NavLink>
            </div>
            <div className="connect-Wallet">
                <ConnectWallet />
            </div>
        </nav>
    );
}

export default Navbar;
