import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';
import AccountGuest from './AccountGuest';

const MyAccount = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');
    const [currentUser, setCurrentUser] = useState(
        isAuthenticated ? JSON.parse(localStorage.getItem('currentUser')) : null
    );
    const [profileImage, setProfileImage] = useState(currentUser?.profileImage || null);

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your account details." />;
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setProfileImage(base64String);

                // Update user in local storage
                const updatedUser = { ...currentUser, profileImage: base64String };
                setCurrentUser(updatedUser);
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                // Dispatch event for other components (like Navbar) to update if needed
                window.dispatchEvent(new Event('userUpdated'));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">My Account</h1>
            <div className="account-content">
                <div className="profile-image-section" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #eaeaec'
                    }}>
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span style={{ fontSize: '32px', color: '#ccc' }}>📷</span>
                        )}
                    </div>
                    <div>
                        <h3 style={{ margin: 0, marginBottom: '5px' }}>{currentUser.name}</h3>
                        <label className="secondary-btn" style={{
                            cursor: 'pointer',
                            color: 'forestgreen',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            display: 'inline-block',
                            marginTop: '5px'
                        }}>
                            Upload New Picture
                            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                        </label>
                    </div>
                </div>

                <div className="card-grid">
                    <div className="info-card">
                        <div className="info-label">Full Name</div>
                        <div className="info-value">{currentUser.name}</div>
                    </div>
                    <div className="info-card">
                        <div className="info-label">Email Address</div>
                        <div className="info-value">{currentUser.email}</div>
                    </div>
                    <div className="info-card">
                        <div className="info-label">Mobile Number</div>
                        <div className="info-value">{currentUser.phone}</div>
                    </div>
                </div>
                <button className="primary-btn">Edit Profile</button>
            </div>
        </div>
    );
};

export default MyAccount;
