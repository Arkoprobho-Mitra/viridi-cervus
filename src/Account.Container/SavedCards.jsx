import React from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';

const SavedCards = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your saved cards." />;
    }

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Saved Cards</h1>
            <div className="account-content empty-state">
                <h3>No Saved Cards</h3>
                <p>Save your credit/debit cards during checkout for faster payments.</p>
            </div>
        </div>
    );
};

export default SavedCards;
