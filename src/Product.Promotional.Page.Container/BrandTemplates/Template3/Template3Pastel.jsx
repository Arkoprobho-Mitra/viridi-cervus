import React from 'react';
import { Link } from 'react-router-dom';
import './Template3Pastel.css';
import '../BrandTemplatesShared.css';

export const Template3Pastel = ({ brandName, products }) => {
    // Images
    const heroImg = products[0]?.image; // e.g. the lady in gold
    // Collection banner images (simulated split)
    const colImgs = products.slice(1, 4).map(p => p.image);
    // Feature section images
    const featImgs = products.slice(4, 6).map(p => p.image);

    return (
        <div className="bt-container tpl-ultra">
            {/* Nav */}
            <div className="ul-nav">
                <div className="ul-logo">{brandName.toUpperCase()}</div>
            </div>

            {/* Hero */}
            <div className="ul-hero">
                <img src={heroImg} className="ul-hero-img" alt="Hero" />
            </div>

            {/* New Arrivals */}
            <h2 className="ul-sect-title">New Arrivals</h2>
            <div className="ul-sect-line"></div>

            <div className="ul-prod-grid">
                {products.slice(0, 4).map(p => (
                    <Link to={`/product/${p.id}`} key={p.id} className="ul-prod-card">
                        <img src={p.image} className="ul-prod-img" alt={p.title} />
                        <div className="ul-prod-name">{p.category} {p.title}</div>
                        <div className="ul-prod-price">NT${Math.floor(p.price * 30)}</div> {/* Fake currency conversion for style */}
                    </Link>
                ))}
            </div>

            {/* Collection Banner */}
            <div className="ul-collection">
                <div className="ul-col-bg">
                    {colImgs.length > 0 && colImgs.map((img, i) => (
                        <img key={i} src={img} className="ul-col-bg-img" alt="Collection bg" />
                    ))}
                    {colImgs.length === 0 && <img src={heroImg} className="ul-col-bg-img" alt="Collection bg" />}
                </div>
                <div className="ul-col-content">
                    <div className="ul-col-title">COLLECTION</div>
                    <button className="ul-btn-outline">VIEW</button>
                </div>
            </div>

            {/* Feature Section */}
            <div className="ul-feature">
                <div className="ul-feat-imgs">
                    {featImgs.map((img, i) => (
                        <img key={i} src={img} className="ul-feat-img" alt="Feature" />
                    ))}
                    {featImgs.length === 0 && <img src={products[0]?.image} className="ul-feat-img" alt="Feature fallback" />}
                </div>
                <div className="ul-feat-text">
                    <h3 className="ul-feat-head">Twice as Cozy</h3>
                    <div style={{ width: 30, height: 2, background: '#d45d5d', marginBottom: 20 }}></div>
                    <p className="ul-feat-desc">
                        Shop the latest fashion online at ULTRA and discover new favorites in women's clothing.
                        Find everything from casual day dresses to sharp office wear. We have jeans in every fit,
                        premium quality items and the latest fashion essentials.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="ul-footer">
                <div className="ul-foot-col">
                    <h4>About Us</h4>
                    <div>Our Story</div>
                    <div>Our Spirit</div>
                    <div>Our Member</div>
                </div>
                <div className="ul-foot-col">
                    <h4>Customer Service</h4>
                    <div>Contact Us</div>
                    <div>Delivery Options</div>
                    <div>Payment Methods</div>
                </div>
                <div className="ul-foot-col">
                    <h4>Call Us</h4>
                    <div>Tel / 02-1234-5678</div>
                    <div>Time / AM 08:00 - PM 10:00</div>
                    <div>Email / ultrachic@shoplineapp.com</div>
                </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.7rem', paddingBottom: 20, color: '#999' }}>
                Privacy Policy | Terms & Conditions | 2020 © Your Brand
            </div>
        </div>
    );
};
