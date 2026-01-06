import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import AccountGuest from './AccountGuest';

const Orders = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your orders." />;
    }

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Orders</h1>
            <div className="account-content empty-state">
                <h3>No Active Orders</h3>
                <p>There are no recent orders to display.</p>
                <Link to="/">
                    <button className="primary-btn">Start Shopping</button>
                </Link>
            </div>
        </div>
    );
};

export default Orders;
