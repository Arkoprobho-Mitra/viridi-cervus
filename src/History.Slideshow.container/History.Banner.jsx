import React from 'react';
import './History.Banner.css';

const HistoryBanner = () => {
    // We repeat the text to ensure there's enough content to fill the screen and loop smoothly.
    // If the text is short, we might need more repetitions.
    // CSS keyframes move it by -50%, so we need at least 2 full sets of content covering the width + buffer.
    const text = "Shop where you left off";
    const repetitions = [1, 2, 3, 4, 5, 6, 7, 8]; // Repeat enough times to fill wide screens

    return (
        <div className="history-banner-container">
            <div className="history-banner-track">
                {repetitions.map((_, index) => (
                    <React.Fragment key={index}>
                        <span className="history-banner-text">
                            {text}
                        </span>
                        <span className="history-banner-separator">•</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default HistoryBanner;
