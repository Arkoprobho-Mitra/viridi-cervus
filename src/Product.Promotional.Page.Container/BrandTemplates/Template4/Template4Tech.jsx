import React from 'react';
import { Link } from 'react-router-dom';
import './Template4Tech.css';
import '../BrandTemplatesShared.css';

export const Template4Tech = ({ brandName, products }) => {
    const [activeTab, setActiveTab] = React.useState('WOMEN');
    const tabs = ['WOMEN', 'MEN', 'SHOES', 'BAGS', 'ACCESSORIES'];

    // Hero Image (Use first product or specific brand asset logic)
    const heroImg = products[0]?.image;

    // Filter products (Mock logic for tabs since we might not have exact matches)
    // We'll just shuffle or slice differently to simulate
    const filteredProducts = products.slice(0, 8);

    // Bento Images
    const bento1 = products[1]?.image;
    const bento2 = products[2]?.image;
    const bento3 = products[3]?.image;

    return (
        <div className="bt-container tpl-mixtas">
            {/* Nav */}
            <div className="mix-nav">
                <div className="mix-nav-links">
                    <span>Home</span>
                    <span>Shop</span>
                    <span>Pages</span>
                    <span>Blog</span>
                </div>
                <div className="mix-logo">Mixtas</div>
                <div className="mix-nav-links">
                    <span>Account</span>
                    <span>Search</span>
                    <span>Cart (0)</span>
                </div>
            </div>

            {/* Hero */}
            <div className="mix-hero">
                <img src={heroImg} className="mix-hero-img" alt="Hero" />
                <div className="mix-hero-content">
                    <div className="mix-sub">URBAN EDGE</div>
                    <div className="mix-title">Jackets for the<br />Modern Man</div>
                    <button className="mix-btn">Discovery Now</button>
                </div>
            </div>

            {/* New Arrivals */}
            <div className="mix-scd-sec">
                <h2 className="mix-sec-title">New Arrivals</h2>

                <div className="mix-tabs">
                    {tabs.map(tab => (
                        <div
                            key={tab}
                            className={`mix-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                <div className="mix-grid">
                    {filteredProducts.map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="mix-card">
                            <div className="mix-card-img-wrap">
                                <img src={p.image} className="mix-card-img" alt={p.title} />
                            </div>
                            <div className="mix-card-meta">Jackets</div>
                            <div className="mix-card-title">{p.title}</div>
                            <div className="mix-card-price">${p.price}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bento Categories */}
            <div className="mix-bento">
                {/* Tall Left */}
                <div className="mix-bento-item item-tall-left">
                    <img src={bento1} className="mix-bento-img" alt="Bento 1" />
                    <div className="mix-bento-content">
                        <div className="mix-bento-sub">ETHEREAL ELEGANCE</div>
                        <div className="mix-bento-head">Where Dreams<br />Meet Couture</div>
                        <button className="mix-bento-btn">Shop Now</button>
                    </div>
                </div>

                {/* Top Mid (Wide) */}
                <div className="mix-bento-item item-top-mid">
                    <img src={bento2} className="mix-bento-img" alt="Bento 2" />
                    <div className="mix-bento-content">
                        <div className="mix-bento-sub">RADIANT REVERIE</div>
                        <div className="mix-bento-head">Enchanting Styles<br />for Every Woman</div>
                        <button className="mix-bento-btn">Shop Now</button>
                    </div>
                </div>

                {/* Bottom Left (Small) */}
                <div className="mix-bento-item item-bot-left">
                    <img src={bento3} className="mix-bento-img" alt="Bento 3" />
                    <div className="mix-bento-content">
                        <div className="mix-bento-sub">URBAN STRIDES</div>
                        <div className="mix-bento-head" style={{ fontSize: '1.5rem' }}>Chic Footwear for<br />City Living</div>
                        <button className="mix-bento-btn">Shop Now</button>
                    </div>
                </div>

                {/* Bottom Right (Promo/Text) */}
                <div className="mix-bento-item item-bot-right">
                    <div style={{ color: '#fff', fontSize: '1rem', marginBottom: 10 }}>Trendsetting Bags for Her</div>
                    <div style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>50%</div>
                    <button className="mix-bento-btn">Shop Now</button>
                </div>
            </div>
        </div>
    );
};
