import React, { useState, useEffect, useRef } from "react";
import "./Promotional.Slideshow.css";


const PromotionalSlidingWindow = ({ items, windowSize = 4 }) => {
    const [index, setIndex] = useState(0); // real index
    const [displayIndex, setDisplayIndex] = useState(windowSize); // index for extendedItems
    const [isTransitioning, setIsTransitioning] = useState(false);
    const trackRef = useRef(null);
    const autoPlayRef = useRef(null);

    // Clone items for infinite loop effect
    // We need `windowSize` clones at both ends to support full window sliding
    const clonesBefore = items.slice(-windowSize);
    const clonesAfter = items.slice(0, windowSize);
    const extendedItems = [...clonesBefore, ...items, ...clonesAfter];

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [index, displayIndex, isTransitioning]);

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            nextSlide();
        }, 3000);
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    const goToIndex = (newIndex) => {
        setIsTransitioning(true);
        setIndex(newIndex);
        setDisplayIndex(newIndex + windowSize);
    };

    const nextSlide = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        const nextDisplay = displayIndex + windowSize;
        setDisplayIndex(nextDisplay);

        // Update real index for dots
        const realIndex = (index + 1) % items.length;
        setIndex(realIndex);
    };

    const prevSlide = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        const nextDisplay = displayIndex - windowSize;
        setDisplayIndex(nextDisplay);

        // Update real index for dots
        const realIndex = (index - 1 + items.length) % items.length;
        setIndex(realIndex);
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);

        // Snap logic
        // Real items start at index `windowSize` and end at `windowSize + items.length - 1`

        // If we've scrolled past the last real item into the clones
        if (displayIndex >= items.length + windowSize) {
            setDisplayIndex(displayIndex - items.length);
        }
        // If we've scrolled before the first real item into the clones
        else if (displayIndex < windowSize) {
            setDisplayIndex(displayIndex + items.length);
        }
    };

    const handleDotClick = (i) => {
        stopAutoPlay();
        goToIndex(i);
        startAutoPlay();
    };

    const itemWidth = 100 / windowSize;

    return (
        <div className="promotion-slider-container" onMouseEnter={stopAutoPlay} onMouseLeave={startAutoPlay}>
            <button onClick={() => { prevSlide(); stopAutoPlay(); }} className="promotion-slider-btn left">
                ◀
            </button>

            <div className="promotion-slider-window">
                <div
                    className="promotion-slider-track"
                    ref={trackRef}
                    onTransitionEnd={handleTransitionEnd}
                    style={{
                        transform: `translateX(-${displayIndex * itemWidth}%)`,
                        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                    }}
                >
                    {extendedItems.map((item, i) => (
                        <div
                            className="promotion-slider-item"
                            key={i}
                            style={{ width: `${itemWidth}%` }}
                        >
                            {/* If item is an object with image/description, render them. Else content directly. */}
                            {item.image ? item.image : item}

                            {item.description && (
                                <div className="image-details">
                                    <div>{item.description}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={() => { nextSlide(); stopAutoPlay(); }} className="promotion-slider-btn right">
                ▶
            </button>

            <div className="promotion-slider-dots">
                {items.map((_, i) => (
                    <div
                        key={i}
                        className={`promotion-slider-dot ${i === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PromotionalSlidingWindow;
