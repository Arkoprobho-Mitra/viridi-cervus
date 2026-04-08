import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupModal.css';
import { authApi } from '../api';
import { useAuth } from '../contexts/AuthContext';

const SignupModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setName(value);
        }
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        if (val.length > 0 && val.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const data = await authApi.register(name, email, password, phone);

            // Store JWT token
            localStorage.setItem('authToken', data.token);

            // Build user object matching the shape the rest of the app expects
            const user = {
                id: data.id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                viridiCredit: data.viridiCredit ?? 0,
                addresses: [],
                savedCards: [],
                giftCards: [],
                orders: [],
            };

            login(user);
            onClose();
            navigate('/');
        } catch (err) {
            setApiError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <div className="modal-header">
                    <h2>Sign Up</h2>
                    <p>Create your account to get started</p>
                </div>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="modal-name">Name</label>
                        <input
                            type="text"
                            id="modal-name"
                            placeholder="Enter your full name"
                            required
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="modal-email">Email Address</label>
                        <input
                            type="email"
                            id="modal-email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="modal-phone">Phone Number</label>
                        <input
                            type="tel"
                            id="modal-phone"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="modal-password">Password</label>
                        <input
                            type="password"
                            id="modal-password"
                            placeholder="Create a password (min 6 characters)"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        {passwordError && (
                            <span className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                                {passwordError}
                            </span>
                        )}
                    </div>

                    {apiError && (
                        <p style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{apiError}</p>
                    )}

                    <div className="checkbox-group">
                        <input type="checkbox" id="modal-consent" required />
                        <div className='modal-checkbox-label'>
                            <label htmlFor="modal-consent">
                                By continuing, I consent to the{' '}
                                <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'forestgreen', textDecoration: 'none', fontWeight: '700' }}>Terms of Use</a>
                                {' & '}
                                <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'forestgreen', textDecoration: 'none', fontWeight: '700' }}>Privacy Policy</a>
                                {' '}and I agree that I am above 18 years old.
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="signup-btn-primary" disabled={loading}>
                        {loading ? 'Creating account...' : 'Continue'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;
