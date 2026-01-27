import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBrandDetails } from '../../brandData';
import './Template6Pop.css';
import '../BrandTemplatesShared.css';

export const Template6Pop = ({ brandName, products }) => {
    const details = getBrandDetails(brandName);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState('NEW ARRIVALS');

    // Images
    const heroImg = details.heroImages?.[0] || products.find(p => p.category.toLowerCase().includes('shirt'))?.image || products[0]?.image;

    // Filter Logic
    let displayProducts = products.slice(0, 4);
    if (activeTab === 'FEATURED') displayProducts = products.slice(2, 6);
    if (activeTab === 'BEST SELLER') displayProducts = products.slice(4, 8);

    return (
        <div className="bt-container tpl-massimo">
            {/* Nav */}
            <div className="mass-nav">
                <img src={details.logo} alt={brandName} className="mass-logo" style={{ maxHeight: '50px', justifyContent: 'center', alignItems: 'center', objectFit: 'contain' }} />
            </div>

            {/* Hero */}
            <div className="mass-hero">
                <img src={heroImg} className="mass-hero-img" alt="Hero" />
                <div className="mass-hero-overlay">
                    <div className="mass-hero-title">{brandName.toUpperCase()}</div>
                    <div style={{ fontSize: '1.5rem', letterSpacing: 2, marginBottom: 20, fontStyle: 'italic', fontWeight: 300 }}>{details.motto}</div>
                    <button className="mass-hero-btn" onClick={() => navigate(`/products?search=${brandName}`)}>Discover</button>
                </div>
            </div>

            {/* Service Strip */}
            <div className="mass-strip">
                {(details.features || [
                    { title: "FREE SHIPPING WORLDWIDE", description: "On order over $100" },
                    { title: "24/7 SUPPORT", description: "International delivery available" },
                    { title: "MONEY GUARANTEE", description: "30 days money back guarantee" }
                ]).slice(0, 3).map((f, i) => (
                    <div key={i}><strong>{f.title}</strong>{f.description}</div>
                ))}
            </div>

            {/* Mosaic Grid */}
            <div className="mass-mosaic">
                {(details.mosaicSection || [
                    { title: "Sweaters & Cardigans", subTitle: "Massimo", image: products[1]?.image },
                    { title: "Ankle Boots & Bluchers", subTitle: "New Trend", image: products[2]?.image },
                    { title: "Bags & Wallets", subTitle: "Accessories", image: products[3]?.image }
                ]).map((item, index) => (
                    <div
                        key={index}
                        className={`mass-mosaic-item ${index === 1 ? 'wide' : ''}`}
                        onClick={() => navigate(`/products?brand=${encodeURIComponent(brandName)}&search=${encodeURIComponent(item.title)}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={item.image} className="mass-mosaic-img" alt={item.title} />
                        <div className="mass-mosaic-content">
                            <div className="mass-mosaic-sub">{item.subTitle}</div>
                            <div className="mass-mosaic-title">{item.title}</div>
                            <div style={{ fontSize: '0.7rem', marginTop: 10 }}>Shop Now</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Top Products Tabs */}
            <div className="mass-tabs-sec">
                <h3 className="mass-sec-head">TOP PRODUCTS</h3>
                <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: 30 }}>Browse the collection of our best selling and top interesting products.</div>

                <div className="mass-tabs">
                    {['NEW ARRIVALS', 'FEATURED', 'BEST SELLER'].map(tab => (
                        <div
                            key={tab}
                            className={`mass-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                <div className="mass-prod-grid">
                    {displayProducts.map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="mass-prod-card">
                            <img src={p.image} className="mass-prod-img" alt={p.title} />
                            <div className="mass-prod-title">{p.title}</div>
                            <div className="mass-prod-price">Rs. {p.price}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Infinite Product Ribbon */}
            <div className="mass-ribbon-sec">
                <h3 className="mass-sec-head" style={{ color: '#fff', fontWeight: 700 }}>VIEW OUR PRODUCTS</h3>
                <div className="mass-ribbon-track">
                    {/* Render products twice for seamless loop */}
                    {[...products.slice(0, 16), ...products.slice(0, 16)].map((p, i) => (
                        <div key={i} className="mass-ribbon-item" onClick={() => navigate(`/product/${p.id}`)}>
                            <img src={p.image} className="mass-ribbon-img" alt={p.title} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer (About & Newsletter) */}
            <div className="mass-footer">
                <div className="mass-footer-content">
                    <div className="mass-foot-col">
                        <h4>ABOUT US</h4>
                        <p>{details.description || "We are a brand committed to quality, style, and sustainability. Explore our collections and find your perfect look today."}</p>
                    </div>
                    <div className="mass-foot-col">
                        <h4>NEWSLETTER</h4>
                        <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="mass-newsletter">
                            <input type="email" placeholder="Enter your email" />
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Strip */}
            <div style={{ background: '#333', color: '#999', padding: '20px', textAlign: 'center', fontSize: '0.7rem' }}>
                Copyright 2024 Massimo Theme. All Rights Reserved.
            </div>
        </div>
    );
};
