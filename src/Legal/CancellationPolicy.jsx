import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const CancellationPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Cancellation Policy</h1>
                <p className="last-updated">Last Updated: December 2025</p>

                <div className="legal-sections">
                    <section>
                        <h2>1. Cancellation by Customer</h2>
                        <p>You can cancel your order any time before it is shipped. Once the order is shipped, it cannot be cancelled, but you may be able to return it in accordance with our Return Policy.</p>
                    </section>

                    <section>
                        <h2>2. Cancellation by Viridi Cervus</h2>
                        <p>We reserve the right to cancel any order for reasons including but not limited to: non-availability of product, inaccuracies or errors in pricing information, or problems identified by our credit and fraud avoidance department.</p>
                        <p>We will contact you if all or any portion of your order is cancelled or if additional information is required to accept your order. If your order is cancelled after your card has been charged, the said amount will be reversed back in your Card Account.</p>
                    </section>

                    <button className="continue-btn" onClick={() => window.close()}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default CancellationPolicy;
