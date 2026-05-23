import React, { useState, useEffect, useCallback } from 'react';
import BodyAvatar from './BodyAvatar';
import './TryOnModal.css';

const SHAPES = [
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

const FIT_NOTES = {
    hourglass: 'This style is tailored for your curves — expect a beautifully balanced fit.',
    pear:      'This top gracefully balances your silhouette and highlights your waist.',
    apple:     'The relaxed, flowing cut around the middle works perfectly for your shape.',
    athletic:  'This piece will accentuate your defined figure and broad shoulders.',
    plus:      'This style offers a comfortable, flattering drape for your shape.',
};

const DEFAULT_PROFILE = {
    shape:    'hourglass',
    gender:   'female',
    height:   165,
    skinTone: '#F0C8A0',
};

const TryOnModal = ({ product, selectedSize = 'M', onClose }) => {
    const [profile, setProfile]     = useState(DEFAULT_PROFILE);
    const [saved, setSaved]         = useState(false);
    const [justSaved, setJustSaved] = useState(false);

    /* Load saved profile from localStorage on mount */
    useEffect(() => {
        const stored = localStorage.getItem('bodyProfile');
        if (stored) {
            try {
                setProfile(JSON.parse(stored));
                setSaved(true);
            } catch { /* ignore corrupt data */ }
        }
    }, []);

    /* Close on Escape key */
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const updateProfile = (key, value) => {
        setProfile(prev => ({ ...prev, [key]: value }));
        setSaved(false); // mark as unsaved
    };

    const saveProfile = useCallback(() => {
        localStorage.setItem('bodyProfile', JSON.stringify(profile));
        setSaved(true);
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000);

        // Mirror to currentUser if logged in
        const rawUser = localStorage.getItem('currentUser');
        if (rawUser) {
            try {
                const user = JSON.parse(rawUser);
                localStorage.setItem('currentUser', JSON.stringify({ ...user, bodyProfile: profile }));
                window.dispatchEvent(new Event('userUpdated'));
            } catch { /* ignore */ }
        }
    }, [profile]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="tryon-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Virtual Try-On">
            <div className="tryon-modal">
                {/* Close */}
                <button className="tryon-close" onClick={onClose} aria-label="Close try-on modal">✕</button>

                <div className="tryon-layout">

                    {/* ── LEFT: Avatar Panel ────────────────── */}
                    <div className="tryon-avatar-panel">
                        <div className="tryon-avatar-stage">
                            <div className="tryon-avatar-wrapper">
                                <BodyAvatar
                                    shape={profile.shape}
                                    gender={profile.gender}
                                    skinTone={profile.skinTone}
                                    productImage={product?.image}
                                    productCategory={product?.category || product?.subCategory}
                                />
                            </div>
                        </div>
                        <p className="tryon-avatar-label">Virtual Preview · Illustrative only</p>
                    </div>

                    {/* ── RIGHT: Config Panel ───────────────── */}
                    <div className="tryon-config-panel">

                        {/* Product summary */}
                        <div className="tryon-product-info">
                            <img
                                src={product?.image}
                                alt={product?.title}
                                className="tryon-product-thumb"
                            />
                            <div className="tryon-product-meta">
                                <div className="tryon-product-brand">{product?.brand}</div>
                                <div className="tryon-product-title">{product?.title}</div>
                                <div className="tryon-product-price">Rs. {product?.price?.toLocaleString()}</div>
                                <span className="tryon-size-badge">Size: {selectedSize}</span>
                            </div>
                        </div>

                        <div className="tryon-divider" />

                        {/* Customisation */}
                        <div className="tryon-customise">
                            <h3 className="tryon-section-title">Customise Your Avatar</h3>

                            {/* Gender */}
                            <div className="tryon-field">
                                <label className="tryon-label">Pronouns</label>
                                <div className="tryon-toggle-group">
                                    {GENDERS.map(g => (
                                        <button
                                            key={g.id}
                                            id={`tryon-gender-${g.id}`}
                                            className={`tryon-toggle-btn ${profile.gender === g.id ? 'active' : ''}`}
                                            onClick={() => updateProfile('gender', g.id)}
                                        >
                                            {g.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Body Shape */}
                            <div className="tryon-field">
                                <label className="tryon-label">Body Shape</label>
                                <div className="tryon-shape-group">
                                    {SHAPES.map(s => (
                                        <button
                                            key={s.id}
                                            id={`tryon-shape-${s.id}`}
                                            className={`tryon-shape-btn ${profile.shape === s.id ? 'active' : ''}`}
                                            onClick={() => updateProfile('shape', s.id)}
                                        >
                                            <span className="tryon-shape-icon">{s.icon}</span>
                                            <span className="tryon-shape-label">{s.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Height */}
                            <div className="tryon-field">
                                <label className="tryon-label" htmlFor="tryon-height-slider">
                                    Height&nbsp;&nbsp;<strong>{profile.height} cm</strong>
                                </label>
                                <input
                                    id="tryon-height-slider"
                                    type="range"
                                    min="145"
                                    max="200"
                                    value={profile.height}
                                    onChange={e => updateProfile('height', parseInt(e.target.value))}
                                    className="tryon-slider"
                                />
                                <div className="tryon-slider-labels">
                                    <span>145 cm</span>
                                    <span>200 cm</span>
                                </div>
                            </div>

                            {/* Skin Tone */}
                            <div className="tryon-field">
                                <label className="tryon-label">Skin Tone</label>
                                <div className="tryon-skin-tones">
                                    {SKIN_TONES.map(tone => (
                                        <button
                                            key={tone}
                                            className={`tryon-skin-btn ${profile.skinTone === tone ? 'active' : ''}`}
                                            style={{ backgroundColor: tone }}
                                            onClick={() => updateProfile('skinTone', tone)}
                                            aria-label={`Select skin tone`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Save */}
                            <button
                                id="tryon-save-profile-btn"
                                className={`tryon-save-btn ${justSaved ? 'saved' : ''}`}
                                onClick={saveProfile}
                            >
                                {justSaved ? '✓ Saved!' : saved ? 'Update Body Profile' : 'Save Body Profile'}
                            </button>
                        </div>

                        <div className="tryon-divider" />

                        {/* Fit note */}
                        <div className="tryon-fit-note">
                            <span className="tryon-fit-icon">✦</span>
                            <p>{FIT_NOTES[profile.shape]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TryOnModal;
