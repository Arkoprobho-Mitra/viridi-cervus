import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const ShippingPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Shipping Policy</h1>
                <p className="last-updated">Last Updated: December 2025</p>

                <div className="legal-sections">
                    <section>
                        <h2>1. Order Processing</h2>
                        <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
                    </section>

                    <section>
                        <h2>2. Shipping Rates & Delivery Estimates</h2>
                        <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
                        <ul>
                            <li>Standard Shipping: 3-5 business days</li>
                            <li>Express Shipping: 1-2 business days</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Shipment Confirmation & Order Tracking</h2>
                        <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
                    </section>

                    <section>
                        <h2>4. Customs, Duties and Taxes</h2>
                        <p>Viridi Cervus is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
                    </section>

                    <button className="continue-btn" onClick={() => window.close()}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
