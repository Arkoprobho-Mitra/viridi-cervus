import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const ReturnsPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Returns Policy</h1>
                <p className="last-updated">Last Updated: December 2025</p>

                <div className="legal-sections">
                    <section>
                        <h2>1. Return Window</h2>
                        <p>Our returns policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.</p>
                    </section>

                    <section>
                        <h2>2. Eligibility</h2>
                        <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging. Several types of goods are exempt from being returned, such as perishable goods, intimate or sanitary goods, hazardous materials, or flammable liquids or gases.</p>
                    </section>

                    <section>
                        <h2>3. Return Process</h2>
                        <p>To complete your return, we require a receipt or proof of purchase. Please do not send your purchase back to the manufacturer. There are certain situations where only partial refunds are granted (if applicable).</p>
                    </section>

                    <section>
                        <h2>4. Refunds</h2>
                        <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
                    </section>

                    <button className="continue-btn" onClick={() => window.close()}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPolicy;
