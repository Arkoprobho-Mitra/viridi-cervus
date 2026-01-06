import React from 'react';
import './Account.css';

const ContactUs = () => {
    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Contact Us</h1>
            <div className="account-content">
                <div className="info-card" style={{ marginBottom: '20px' }}>
                    <h3>Customer Support</h3>
                    <p style={{ marginTop: '10px' }}>For any queries, please reach out to us at:</p>
                    <div style={{ marginTop: '20px', fontWeight: 'bold', color: 'forestgreen' }}>support@viridicervus.com</div>
                    <div style={{ marginTop: '5px', fontWeight: 'bold' }}>+91 1800-123-4567</div>
                </div>

                <h3>Send us a Message</h3>
                <form style={{ marginTop: '20px', maxWidth: '500px' }} onSubmit={(e) => e.preventDefault()}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>SUBJECT</label>
                        <input type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', color: '#666' }}>MESSAGE</label>
                        <textarea rows="4" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
                    </div>
                    <button className="primary-btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
