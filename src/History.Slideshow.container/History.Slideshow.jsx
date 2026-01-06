import React, { useState, useEffect, useRef } from "react";
import "./History.Slideshow.css";


const HistorySlidingWindow = ({ items, windowSize = 4 }) => {
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
        const nextDisplay = displayIndex + 4; // Slide one by one for smoother verification, or adjust as needed. 
        // User previously had +3. Let's stick to +1 as standard carousel behavior usually slides 1 or 'windowSize'. 
        // If windowSize is 4, sliding 4 at once is "paging". Sliding 1 is "carousel".
        // The original code passed windowSize=1 so nextDisplay = displayIndex + 1.
        // Let's use 1 to be safe/standard.
        setDisplayIndex(nextDisplay);

        // Update real index for dots
        const realIndex = (index + 1) % items.length;
        setIndex(realIndex);
    };

    const prevSlide = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        const nextDisplay = displayIndex - 4;
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
        <div className="history-slider-container" onMouseEnter={stopAutoPlay} onMouseLeave={startAutoPlay}>
            <button onClick={() => { prevSlide(); stopAutoPlay(); }} className="history-slider-btn left">
                ◀
            </button>

            <div className="history-slider-window">
                <div
                    className="history-slider-track"
                    ref={trackRef}
                    onTransitionEnd={handleTransitionEnd}
                    style={{
                        transform: `translateX(-${displayIndex * itemWidth}%)`,
                        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                    }}
                >
                    {extendedItems.map((item, i) => (
                        <div
                            className="history-slider-item"
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

            <button onClick={() => { nextSlide(); stopAutoPlay(); }} className="history-slider-btn right">
                ▶
            </button>

            <div className="history-slider-dots">
                {items.map((_, i) => (
                    <div
                        key={i}
                        className={`history-slider-dot ${i === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HistorySlidingWindow;
