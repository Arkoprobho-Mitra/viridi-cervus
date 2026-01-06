import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

const AccountGuest = ({ title = "PLEASE LOG IN", subtitle = "Login to view your account details." }) => {
    return (
        <div className="account-guest-container">
            <div className="guest-card">
                <img src="/image.container/logo1.png" alt="Viridi Cervus" className="guest-logo" />
                <h2 className="guest-title">{title}</h2>
                <p className="guest-subtitle">{subtitle}</p>
                <Link to="/login" className="guest-login-btn">LOGIN</Link>
            </div>
        </div>
    );
};

export default AccountGuest;
