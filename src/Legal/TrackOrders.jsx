import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const TrackOrders = () => {
    const navigate = useNavigate();

    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Track Orders</h1>
                <p className="last-updated">Enter your details below to track your order.</p>

                <div className="legal-sections">
                    <section>
                        <p>To track your order, please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>

                        <div style={{ marginTop: '20px', maxWidth: '400px' }}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Order ID</label>
                                <input type="text" placeholder="Found in your order confirmation email." style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Billing Email</label>
                                <input type="email" placeholder="Email you used during checkout." style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                            </div>
                            <button style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Track</button>
                        </div>
                    </section>

                    <button className="continue-btn" onClick={() => window.close()}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default TrackOrders;
