import React, { useRef } from 'react';
import ProductCard from '../ProductListing.Container/ProductCard';
import './RecommendedCarousel.css';

const SkeletonCard = () => (
    <div className="rec-skeleton-card">
        <div className="rec-skeleton-img shimmer" />
        <div className="rec-skeleton-line shimmer" style={{ width: '55%', marginTop: '12px' }} />
        <div className="rec-skeleton-line shimmer" style={{ width: '85%', marginTop: '8px' }} />
        <div className="rec-skeleton-line shimmer" style={{ width: '40%', marginTop: '8px' }} />
        <div className="rec-skeleton-line shimmer" style={{ width: '70%', marginTop: '14px', height: '10px' }} />
    </div>
);

const RecommendedCarousel = ({
    title,
    subtitle,
    badge,
    products = [],
    loading = false,
}) => {
    const trackRef = useRef(null);

    const scroll = (direction) => {
        if (trackRef.current) {
            trackRef.current.scrollBy({ left: direction * 300, behavior: 'smooth' });
        }
    };

    // Don't render if nothing to show and not loading
    if (!loading && products.length === 0) return null;

    return (
        <div className="rec-carousel-section">
            <div className="rec-carousel-header">
                <div className="rec-header-left">
                    {badge && <span className="rec-badge">{badge}</span>}
                    <h2 className="rec-carousel-title">{title}</h2>
                    {subtitle && <p className="rec-carousel-subtitle">{subtitle}</p>}
                </div>
                <div className="rec-nav-buttons">
                    <button
                        className="rec-nav-btn"
                        onClick={() => scroll(-1)}
                        aria-label="Previous recommendations"
                    >
                        &#8249;
                    </button>
                    <button
                        className="rec-nav-btn"
                        onClick={() => scroll(1)}
                        aria-label="Next recommendations"
                    >
                        &#8250;
                    </button>
                </div>
            </div>

            <div className="rec-carousel-track" ref={trackRef}>
                {loading
                    ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    : products.map(p => (
                        <div key={p.id} className="rec-card-wrapper">
                            <ProductCard product={p} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default RecommendedCarousel;
