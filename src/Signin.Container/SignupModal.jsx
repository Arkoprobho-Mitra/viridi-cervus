import React, { useState } from 'react';
import './SignupModal.css';

const SignupModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setName(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log("Signup submitted", { name });
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
                        <input type="email" id="modal-email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="modal-phone">Phone Number</label>
                        <input type="tel" id="modal-phone" placeholder="Enter your phone number" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="modal-password">Password</label>
                        <input type="password" id="modal-password" placeholder="Create a password" required />
                    </div>

                    <div className="checkbox-group">
                        <input type="checkbox" id="modal-consent" required />
                        <div className='modal-checkbox-label'>
                            <label htmlFor="modal-consent">
                                By continuing, I consent to the <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'forestgreen', textDecoration: 'none', fontWeight: '700' }}>Terms of Use</a> & <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'forestgreen', textDecoration: 'none', fontWeight: '700' }}>Privacy Policy</a> and I agree that I am above 18 years old.
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="signup-btn-primary">Continue</button>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;
