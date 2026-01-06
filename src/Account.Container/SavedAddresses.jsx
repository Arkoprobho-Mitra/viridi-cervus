import React from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';

const SavedAddresses = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // Assuming currentUser might have an 'addresses' array, if not fallback to empty
    const addresses = currentUser?.addresses || [];

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your saved addresses." />;
    }

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Saved Addresses</h1>
            <div className="account-content">
                {addresses.length > 0 ? (
                    <div className="card-grid">
                        {addresses.map((addr, idx) => (
                            <div key={idx} className="info-card">
                                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{currentUser.name}</div>
                                <div style={{ fontSize: '14px', color: '#555' }}>{addr}</div>
                                <div style={{ marginTop: '15px' }}>
                                    <button style={{ color: 'forestgreen', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginRight: '15px' }}>EDIT</button>
                                    <button style={{ color: 'red', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>DELETE</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <h3>No Saved Addresses</h3>
                        <p>Add addresses for a faster checkout.</p>
                    </div>
                )}
                <button className="primary-btn">Add New Address</button>
            </div>
        </div>
    );
};

export default SavedAddresses;
