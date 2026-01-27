import React from 'react';
import { Link } from 'react-router-dom';
import { getBrandDetails } from '../../brandData';
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
    // Get brand details
    const brandDetails = getBrandDetails(brandName);
    const brandHeroImages = brandDetails.heroImages || [];

    // Images for hero (need 3 distinct if possible, prioritize brand specific, fallback to products)
    let heroImgs = [...brandHeroImages];
    if (heroImgs.length < 3) {
        const productImages = products.slice(0, 3 - heroImgs.length).map(p => p.image);
        heroImgs = [...heroImgs, ...productImages];
    }
    // Fill remaining with first product image if still not enough
    while (heroImgs.length < 3 && products[0]) heroImgs.push(products[0].image);

    const featureImg = brandDetails.featureImage || products[3]?.image || products[0]?.image;

    return (
        <div className="bt-container tpl-editorial">
            {/* Header / Nav Strip */}
            <div className="ed-header">
                <img src={brandDetails.logo} alt={brandName} className="ed-logo" style={{ maxHeight: '60px', objectFit: 'contain' }} />
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
                </div>

                <div className="ed-hero-overlay">
                    <h1 className="ed-hero-title">{brandName.toUpperCase()}</h1>
                    <p className="ed-hero-sub">{brandDetails.motto}</p>
                    <Link to={`/products?brand=${encodeURIComponent(brandName)}`} className="ed-hero-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>Go to Catalog</Link>
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
                            <div className="ed-prod-img-price">Rs. {p.price}</div>
                        </div>
                        <div className="ed-prod-info">
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{p.category}</div>
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
                    <div style={{ textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10, fontSize: '0.8rem' }}>{brandDetails.featureTagline || 'Art of Modern Elegance'}</div>
                    <div className="ed-feat-title">{brandName}</div>
                    <p className="ed-feat-desc">
                        {brandDetails.featureDescription || 'This is more than clothing. It is an expression of modern femininity in all its diversity. We create not just wardrobe items, but instruments of self-expression for women who remain true to themselves.'}
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
