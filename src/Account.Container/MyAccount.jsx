import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';
import AccountGuest from './AccountGuest';

const BODY_SHAPES = [
    { id: 'hourglass', label: 'Hourglass', icon: '⌛' },
    { id: 'pear',      label: 'Pear',      icon: '🍐' },
    { id: 'apple',     label: 'Apple',     icon: '🍎' },
    { id: 'athletic',  label: 'Athletic',  icon: '⚡' },
    { id: 'plus',      label: 'Plus',      icon: '✦'  },
];

const GENDERS = [
    { id: 'female',    label: 'She / Her'   },
    { id: 'male',      label: 'He / Him'    },
    { id: 'nonbinary', label: 'They / Them' },
];

const SKIN_TONES = ['#FDDBB4', '#F0C8A0', '#D4A574', '#B8865A', '#8D5524'];

const DEFAULT_PROFILE = {
    shape:    'hourglass',
    gender:   'female',
    height:   165,
    skinTone: '#F0C8A0',
};

const MyAccount = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');
    const [currentUser, setCurrentUser] = useState(
        isAuthenticated ? JSON.parse(localStorage.getItem('currentUser')) : null
    );
    const [profileImage, setProfileImage] = useState(currentUser?.profileImage || null);

    // Body profile state — load from localStorage or defaults
    const [bodyProfile, setBodyProfile] = useState(() => {
        const stored = localStorage.getItem('bodyProfile');
        if (stored) {
            try { return JSON.parse(stored); } catch { /* ignore */ }
        }
        return DEFAULT_PROFILE;
    });
    const [profileSaved, setProfileSaved]   = useState(!!localStorage.getItem('bodyProfile'));
    const [justSaved, setJustSaved]         = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 300 * 1024) {
                alert('File size is too big. Please upload an image smaller than 300KB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                try {
                    const updatedUser = { ...currentUser, profileImage: base64String };
                    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                    setProfileImage(base64String);
                    setCurrentUser(updatedUser);
                    window.dispatchEvent(new Event('userUpdated'));
                } catch (error) {
                    alert('Failed to save image. Your local storage might be full.');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const updateBodyProfile = (key, value) => {
        setBodyProfile(prev => ({ ...prev, [key]: value }));
        setProfileSaved(false);
    };

    const saveBodyProfile = useCallback(() => {
        localStorage.setItem('bodyProfile', JSON.stringify(bodyProfile));
        const updatedUser = { ...currentUser, bodyProfile };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        window.dispatchEvent(new Event('userUpdated'));

        setProfileSaved(true);
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2200);
    }, [bodyProfile, currentUser]);

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your account details." />;
    }

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">My Account</h1>

            {/* ── Profile Info ───────────────────── */}
            <div className="account-content">
                <div className="profile-image-section" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                    <div style={{
                        width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden',
                        backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', border: '2px solid #eaeaec',
                    }}>
                        {profileImage
                            ? <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <span style={{ fontSize: '32px', color: '#ccc' }}>📷</span>
                        }
                    </div>
                    <div>
                        <h3 style={{ margin: 0, marginBottom: '5px' }}>{currentUser.name}</h3>
                        <label className="secondary-btn" style={{
                            cursor: 'pointer', color: 'forestgreen', fontWeight: 'bold',
                            fontSize: '14px', display: 'inline-block', marginTop: '5px',
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

            {/* ── Body Profile ───────────────────── */}
            <div className="body-profile-section">
                <div className="body-profile-header">
                    <div className="body-profile-header-left">
                        <h2 className="body-profile-title">
                            <span className="bp-icon">👗</span>
                            Body Profile
                        </h2>
                        <p className="body-profile-subtitle">
                            Personalise your virtual try-on experience on any product page.
                        </p>
                    </div>
                    {profileSaved && (
                        <span className="bp-saved-badge">✓ Saved</span>
                    )}
                </div>

                <div className="body-profile-content">

                    {/* Pronouns */}
                    <div className="bp-field">
                        <label className="bp-label">Pronouns</label>
                        <div className="bp-toggle-group">
                            {GENDERS.map(g => (
                                <button
                                    key={g.id}
                                    id={`bp-gender-${g.id}`}
                                    className={`bp-toggle-btn ${bodyProfile.gender === g.id ? 'active' : ''}`}
                                    onClick={() => updateBodyProfile('gender', g.id)}
                                >
                                    {g.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Body Shape */}
                    <div className="bp-field">
                        <label className="bp-label">Body Shape</label>
                        <div className="bp-shape-group">
                            {BODY_SHAPES.map(s => (
                                <button
                                    key={s.id}
                                    id={`bp-shape-${s.id}`}
                                    className={`bp-shape-btn ${bodyProfile.shape === s.id ? 'active' : ''}`}
                                    onClick={() => updateBodyProfile('shape', s.id)}
                                >
                                    <span className="bp-shape-icon">{s.icon}</span>
                                    <span className="bp-shape-label">{s.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Height */}
                    <div className="bp-field">
                        <label className="bp-label" htmlFor="bp-height-slider">
                            Height &nbsp; <strong>{bodyProfile.height} cm</strong>
                        </label>
                        <input
                            id="bp-height-slider"
                            type="range"
                            min="145"
                            max="200"
                            value={bodyProfile.height}
                            onChange={e => updateBodyProfile('height', parseInt(e.target.value))}
                            className="bp-slider"
                        />
                        <div className="bp-slider-labels">
                            <span>145 cm</span>
                            <span>200 cm</span>
                        </div>
                    </div>

                    {/* Skin Tone */}
                    <div className="bp-field">
                        <label className="bp-label">Skin Tone</label>
                        <div className="bp-skin-tones">
                            {SKIN_TONES.map(tone => (
                                <button
                                    key={tone}
                                    className={`bp-skin-btn ${bodyProfile.skinTone === tone ? 'active' : ''}`}
                                    style={{ backgroundColor: tone }}
                                    onClick={() => updateBodyProfile('skinTone', tone)}
                                    aria-label="Select skin tone"
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        id="save-body-profile-btn"
                        className={`bp-save-btn ${justSaved ? 'saved' : ''}`}
                        onClick={saveBodyProfile}
                    >
                        {justSaved ? '✓ Profile Saved!' : profileSaved ? 'Update Body Profile' : 'Save Body Profile'}
                    </button>

                    <p className="bp-hint">
                        Your profile is used only to personalise your avatar on the virtual try-on — it is stored locally on your device and never shared.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
