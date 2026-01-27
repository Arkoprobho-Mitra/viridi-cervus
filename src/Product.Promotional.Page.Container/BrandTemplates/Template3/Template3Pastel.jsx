import React from 'react';
import { Link } from 'react-router-dom';
import { getBrandDetails } from '../../brandData';
import './Template3Pastel.css';
import '../BrandTemplatesShared.css';

export const Template3Pastel = ({ brandName, products }) => {
    const details = getBrandDetails(brandName);

    // Images
    const heroImg = (details.heroImages && details.heroImages.length > 0) ? details.heroImages[0] : products[0]?.image;
    // Collection banner images (simulated split)
    const colImgs = products.slice(1, 4).map(p => p.image);
    // Feature section images (Brand provided or fallback)
    const featImgs = (details.features && details.features.length >= 2)
        ? details.features.map(f => f.image)
        : products.slice(4, 6).map(p => p.image);

    return (
        <div className="bt-container tpl-ultra">
            {/* Nav */}
            <div className="ul-nav">
                <img src={details.logo} alt={brandName} className="ul-logo" style={{ maxHeight: '50px', objectFit: 'contain' }} />
            </div>

            {/* Hero */}
            <div className="ul-hero">
                <img src={heroImg} className="ul-hero-img" alt="Hero" />
                <div className="ul-hero-content">
                    <h1 className="ul-hero-brand">{brandName}</h1>
                    <p className="ul-hero-motto">{details.motto}</p>
                </div>
            </div>

            {/* New Arrivals */}
            <h2 className="ul-sect-title">New Arrivals</h2>
            <div className="ul-sect-line"></div>

            <div className="ul-prod-grid">
                {products.slice(0, 4).map(p => (
                    <Link to={`/product/${p.id}`} key={p.id} className="ul-prod-card">
                        <img src={p.image} className="ul-prod-img" alt={p.title} />
                        <div className="ul-prod-name">{p.category} {p.title}</div>
                        <div className="ul-prod-price">Rs. {p.price}</div>
                    </Link>
                ))}
            </div>

            {/* Collection Banner Ribbon */}
            <div className="ul-collection">
                <div className="ul-ribbon-wrapper">
                    <div className="ul-ribbon-track">
                        {/* Duplicate products to ensure seamless infinite scroll */}
                        {[...products, ...products, ...products].map((p, i) => (
                            <img key={i} src={p.image} className="ul-ribbon-img" alt={p.title} />
                        ))}
                    </div>
                </div>

                <div className="ul-col-content">
                    <div className="ul-col-title">COLLECTION</div>
                    <Link to={`/products?search=${encodeURIComponent(brandName)}`}>
                        <button className="ul-btn-outline">VIEW</button>
                    </Link>
                </div>
            </div>

            {/* Feature Section */}
            <div className="ul-feature">
                <div className="ul-feat-imgs">
                    {/* First Image -> New Arrived */}
                    <Link to={`/products?search=${encodeURIComponent(brandName)}&sort=new`} className="ul-feat-link">
                        <img src={featImgs[0] || products[0]?.image} className="ul-feat-img" alt="New Arrivals" />
                    </Link>
                    {/* Second Image -> Most Bought */}
                    <Link to={`/products?search=${encodeURIComponent(brandName)}&sort=popularity`} className="ul-feat-link">
                        <img src={featImgs[1] || products[1]?.image} className="ul-feat-img" alt="Most Bought" />
                    </Link>
                </div>
                <div className="ul-feat-text">
                    <h3 className="ul-feat-head">{details.featureTagline || "Twice as Cozy"}</h3>
                    <div style={{ width: 30, height: 2, background: 'forestgreen', marginBottom: 20 }}></div>
                    <p className="ul-feat-desc">
                        {details.featureDescription || `Shop the latest fashion online at ${brandName} and discover new favorites. Find everything from casual day wear to sharp office attire. We have styles in every fit, premium quality items and the latest fashion essentials.`}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', fontSize: '0.7rem', paddingBottom: 20, color: '#999' }}>
                Privacy Policy | Terms & Conditions | 2020 © {brandName}
            </div>
        </div>
    );
};
