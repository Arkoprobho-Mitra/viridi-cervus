import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const FAQ = () => {
    const navigate = useNavigate();

    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Frequently Asked Questions</h1>
                <p className="last-updated">Last Updated: December 2025</p>

                <div className="legal-sections">
                    <section>
                        <h2>1. How do I place an order?</h2>
                        <p>You can browse our catalog, select the items you like, add them to your cart, and proceed to checkout. modify your cart before payment.</p>
                    </section>

                    <section>
                        <h2>2. What payment methods do you accept?</h2>
                        <p>We accept Credit/Debit cards, Net Banking, UPI, and Cash on Delivery (COD) for eligible pin codes.</p>
                    </section>

                    <section>
                        <h2>3. How can I track my order?</h2>
                        <p>Once your order is shipped, you will receive a tracking link via SMS and Email. You can also track it from the 'Track Orders' section on our website.</p>
                    </section>

                    <section>
                        <h2>4. Can I cancel my order?</h2>
                        <p>Yes, you can cancel your order before it is shipped. Please visit the 'My Orders' section to initiate a cancellation.</p>
                    </section>

                    <section>
                        <h2>5. What is your return policy?</h2>
                        <p>We offer a 30-day return policy for most items. Please ensure the product is unused and has all original tags intact.</p>
                    </section>

                    <button className="continue-btn" onClick={() => window.close()}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
