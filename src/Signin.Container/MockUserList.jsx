import React from 'react';
import { usersData } from './usersData';
import './MockUserList.css';

const MockUserList = ({ onDirectLogin }) => {
    return (
        <div className="mock-users-container">
            <h3>Quick Login (Dev Mode)</h3>
            <p className="subtitle">Select a user to login instantly:</p>
            <div className="mock-users-grid">
                {usersData.map(user => (
                    <div key={user.id} className="mock-user-card" onClick={() => onDirectLogin(user)}>
                        <div className="user-avatar">
                            {user.name.charAt(0)}
                        </div>
                        <div className="user-details">
                            <div className="user-name">{user.name}</div>
                            <div className="user-email">{user.email}</div>
                            <div className="user-phone">Phone: {user.phone}</div>
                            <div className="user-password">Pass: {user.password}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MockUserList;
