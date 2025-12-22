import React from 'react';
import './LegalPages.css';

const PrivacyPolicy = () => {
    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Privacy Policy</h1>
                <p className="last-updated">Last Updated: December 2025</p>

                <section>
                    <h2>1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or sign up for our newsletter. This may include your name, email address, shipping address, and payment information.</p>
                </section>

                <section>
                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you about promotions, updates, and other news.</p>
                </section>

                <section>
                    <h2>3. Data Security</h2>
                    <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights.</p>
                </section>

                <section>
                    <h2>4. Cookies</h2>
                    <p>We use cookies to help us remember and process the items in your shopping cart, understand your preferences based on previous or current site activity, and compile aggregate data about site traffic and site interaction.</p>
                </section>

                <section>
                    <h2>5. Third-Party Disclosure</h2>
                    <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice.</p>
                </section>

                <button className="continue-btn" onClick={() => window.close()}>Continue</button>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
