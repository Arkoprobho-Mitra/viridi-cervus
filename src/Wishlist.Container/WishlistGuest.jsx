import React from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const WishlistGuest = () => {
    return (
        <div className="wishlist-guest-container">
            <div className="guest-card">
                <img src="/image.container/logo1.png" alt="Viridi Cervus" className="guest-logo" />
                <h2 className="guest-title">PLEASE LOG IN</h2>
                <p className="guest-subtitle">Login to view your wishlist.</p>
                <Link to="/login" className="guest-login-btn">LOGIN</Link>
            </div>
        </div>
    );
};

export default WishlistGuest;
