import React from 'react';
import { Link } from 'react-router-dom';
import './Template7Nature.css';
import '../BrandTemplatesShared.css';

export const Template7Nature = ({ brandName, products }) => {
    // Images
    const heroImg = products.find(p => p.category === 'Men')?.image || products[0]?.image;
    const promoImg = products.find(p => p.category === 'Topwear')?.image || products[1]?.image;
    const bannerImg = products[3]?.image || products[2]?.image;

    // Featured (Slice 0-3)
    const featured = products.slice(0, 3);
    // Best Sellers (Slice 3-7)
    const bestSellers = products.slice(3, 7);
    // Top Rated (Slice 0-3 shuffled mock)
    const topRated = products.slice(0, 3).reverse();

    return (
        <div className="bt-container tpl-inspira">
            <div className="ins-nav">
                <div className="ins-links">
                    <span>Home</span>
                    <span>Shop</span>
                    <span>Blog</span>
                    <span>Pages</span>
                    <span>Portfolio</span>
                    <span>Contact Us</span>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                    <span>Search</span>
                    <span>Cart (2)</span>
                    <span>Wishlist (0)</span>
                </div>
            </div>

            {/* Hero */}
            <div className="ins-hero">
                <img src={heroImg} className="ins-hero-img" alt="Hero" />
                <div className="ins-hero-content">
                    <div className="ins-hero-title">Lucky Day 50 Outfits<br />Under $30</div>
                    <button className="ins-hero-btn">Shop Now</button>
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
                                <div className="ins-feat-price">${p.price}</div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="ins-promo-box">
                    <img src={promoImg} className="ins-promo-img" alt="Promo" />
                    <div className="ins-promo-overlay">
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>Men and<br />Young Men</div>
                        <div style={{ margin: '20px 0', fontSize: '0.9rem', maxWidth: 300, marginLeft: 'auto' }}>
                            Whatever you need from casual tees, polos and jeans to smart dress shirts and slacks, we've got you covered for less.
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
                            <div className="ins-feat-price">${p.price}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Split 2: Banner + Top Rated */}
            <div className="ins-split-2">
                <div className="ins-banner-box">
                    <img src={bannerImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Banner" />
                    <div className="ins-banner-content">
                        <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>Classic Style</div>
                        <div style={{ fontSize: '0.9rem', marginTop: 10 }}>Keep it casual or dress to impress with our classic,<br />comfortable separates.</div>
                    </div>
                </div>
                <div>
                    <div className="ins-sec-head">TOP RATED PRODUCTS</div>
                    <div className="ins-feat-grid">
                        {topRated.map(p => (
                            <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset ins-feat-item">
                                <img src={p.image} className="ins-feat-img" alt={p.title} />
                                <div className="ins-feat-title">{p.title}</div>
                                <div className="ins-feat-price">${p.price}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Blog */}
            <div className="ins-blog-sec">
                <div className="ins-sec-head">BLOG POSTS</div>
                <div className="ins-blog-grid">
                    {/* Fake blog data based on products to avoid errors */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="ins-blog-item">
                            <img src={products[i]?.image} className="ins-blog-img" alt="Blog" />
                            <div className="ins-blog-meta">MAY 25, 2016 / 3 COMMENTS</div>
                            <div className="ins-blog-title">BLOG POST IMAGE TITLE EXAMPLE</div>
                            <div style={{ fontSize: '0.8rem', color: '#777', marginBottom: 15 }}>
                                Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex.
                            </div>
                            <div className="ins-blog-read">Read More</div>
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
                        <h4>INFORMATION</h4>
                        <div>My Account</div>
                        <div>Order History</div>
                        <div>Returns</div>
                        <div>Specials</div>
                    </div>
                    <div className="ins-foot-col">
                        <h4>SERVICE</h4>
                        <div>Contact Us</div>
                        <div>Returns</div>
                        <div>Site Map</div>
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
