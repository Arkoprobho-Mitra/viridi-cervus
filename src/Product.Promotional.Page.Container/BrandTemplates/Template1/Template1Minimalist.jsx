import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Template1Minimalist.css';
import '../BrandTemplatesShared.css';

import { getBrandDetails } from '../../brandData';

export const Template1Minimalist = ({ brandName, products }) => {
    const [activeTab, setActiveTab] = React.useState('ALL');
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const details = getBrandDetails(brandName);

    // Setup hero images - fallback to product images if brandData is empty
    const heroImages = React.useMemo(() => {
        let imgs = details.heroImages && details.heroImages.length > 0
            ? details.heroImages
            : [products[0]?.image];
        return imgs.slice(0, 5); // Ensure max 5
    }, [details.heroImages, products]);

    // Rotation effect
    React.useEffect(() => {
        if (heroImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [heroImages]);

    const currentHeroImg = heroImages[currentImageIndex] || products[0]?.image;


    // Extract categories for tabs (limit to 5)
    // Use categories from brand details if available, otherwise derive them dynamically
    const allCategories = details.categories || ['ALL', ...new Set(products.map(p => (p.subCategory || p.category || 'POPULAR').toUpperCase()))].slice(0, 5);

    // Filter products for the active tab
    const filteredProducts = activeTab === 'ALL'
        ? products
        : products.filter(p => (p.subCategory || p.category || '').toUpperCase() === activeTab);

    // Get Tri-Grid Items from brandData or specific images fallback
    const triGridItems = details.triGrid || [
        { image: products[0]?.image, heading: "Collection 1", description: "Latest Arrival", linkText: "Explore" },
        { image: products[1]?.image, heading: "Collection 2", description: "Trending Now", linkText: "Explore" },
        { image: products[2]?.image, heading: "Collection 3", description: "Best Seller", linkText: "Explore" }
    ];

    const feature1 = products.find(p => p.title.toLowerCase().includes('sweat') || p.category.toLowerCase().includes('sweat')) || products[4];
    const feature2 = products.find(p => p.title.toLowerCase().includes('athletic') || p.category.toLowerCase().includes('sport')) || products[5] || products[0];

    // Navigation for swipe
    const navigate = useNavigate();
    const [isSwiping, setIsSwiping] = React.useState(false);

    const handleSwipe = () => {
        if (isSwiping) return;
        setIsSwiping(true);
        setTimeout(() => {
            navigate(`/products?search=${encodeURIComponent(brandName)}`);
        }, 800);
    };

    const currentYear = new Date().getFullYear();

    return (
        <div className="bt-container tpl-minimalist">
            {/* Header / Hero */}
            <div className="min-header">
                <img src={details.logo} alt={brandName} style={{ maxHeight: '100px', objectFit: 'contain' }} />
            </div>

            <div className="min-hero">
                <div className="min-hero-top-text">{details.motto}</div>
                <div className="min-hero-title-wrapper">
                    <h1 className="min-hero-title min-hero-title-fill">{brandName}</h1>
                    <h1 className="min-hero-title min-hero-title-outline">{brandName}</h1>
                </div>
                <div className="min-hero-imgs">
                    <img src={currentHeroImg} className="min-hero-main-img" alt="Hero" style={{ transition: 'opacity 0.5s ease-in-out' }} />
                </div>

                <div
                    className={`min-swipe-card ${isSwiping ? 'swiping' : ''}`}
                    onClick={handleSwipe}
                    style={{ cursor: 'pointer' }}
                >
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>SWIPE</div>
                    <div className="min-swipe-line"></div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>DISCOVER NOW</div>
                </div>
            </div>

            {/* Socials */}
            <div className="min-socials">
                <span>Instagram</span>
                <span>Telegram</span>
                <span>Facebook</span>
                <span>Twitter</span>
            </div>

            {/* Ticker */}
            {/* Ticker */}
            <div className="min-ticker-wrap">
                <div className="min-ticker-track">
                    <div className="min-ticker-item">
                        THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp; THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp; THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp;
                        THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp;
                    </div>
                    <div className="min-ticker-item">
                        THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp; THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp; THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp;
                        THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp;
                    </div>
                    <div className="min-ticker-item">
                        THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp; THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp; THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp;
                        THE BEST {brandName} CLOTHING {currentYear} &nbsp;&bull;&nbsp;
                    </div>
                </div>
            </div>

            {/* 3 Col Highlight */}
            <div className="min-tri-grid">
                {triGridItems.map((item, i) => (
                    <div className="min-tri-item" key={i}>
                        <img src={item.image || products[i]?.image} className="min-tri-img" alt="Highlight" />
                        <div className="min-tri-overlay">
                            <h3 style={{ textTransform: 'uppercase', fontSize: '1.5rem', marginBottom: '5px' }}>
                                {item.heading}
                            </h3>
                            <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '10px' }}>
                                {item.description}
                            </p>
                            <Link to={`/products?search=${encodeURIComponent(brandName + ' ' + item.heading)}`} className="btn-explore">{item.linkText || "Explore"}</Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Collection */}
            <div className="min-collection">
                <h2 className="min-col-title">Our Collection</h2>
                <p className="min-col-desc">
                    {details.collectionDescription || `Explore the latest collection from ${brandName}. uniquely crafted for style and comfort.`}
                </p>

                <div className="min-filters">
                    {allCategories.map(cat => (
                        <button
                            key={cat}
                            className={`min-filter-btn ${activeTab === cat ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="min-prod-grid">
                    {filteredProducts.slice(0, 8).map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset min-prod-card">
                            <div className="min-price-tag">Rs. {p.price}</div>
                            <img src={p.image} className="min-prod-img" alt={p.title} />
                            <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>{p.title}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Features Section (Dynamic) */}
            {(details.features || [
                {
                    image: products[4]?.image,
                    num: "01",
                    title: "Quality Fabric",
                    description: "Premium materials chosen for durability and comfort."
                },
                {
                    image: products[5]?.image,
                    num: "02",
                    title: "Modern Design",
                    description: "Contemporary cuts that fit perfectly into your lifestyle."
                },
                {
                    image: products[0]?.image,
                    num: "03",
                    title: "Versatile Style",
                    description: "Looks that transition seamlessly from day to night."
                }
            ]).map((feature, i) => (
                <div className={`min-feature-row ${i % 2 !== 0 ? 'reverse' : ''}`} key={i}>
                    <div className="min-feat-img-box">
                        <img src={feature.image} style={{ width: '100%', maxWidth: '400px', height: 'auto' }} alt={`Feature ${i + 1}`} />
                    </div>
                    <div className="min-feat-content">
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <span className="min-feat-num">{feature.num || `0${i + 1}`}</span>
                            <h3 className="min-feat-title">{feature.title}</h3>
                        </div>
                        <p className="min-feat-desc">
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}

            {/* Limited Offer / Dynamic Section */}
            <div className="bt-container tpl-minimalist" style={{ padding: 0 }}>
                <div style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px' }}>
                    {details.limitedOffer?.heading || "Limited Offer"}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', paddingBottom: '60px' }}>
                    {(() => {
                        const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 2);
                        const offerImages = details.limitedOffer?.images || products.slice(0, 2).map(p => p.image);

                        return offerImages.map((img, i) => {
                            const productToLink = topRated[i];
                            return (
                                <div key={i} style={{ width: '300px' }}>
                                    {productToLink ? (
                                        <Link to={`/product/${productToLink.id}`}>
                                            <img src={img} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt={`Offer ${i}`} />
                                        </Link>
                                    ) : (
                                        <img src={img} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt={`Offer ${i}`} />
                                    )}
                                </div>
                            );
                        });
                    })()}
                </div>
                <div style={{ textAlign: 'center', paddingBottom: '60px' }}>
                    <Link to={`/products?search=${encodeURIComponent(brandName)}`}>
                        <button className="min-promo-btn">Start Shopping</button>
                    </Link>
                </div>
            </div>

            {/* Newsletter */}
            <div className="min-newsletter">
                <h2 className="min-news-title">Subscribe To Our<br />Newsletter</h2>
                <div className="min-news-input-wrap">
                    <input type="text" className="min-news-input" placeholder="YOUR EMAIL..." />
                    <button className="min-news-submit">&rarr;</button>
                </div>
            </div>

            {/* Footer */}
            <div className="min-footer">
                <div style={{ fontSize: '0.8rem', marginBottom: '20px', color: '#888' }}>
                    © HORIZONTAL ALL RIGHTS RESERVED
                </div>
                <div className="min-footer-logo">{brandName}</div>
                <div className="min-footer-links">
                    <Link to={`/products?search=${encodeURIComponent(brandName + ' Men')}`} className="min-footer-link-btn">Men</Link>
                    <Link to={`/products?search=${encodeURIComponent(brandName + ' Women')}`} className="min-footer-link-btn">Women</Link>
                    <Link to={`/products?search=${encodeURIComponent(brandName + ' Kids')}`} className="min-footer-link-btn">Children</Link>
                    <Link to={`/products?search=${encodeURIComponent(brandName)}`} className="min-footer-link-btn">Popular</Link>
                </div>
            </div>
        </div>
    );
};
