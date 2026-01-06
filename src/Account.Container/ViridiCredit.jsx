import React from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';

const ViridiCredit = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your Viridi Credit." />;
    }

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Viridi Credit</h1>
            <div className="account-content empty-state">
                <div style={{ fontSize: '48px', color: 'forestgreen', marginBottom: '10px' }}>Rs. 0</div>
                <h3>Your Credit Balance</h3>
                <p>You have no active credits. Refunds will appear here.</p>
            </div>
        </div>
    );
};

export default ViridiCredit;
