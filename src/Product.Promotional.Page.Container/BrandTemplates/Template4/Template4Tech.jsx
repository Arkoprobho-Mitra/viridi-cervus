import React from 'react';
import { Link } from 'react-router-dom';
import { getBrandDetails } from '../../brandData';
import './Template4Tech.css';
import '../BrandTemplatesShared.css';

export const Template4Tech = ({ brandName, products }) => {
    const details = getBrandDetails(brandName);
    // Dynamic Tabs from Brand Data or Products
    const tabs = details.categories || ['ALL', ...new Set(products.map(p => (p.subCategory || p.category || 'POPULAR').toUpperCase()))].slice(0, 5);
    const [activeTab, setActiveTab] = React.useState(tabs[0]);

    // Hero Image (Use first product or specific brand asset logic)
    const heroImg = (details.heroImages && details.heroImages.length > 0) ? details.heroImages[0] : products[0]?.image;

    // Filter products based on active tab
    const filteredProducts = activeTab === 'ALL'
        ? products.slice(0, 8)
        : products.filter(p => (p.subCategory || p.category || '').toUpperCase() === activeTab).slice(0, 8);

    // Bento Items (Dynamic or Fallback)
    const bentoItems = details.bentoGrid || [
        { image: products[1]?.image, subTitle: "ETHEREAL ELEGANCE", heading: "Where Dreams Meet Couture", link: "/products" },
        { image: products[2]?.image, subTitle: "RADIANT REVERIE", heading: "Enchanting Styles for Every Woman", link: "/products" },
        { image: products[3]?.image, subTitle: "URBAN STRIDES", heading: "Chic Footwear for City Living", link: "/products" },
        { image: null, subTitle: "Trendsetting Bags for Her", heading: "30% to 50% Off", isTextOnly: true, link: "/products" }
    ];

    return (
        <div className="bt-container tpl-mixtas">
            {/* Nav */}
            <div className="mix-nav">
                <img src={details.logo} alt={brandName} className="mix-logo" style={{ maxHeight: '40px', objectFit: 'contain' }} />
            </div>

            {/* Hero */}
            <div className="mix-hero">
                <img src={heroImg} className="mix-hero-img" alt="Hero" />
                <div className="mix-hero-content">
                    <div className="mix-sub">{details.motto}</div>
                    <div className="mix-title">{brandName}</div>
                    <Link to={`/products?search=${encodeURIComponent(brandName)}`}>
                        <button className="mix-btn">Discovery Now</button>
                    </Link>
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
                            <div className="mix-card-title">{p.title}</div>
                            <div className="mix-card-price">Rs. {p.price}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bento Categories */}
            <div className="mix-bento">
                {/* Tall Left (Index 0) */}
                <div className="mix-bento-item item-tall-left">
                    <img src={bentoItems[0].image || products[1]?.image} className="mix-bento-img" alt="Bento 1" />
                    <div className="mix-bento-content">
                        <div className="mix-bento-sub">{bentoItems[0].subTitle}</div>
                        <div className="mix-bento-head">{bentoItems[0].heading}</div>
                        <Link to={bentoItems[0].link}>
                            <button className="mix-bento-btn">Shop Now</button>
                        </Link>
                    </div>
                </div>

                {/* Top Mid (Wide) (Index 1) */}
                <div className="mix-bento-item item-top-mid">
                    <img src={bentoItems[1].image || products[2]?.image} className="mix-bento-img" alt="Bento 2" />
                    <div className="mix-bento-content">
                        <div className="mix-bento-sub">{bentoItems[1].subTitle}</div>
                        <div className="mix-bento-head">{bentoItems[1].heading}</div>
                        <Link to={bentoItems[1].link}>
                            <button className="mix-bento-btn">Shop Now</button>
                        </Link>
                    </div>
                </div>

                {/* Bottom Left (Small) (Index 2) */}
                <div className="mix-bento-item item-bot-left">
                    <img src={bentoItems[2].image || products[3]?.image} className="mix-bento-img" alt="Bento 3" />
                    <div className="mix-bento-content">
                        <div className="mix-bento-sub">{bentoItems[2].subTitle}</div>
                        <div className="mix-bento-head" style={{ fontSize: '1.5rem' }}>{bentoItems[2].heading}</div>
                        <Link to={bentoItems[2].link}>
                            <button className="mix-bento-btn">Shop Now</button>
                        </Link>
                    </div>
                </div>

                {/* Bottom Right (Promo/Text/Image) (Index 3) */}
                <div className="mix-bento-item item-bot-right" style={{
                    backgroundImage: bentoItems[3].isTextOnly ? 'none' : `url(${bentoItems[3].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: bentoItems[3].isTextOnly ? '#fff' : '#fff' // Assuming image needs white text
                }}>
                    {/* Add overlay if image */}
                    {!bentoItems[3].isTextOnly && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }}></div>}

                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: '1rem', marginBottom: 10 }}>{bentoItems[3].subTitle}</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>{bentoItems[3].heading}</div>
                        <Link to={bentoItems[3].link}>
                            <button className="mix-bento-btn">Shop Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
