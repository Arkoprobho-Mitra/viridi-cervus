import React from 'react';
import { usersData } from './usersData';
import './MockUserList.css';

const MockUserList = ({ onDirectLogin }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button
                className="dev-mode-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title="Quick Login Dev Mode"
            >
                {isOpen ? 'Close' : 'Dev Login'}
            </button>

            {isOpen && (
                <div className="mock-users-popup-overlay">
                    <div className="mock-users-popup">
                        <div className="popup-header">
                            <h3>Quick Login (Dev Mode)</h3>
                            <button className="close-popup-btn" onClick={() => setIsOpen(false)}>×</button>
                        </div>
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
                </div>
            )}
        </>
    );
};

export default MockUserList;
