import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBrandDetails } from '../../brandData';
import './Template5Luxury.css';
import '../BrandTemplatesShared.css';

export const Template5Luxury = ({ brandName, products }) => {
    const details = getBrandDetails(brandName);
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

    const handleDiscoverClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            navigate(`/products?search=${brandName}`);
        }, 600); // 600ms delay for animation
    };

    const [rotationIndex, setRotationIndex] = useState(0);

    // Auto rotate every 3 seconds
    React.useEffect(() => {
        const interval = setInterval(() => {
            setRotationIndex(prev => (prev + 1) % 2);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Hero: Puffer jacket vibe
    const heroImg = products.find(p => p.category.toLowerCase().includes('jacket'))?.image || products[0]?.image;

    // Grid items
    const gridItems = products.slice(0, 8);

    // Grid items: Create pairs for rotation
    // We need 8 slots, so we need 16 products. If not enough, we wrap around.
    const gridPairs = [];
    for (let i = 0; i < 8; i++) {
        const p1 = products[i % products.length];
        // For the second image, try to pick from the end or offset
        const p2 = products[(i + 8) % products.length] || p1;
        gridPairs.push([p1, p2]);
    }

    return (
        <div className="bt-container tpl-artic">
            {/* Nav */}
            <div className="art-nav">
                <img src={details.logo} alt={brandName} style={{ maxHeight: '40px', objectFit: 'contain' }} />
            </div>

            {/* Hero */}
            <div className="art-hero">
                <div className="art-hero-bg-text">{brandName}</div>
                <div className="art-hero-content">
                    <div className="art-hero-left">
                        <div style={{ fontSize: '0.7rem', marginBottom: 10 }}>// {brandName.toUpperCase()} SERIES //{new Date().getFullYear()} //</div>
                        <h1 className="art-hero-title">{brandName.toUpperCase()}</h1>
                        <div className="art-hero-motto">{details.motto}</div>
                        <div
                            className={`art-hero-price-box ${isClicked ? 'clicked' : ''}`}
                            onClick={handleDiscoverClick}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="art-arrow-btn" style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↗</div>
                            <div>
                                <div style={{ fontSize: '0.6rem' }}>EXPLORE</div>
                                <div className="art-price" style={{ fontSize: '1rem' }}>DISCOVER COLLECTION</div>
                            </div>
                        </div>
                    </div>
                    <div className="art-hero-center">
                        <div className="art-hero-gallery">
                            {(() => {
                                // Prepare gallery images: preference to brand hero images, fallback to product images
                                const brandImages = details.heroImages || [];
                                const fallbackImages = [heroImg, ...gridItems.map(p => p.image)];
                                const galleryImages = [];

                                // We want exactly 3 images
                                for (let i = 0; i < 3; i++) {
                                    if (i < brandImages.length) {
                                        galleryImages.push(brandImages[i]);
                                    } else {
                                        // Use fallback, preventing duplicates if possible (simple index based fallback)
                                        galleryImages.push(fallbackImages[i - brandImages.length] || fallbackImages[0]);
                                    }
                                }

                                return galleryImages.map((imgSrc, i) => (
                                    <img
                                        key={i}
                                        src={imgSrc}
                                        className={`art-gallery-img ${activeGalleryIndex === i ? 'active' : ''}`}
                                        alt={`Gallery ${i}`}
                                        onMouseEnter={() => setActiveGalleryIndex(i)}
                                    />
                                ));
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Collection Grid */}
            <div className="art-collection">
                <div className="art-sec-header">
                    <h2 className="art-sec-title">NEW COLLECTION</h2>
                    <div style={{ fontSize: '0.7rem', textAlign: 'right' }}>
                        {details.description?.toUpperCase()}<br />PREMIUM EDITION
                    </div>
                </div>

                <div className="art-grid">
                    {gridPairs.map((pair, i) => (
                        <RotatingCard key={i} pair={pair} globalRotationIndex={rotationIndex} />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="art-footer">
                <img src={details.footerImage || details.heroImages?.[0] || heroImg} className="art-footer-bg" alt="Footer Mountain" />
                <div className="art-footer-overlay"></div>
                <div className="art-big-text">{brandName.toUpperCase()}</div>

                <div className="art-footer-content">
                    <div className="art-footer-info">
                        <div style={{ fontSize: '0.7rem', marginBottom: 20 }}>{details.description?.toUpperCase()}</div>
                        <h2 className="art-footer-slogan">{details.motto?.split(' ').slice(0, 3).join(' ')}<br />{details.motto?.split(' ').slice(3).join(' ')}</h2>
                    </div>
                    <div className="art-footer-bar">
                        COPYRIGHT {brandName.toUpperCase()} // ALL RIGHTS RESERVED
                    </div>
                </div>
            </div>
        </div>
    );
};

const RotatingCard = ({ pair, globalRotationIndex }) => {
    const [isHovered, setIsHovered] = useState(false);
    // Track the index that was active when hover started to freeze it
    const [frozenIndex, setFrozenIndex] = useState(0);

    // Determines which product to show
    // If hovered, show the frozen one. If not, use global rotation.
    const currentProductIndex = isHovered ? frozenIndex : globalRotationIndex;
    const p = pair[currentProductIndex];

    const handleMouseEnter = () => {
        // Freeze the current state
        setFrozenIndex(globalRotationIndex);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Link
            to={`/product/${p.id}`}
            className="art-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{ position: 'relative', height: 300, marginBottom: 20 }}>
                {/* Render both images absolute and fade between them? Or just swap the src? Swapping src is simpler but less smooth. 
                    Let's swap source/content for "rotation" as requested. */}
                <img src={p.image} className="art-card-img" style={{ height: '100%', marginBottom: 0 }} alt={p.title} />
            </div>

            <div className="art-card-name">{p.category}</div>
            <div style={{ fontSize: '0.7rem', color: '#ccc', marginBottom: 10 }}>{p.title}</div>
            <div className="art-card-price">Rs. {p.price}</div>
            <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: currentProductIndex === 0 ? '#fff' : 'rgba(255,255,255,0.3)', transition: 'background 0.3s' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: currentProductIndex === 1 ? '#fff' : 'rgba(255,255,255,0.3)', transition: 'background 0.3s' }}></span>
            </div>
        </Link>
    );
};
