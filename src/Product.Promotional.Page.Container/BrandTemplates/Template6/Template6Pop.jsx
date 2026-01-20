import React from 'react';
import { Link } from 'react-router-dom';
import './Template6Pop.css';
import '../BrandTemplatesShared.css';

export const Template6Pop = ({ brandName, products }) => {
    const [activeTab, setActiveTab] = React.useState('NEW ARRIVALS');

    // Images
    const heroImg = products.find(p => p.category.toLowerCase().includes('shirt'))?.image || products[0]?.image;

    // Mosaic Collection (Mock data)
    const mosaic1 = products[1]?.image; // Sweaters
    const mosaic2 = products[2]?.image; // Accessories
    const mosaic3 = products[3]?.image; // Boots

    // Filter Logic
    // Just mock shuffling for the tabs
    let displayProducts = products.slice(0, 4);
    if (activeTab === 'FEATURED') displayProducts = products.slice(2, 6);
    if (activeTab === 'BEST SELLER') displayProducts = products.slice(4, 8);

    return (
        <div className="bt-container tpl-massimo">
            {/* Nav */}
            <div className="mass-nav">
                <div className="mass-links">
                    <span>Let's Get Social</span>
                    <span>Start Selling</span>
                </div>
                <div className="mass-logo">Massimo</div>
                <div className="mass-links">
                    <span>Search</span>
                    <span>Account</span>
                    <span>Cart (0)</span>
                </div>
            </div>

            {/* Hero */}
            <div className="mass-hero">
                <img src={heroImg} className="mass-hero-img" alt="Hero" />
                <div className="mass-hero-overlay">
                    <div style={{ fontSize: '1.2rem', color: '#d4af37', fontStyle: 'italic', marginBottom: 10 }}>Massimo S.</div>
                    <div className="mass-hero-title">- PERSONAL TAILORING -</div>
                    <div style={{ fontSize: '0.8rem', letterSpacing: 2, marginBottom: 20 }}>LIMITED EDITION 02 // S/S 17</div>
                    <button className="mass-hero-btn">Discover</button>
                </div>
            </div>

            {/* Service Strip */}
            <div className="mass-strip">
                <div><strong>FREE SHIPPING WORLDWIDE</strong>On order over $100</div>
                <div><strong>24/7 SUPPORT</strong>International delivery available</div>
                <div><strong>MONEY GUARANTEE</strong>30 days money back guarantee</div>
            </div>

            {/* Mosaic Grid */}
            <div className="mass-mosaic">
                {/* 1. Tall Left */}
                <div className="mass-mosaic-item">
                    <img src={mosaic1} className="mass-mosaic-img" alt="m1" />
                    <div className="mass-mosaic-content">
                        <div className="mass-mosaic-sub">Massimo</div>
                        <div className="mass-mosaic-title">Sweaters<br />& Cardigans</div>
                        <div style={{ fontSize: '0.7rem', marginTop: 10 }}>Discover now</div>
                    </div>
                </div>
                {/* 2. Wide Top Right (Split logic simulated or just single block) -> using 3 col grid logic from CSS */}
                <div className="mass-mosaic-item wide">
                    <img src={mosaic2} className="mass-mosaic-img" alt="m2" />
                    <div className="mass-mosaic-content">
                        <div className="mass-mosaic-sub">New Trend</div>
                        <div className="mass-mosaic-title">Ankle Boots<br />& Bluchers</div>
                        <div style={{ fontSize: '0.7rem', marginTop: 10 }}>Shop Now</div>
                    </div>
                </div>
                {/* 3. Tall Right */}
                <div className="mass-mosaic-item">
                    <img src={mosaic3} className="mass-mosaic-img" alt="m3" />
                    <div className="mass-mosaic-content">
                        <div className="mass-mosaic-sub">Accessories</div>
                        <div className="mass-mosaic-title">Bags &<br />Wallets</div>
                        <div style={{ fontSize: '0.7rem', marginTop: 10 }}>View All</div>
                    </div>
                </div>
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
                            <div className="mass-prod-price">${p.price}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Shop Categories (Just images) */}
            <div style={{ background: '#000', color: '#fff', padding: '60px 0', marginTop: 60, textAlign: 'center' }}>
                <h3 className="mass-sec-head" style={{ color: '#fff' }}>SHOP BY CATEGORY</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 30, flexWrap: 'wrap' }}>
                    <div style={{ width: 300, height: 200, background: '#222' }}>
                        <img src={products[5]?.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="cat" />
                        <div style={{ marginTop: 10 }}>WOMEN'S WEAR</div>
                    </div>
                    <div style={{ width: 300, height: 200, background: '#222' }}>
                        <img src={products[6]?.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="cat" />
                        <div style={{ marginTop: 10 }}>MEN'S CLOTHING</div>
                    </div>
                    <div style={{ width: 300, height: 200, background: '#222' }}>
                        <img src={products[7]?.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="cat" />
                        <div style={{ marginTop: 10 }}>TAILORING</div>
                    </div>
                </div>
            </div>

            {/* Daily Deals Footer */}
            <div className="mass-footer">
                <div className="mass-sec-head" style={{ textAlign: 'center', color: '#c5a059' }}>DAILY DEALS</div>
                <div className="mass-deals-grid">
                    {/* Top Sellers Column */}
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: 20, textTransform: 'uppercase' }}>Top Sellers</div>
                        {products.slice(0, 3).map(p => (
                            <div key={p.id} style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
                                <img src={p.image} style={{ width: 60, height: 80, objectFit: 'cover' }} alt="thumb" />
                                <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{p.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#c5a059' }}>${p.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Deal Main */}
                    <div className="mass-deal-main">
                        <div className="mass-deal-content">
                            <div style={{ width: 150, height: 200, background: '#eee', margin: '0 auto 20px' }}>
                                <img src={products[4]?.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="deal" />
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: 700 }}>LIMITED EDITION JACKET</div>
                            <div style={{ color: '#c5a059', fontSize: '1.2rem', margin: '10px 0' }}>$999.95</div>
                            <div className="mass-countdown">
                                <div className="mass-time-box"><div>114</div>DAYS</div>
                                <div className="mass-time-box"><div>12</div>HOURS</div>
                                <div className="mass-time-box"><div>45</div>MINS</div>
                            </div>
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
