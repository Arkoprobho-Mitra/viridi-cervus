import React from 'react';
import { Link } from 'react-router-dom';
import './Template2Editorial.css';
import '../BrandTemplatesShared.css';

export const Template2Editorial = ({ brandName, products }) => {
    // Determine active category for local filtering
    const [activeCat, setActiveCat] = React.useState('ALL');

    // Extract categories
    const categories = ['ALL', ...new Set(products.map(p => (p.subCategory || p.category || 'Other').toUpperCase()))].slice(0, 6);

    // Filter products
    const filteredProducts = activeCat === 'ALL'
        ? products
        : products.filter(p => (p.subCategory || p.category || '').toUpperCase() === activeCat);

    // Images for hero (need 3 distinct if possible)
    const heroImgs = products.slice(0, 3).map(p => p.image);
    while (heroImgs.length < 3 && products[0]) heroImgs.push(products[0].image);

    const featureImg = products[3]?.image || products[0]?.image;

    return (
        <div className="bt-container tpl-editorial">
            {/* Header / Nav Strip */}
            <div className="ed-header">
                <div>Catalog</div>
                <div>New Collection</div>
                <div className="ed-logo">{brandName}</div>
                <div>About Us</div>
                <div>Contact</div>
            </div>

            {/* Hero Grid */}
            <div className="ed-hero">
                <div className="ed-hero-img-col">
                    <img src={heroImgs[0]} className="ed-hero-img" alt="model 1" />
                </div>
                <div className="ed-hero-img-col">
                    <img src={heroImgs[1]} className="ed-hero-img" alt="model 2" />
                </div>
                <div className="ed-hero-img-col">
                    <img src={heroImgs[2]} className="ed-hero-img" alt="model 3" />
                    <div className="ed-hero-overlay">
                        <h1 className="ed-hero-title">AUTHOR'S<br />CLOTHING</h1>
                        <p className="ed-hero-sub">WHICH AWAKENS SELF-LOVE</p>
                        <button className="ed-hero-btn">Go to Catalog</button>
                    </div>
                </div>
            </div>

            {/* Catalog Section */}
            <div className="ed-catalog-header">
                <div className="ed-cat-title">CATALOG</div>
                <div className="ed-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`ed-filter-btn ${activeCat === cat ? 'active' : ''}`}
                            onClick={() => setActiveCat(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="ed-prod-grid">
                {filteredProducts.slice(0, 8).map(p => (
                    <Link to={`/product/${p.id}`} key={p.id} className="ed-prod-card">
                        <div className="ed-prod-img-wrap">
                            <img src={p.image} className="ed-prod-img" alt={p.title} />
                            <div style={{ position: 'absolute', top: 10, right: 10, background: '#fff', padding: 5, borderRadius: '50%' }}>
                                ♡
                            </div>
                        </div>
                        <div className="ed-prod-info">
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>{p.category}</div>
                                <div style={{ fontWeight: 600, marginTop: 5 }}>Rs. {p.price}</div>
                            </div>
                            <button className="ed-icon-btn">Add</button>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Feature Section */}
            <div className="ed-feature-sec">
                <div className="ed-feat-img-side">
                    <img src={featureImg} className="ed-feat-model-img" alt="Feature Model" />
                </div>
                <div className="ed-feat-text-side">
                    <div style={{ textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10, fontSize: '0.8rem' }}>Art of Modern Elegance</div>
                    <div className="ed-feat-title">{brandName}</div>
                    <p className="ed-feat-desc">
                        This is more than clothing. It is an expression of modern femininity in all its diversity.
                        We create not just wardrobe items, but instruments of self-expression for women who remain true to themselves.
                    </p>
                </div>
            </div>

            {/* Footer / Signup */}
            <div className="ed-footer-signup">
                <div className="ed-signup-text">
                    Subscribe to our newsletter to receive updates on our latest collections.
                    <br />
                    Get a <strong>10% discount</strong> on your first order by subscribing.
                </div>
                <div className="ed-email-row">
                    <input type="email" className="ed-email-input" placeholder="Enter your Email" />
                    <button className="ed-sub-btn">Subscribe</button>
                </div>
                <div style={{ marginTop: 20, fontSize: '0.7rem', color: '#ccc' }}>
                    You can unsubscribe at any time.
                </div>
            </div>
        </div>
    );
};
