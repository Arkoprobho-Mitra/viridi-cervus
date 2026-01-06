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
            // Check file size (limit to 300KB)
            if (file.size > 300 * 1024) {
                alert("File size is too big. Please upload an image smaller than 300KB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;

                try {
                    // Update user in local storage
                    const updatedUser = { ...currentUser, profileImage: base64String };
                    localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Try saving first

                    // If successful, update state
                    setProfileImage(base64String);
                    setCurrentUser(updatedUser);

                    // Dispatch event for other components (like Navbar) to update if needed
                    window.dispatchEvent(new Event('userUpdated'));
                } catch (error) {
                    console.error("Storage error:", error);
                    alert("Failed to save image. Your local storage might be full. Please clear some space or use a smaller image.");
                }
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
