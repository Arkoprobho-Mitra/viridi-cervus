import React from 'react';
import './Promotional.Banner.css';

const PromotionalBanner = () => {
    const text = "New & Best Offers";
    const repetitions = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="promotion-banner-container">
            <div className="promotion-banner-track">
                {repetitions.map((_, index) => (
                    <React.Fragment key={index}>
                        <span className="promotion-banner-text">
                            {text}
                        </span>
                        <span className="promotion-banner-separator">•</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default PromotionalBanner;
