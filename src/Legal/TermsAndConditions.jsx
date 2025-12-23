import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const TermsAndConditions = () => {
    const navigate = useNavigate();

    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Terms & Conditions</h1>
                <p className="last-updated">Last Updated: December 2025</p>

                <div className="legal-sections">
                    <section>
                        <h2>1. General</h2>
                        <p>These Terms & Conditions apply to your access to and use of the Viridi Cervus website. By accessing or using the site, you agree to be bound by these terms.</p>
                    </section>

                    <section>
                        <h2>2. Product Description</h2>
                        <p>We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.</p>
                    </section>

                    <section>
                        <h2>3. Pricing</h2>
                        <p>Prices for products are described on our Website and are incorporated into these Terms by reference. All prices are in Indian Rupees. Prices, products and Services may change at Virgil Cervus's discretion.</p>
                    </section>

                    <section>
                        <h2>4. User Conduct</h2>
                        <p>You agree not to use the website for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the website in any way that could damage the website, the services, or the general business of Viridi Cervus.</p>
                    </section>

                    <button className="continue-btn" onClick={() => window.close()}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
