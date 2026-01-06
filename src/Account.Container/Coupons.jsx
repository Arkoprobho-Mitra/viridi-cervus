import React from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';

const Coupons = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your coupons." />;
    }

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Coupons</h1>
            <div className="account-content empty-state">
                <h3>No Available Coupons</h3>
                <p>You don't have any active coupons at the moment.</p>
            </div>
        </div>
    );
};

export default Coupons;
