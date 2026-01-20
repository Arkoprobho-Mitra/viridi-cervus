import React from 'react';
import { Link } from 'react-router-dom';
import './Template5Luxury.css';
import '../BrandTemplatesShared.css';

export const Template5Luxury = ({ brandName, products }) => {
    // Hero: Puffer jacket vibe
    const heroImg = products.find(p => p.category.toLowerCase().includes('jacket'))?.image || products[0]?.image;

    // Grid items
    const gridItems = products.slice(0, 8); // Display 8 items

    return (
        <div className="bt-container tpl-artic">
            {/* Nav */}
            <div className="art-nav">
                <div>FRRN</div> {/* Mock logo code from image */}
                <div style={{ display: 'flex', gap: 20 }}>
                    <span>CATALOG /</span>
                    <span>PUFFERS /</span>
                    <span>BOOTS /</span>
                </div>
                <div>CART (0)</div>
            </div>

            {/* Hero */}
            <div className="art-hero">
                <div className="art-hero-bg-text">ARTIC COLLECTION</div>
                <div className="art-hero-content">
                    <div className="art-hero-left">
                        <div style={{ fontSize: '0.7rem', marginBottom: 10 }}>// WINTER SERIES 01 // 2024 //</div>
                        <h1 className="art-hero-title">COLLECTION<br />ARTIC 01™</h1>
                        <div style={{ fontSize: '0.8rem', display: 'grid', gridTemplateColumns: '50px 1fr', gap: 10, maxWidth: 200, opacity: 0.8 }}>
                            <div>SIZE</div><div>S M L XL</div>
                            <div>COLOUR</div><div>WHITE SILVER</div>
                        </div>
                        <div className="art-hero-price-box">
                            <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↗</div>
                            <div>
                                <div style={{ fontSize: '0.6rem' }}>ADD TO CART</div>
                                <div className="art-price">$899.99</div>
                            </div>
                        </div>
                    </div>
                    <div className="art-hero-center">
                        <img src={heroImg} className="art-hero-model" alt="Hero Model" />
                    </div>
                    <div className="art-hero-right">
                        {gridItems.slice(0, 2).map((p, i) => (
                            <img key={i} src={p.image} className="art-hero-thumb" style={{ opacity: 0.6 }} alt="thumb" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Collection Grid */}
            <div className="art-collection">
                <div className="art-sec-header">
                    <h2 className="art-sec-title">NEW COLLECTION</h2>
                    <div style={{ fontSize: '0.7rem', textAlign: 'right' }}>
                        PUFFER JACKETS<br />METAL EDITION<br />EXTREME COLD LINE
                    </div>
                </div>

                <div className="art-grid">
                    {gridItems.map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="art-card">
                            <img src={p.image} className="art-card-img" alt={p.title} />
                            <div className="art-card-name">{p.category}</div>
                            <div style={{ fontSize: '0.7rem', color: '#ccc', marginBottom: 10 }}>{p.title}</div>
                            <div className="art-card-price">$1,299.00</div>
                            <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 10 }}>
                                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }}></span>
                                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4a5d6e' }}></span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="art-footer">
                <img src={heroImg} className="art-footer-bg" alt="Footer Mountain" />
                <div className="art-footer-overlay"></div>
                <div className="art-big-text">STÜSSY</div> {/* Or similar graphite style text */}

                <div className="art-footer-content">
                    <div className="art-footer-info">
                        <div style={{ fontSize: '0.7rem', marginBottom: 20 }}>FRRN WAS BORN IN<br />THE MOUNTAINS. NOT<br />AS A BRAND, BUT AS<br />A RESPONSE.</div>
                        <h2 className="art-footer-slogan">BUILT FOR COLD<br />MADE FOR HEIGHT<br />FORGED TO LAST</h2>
                    </div>
                    <div className="art-footer-bar">
                        COPYRIGHT FRRN WEAR // ALL RIGHTS RESERVED
                    </div>
                </div>
            </div>
        </div>
    );
};
