import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBrandDetails } from '../../brandData';
import './Template7Nature.css';
import '../BrandTemplatesShared.css';

export const Template7Nature = ({ brandName, products }) => {
    const details = getBrandDetails(brandName);
    const navigate = useNavigate();

    // Images
    const heroImg = details.heroImages?.[0] || products.find(p => p.category === 'Men')?.image || products[0]?.image;
    const promoImg = details.promoSection?.image || products.find(p => p.category === 'Topwear')?.image || products[1]?.image;
    const bannerImg = details.bannerSection?.image || products[3]?.image || products[2]?.image;

    // Featured (Slice 0-3)
    const featured = products.slice(0, 3);
    // Best Sellers (Slice 3-7)
    const bestSellers = products.slice(3, 7);
    // Top Rated (Slice 0-3 shuffled mock)
    const topRated = products.slice(0, 3).reverse();

    return (
        <div className="bt-container tpl-inspira">
            <div className="ins-nav">
                <img src={details.logo} alt={brandName} style={{ maxHeight: '50px', objectFit: 'contain', justifyContent: 'center', alignItems: 'center', margin: '0 20px' }} />
            </div>

            {/* Hero */}
            <div className="ins-hero">
                <img src={heroImg} className="ins-hero-img" alt="Hero" />
                <div className="ins-hero-content">
                    <div className="ins-hero-title">{brandName.toUpperCase()}<br /><span style={{ fontSize: '2.5rem', fontWeight: 300 }}>{details.motto}</span></div>
                    <button className="ins-hero-btn" onClick={() => navigate(`/products?search=${brandName}`)}>Shop Now</button>
                </div>
            </div>

            {/* Split 1: Featured + Promo */}
            <div className="ins-split-1">
                <div>
                    <div className="ins-sec-head">FEATURED PRODUCTS</div>
                    <div className="ins-feat-grid">
                        {featured.map(p => (
                            <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset ins-feat-item">
                                <img src={p.image} className="ins-feat-img" alt={p.title} />
                                <div className="ins-feat-title">{p.title}</div>
                                <div className="ins-feat-price">Rs. {p.price}</div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="ins-promo-box">
                    <img src={promoImg} className="ins-promo-img" alt="Promo" />
                    <div className="ins-promo-overlay">
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{details.promoSection?.title || <React.Fragment>Men and<br />Young Men</React.Fragment>}</div>
                        <div style={{ margin: '20px 0', fontSize: '0.9rem', maxWidth: 300, marginLeft: 'auto' }}>
                            {details.promoSection?.description || "Whatever you need from casual tees, polos and jeans to smart dress shirts and slacks, we've got you covered for less."}
                        </div>
                    </div>
                </div>
            </div>

            {/* Best Sellers */}
            <div className="ins-best-sec">
                <div className="ins-sec-head">BEST SELLER PRODUCTS</div>
                <div className="ins-best-grid">
                    {bestSellers.map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset ins-feat-item">
                            <img src={p.image} className="ins-feat-img" alt={p.title} />
                            <div className="ins-feat-title">{p.title}</div>
                            <div className="ins-feat-price">Rs. {p.price}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Split 2: Banner + Top Rated */}
            <div className="ins-split-2">
                <div className="ins-banner-box">
                    <img src={bannerImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Banner" />
                    <div className="ins-banner-content">
                        <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{details.bannerSection?.title || "Classic Style"}</div>
                        <div style={{ fontSize: '0.9rem', marginTop: 10 }}>{details.bannerSection?.description || "Keep it casual or dress to impress with our classic, comfortable separates."}</div>
                    </div>
                </div>
                <div>
                    <div className="ins-sec-head">TOP RATED PRODUCTS</div>
                    <div className="ins-feat-grid">
                        {topRated.map(p => (
                            <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset ins-feat-item">
                                <img src={p.image} className="ins-feat-img" alt={p.title} />
                                <div className="ins-feat-title">{p.title}</div>
                                <div className="ins-feat-price">Rs. {p.price}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Brand Features (Replaced Blog) */}
            <div className="ins-blog-sec">
                <div className="ins-sec-head">WHY CHOOSE {brandName.toUpperCase()}?</div>
                <div className="ins-blog-grid">
                    {(details.features || []).map((feature, i) => (
                        <div key={i} className="ins-blog-item">
                            <img src={feature.image} className="ins-blog-img" alt={feature.title} />
                            <div className="ins-blog-title">{feature.title}</div>
                            <div style={{ fontSize: '0.8rem', color: '#777', marginBottom: 15 }}>
                                {feature.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="ins-footer">
                <div className="ins-foot-container">
                    <div className="ins-foot-col">
                        <h4>ABOUT US</h4>
                        <div>We are a team of designers and developers that create high quality Magento, Prestashop, Opencart themes.</div>
                        <div style={{ marginTop: 20 }}>Address: No 40 Baria Sreet 133/2 NewYork City, NY, United States.</div>
                    </div>
                    <div className="ins-foot-col">
                        <h4>NEWSLETTER</h4>
                        <div>Make sure you don't miss interesting happenings.</div>
                        <div style={{ border: '1px solid #555', padding: 10, marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                            <span>Enter your email...</span>
                            <span>✉</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
