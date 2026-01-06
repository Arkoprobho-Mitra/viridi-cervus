import React from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';

const GiftCards = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your gift cards." />;
    }

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Gift Cards</h1>
            <div className="account-content">
                <div className="info-card" style={{ maxWidth: '400px', background: 'linear-gradient(45deg, #11998e, #38ef7d)', color: 'white', border: 'none' }}>
                    <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '20px' }}>TOTAL BALANCE</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>Rs. 0.00</div>
                    <div style={{ marginTop: '20px', fontSize: '12px' }}>Have a gift card? Redeem it at checkout.</div>
                </div>
                <button className="primary-btn">Buy Gift Card</button>
            </div>
        </div>
    );
};

export default GiftCards;
