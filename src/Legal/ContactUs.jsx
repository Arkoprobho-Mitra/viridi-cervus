import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const ContactUs = () => {
    const navigate = useNavigate();

    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Contact Us</h1>
                <p className="last-updated">We'd love to hear from you!</p>

                <div className="legal-sections">
                    <section>
                        <h2>Customer Support</h2>
                        <p>For any queries related to your order, account, or our services, please reach out to our customer support team.</p>
                        <p><strong>Email:</strong> support@viridicervus.com</p>
                        <p><strong>Phone:</strong> +91 123 456 7890 (Mon-Sat, 9 AM - 6 PM)</p>
                    </section>

                    <section>
                        <h2>Corporate Office</h2>
                        <p>Viridi Cervus Pvt. Ltd.</p>
                        <p>123 Fashion Street, Tech Park</p>
                        <p>Bangalore, Karnataka, India - 560001</p>
                    </section>

                    <section>
                        <h2>Feedback</h2>
                        <p>We value your feedback to improve our services. Please write to us at feedback@viridicervus.com.</p>
                    </section>

                    <button className="continue-btn" onClick={() => window.close()}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
