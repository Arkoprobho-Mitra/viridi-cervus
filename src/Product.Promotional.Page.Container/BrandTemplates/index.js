import React from 'react';
import { Link } from 'react-router-dom';
import './BrandTemplates.css';

// --- Helpers ---
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getBrandCategories = (products) => {
    const categoriesMap = new Map();
    products.forEach(p => {
        const catName = p.subCategory || p.category;
        if (!categoriesMap.has(catName)) {
            categoriesMap.set(catName, p.image);
        }
    });
    return Array.from(categoriesMap.entries()).slice(0, 8).map(([name, image]) => ({ name, image }));
};

const getSlogan = (brandName, products) => {
    const isSports = products.some(p => p.brand === 'Nike' || p.brand === 'Adidas' || p.brand === 'Puma');
    if (isSports) return getRandom(["Just Do It.", "Forever Faster.", "Impossible is Nothing.", "Performance First."]);
    return getRandom([`Defining Style Since 2024`, `Wear Your Confidence`, `Timeless Fashion`, `${brandName} Essentials`]);
};

// --- Template 1: Minimalist (Clean Grid) ---
// --- Template 1: Minimalist (Revised "Hoodie" Style) ---
export const Template1Minimalist = ({ brandName, products }) => {
    const [activeTab, setActiveTab] = React.useState('HOODIE');

    // Extract categories for tabs (limit to 5)
    // We'll hardcode some for the "Hoodie" look or derive them
    const allCategories = ['HOODIE', ...new Set(products.map(p => (p.subCategory || p.category || 'POPULAR').toUpperCase()))].slice(0, 5);

    // Filter products for the active tab
    const filteredProducts = activeTab === 'HOODIE'
        ? products
        : products.filter(p => (p.subCategory || p.category || '').toUpperCase() === activeTab);

    // Get specific images for section highlights
    const heroImg = products[0]?.image;
    // Try to find 3 distinct images for the tri-grid
    const triImages = products.slice(1, 4).map(p => p.image);
    while (triImages.length < 3) triImages.push(heroImg); // Fallback

    const feature1 = products.find(p => p.title.toLowerCase().includes('sweat') || p.category.toLowerCase().includes('sweat')) || products[4];
    const feature2 = products.find(p => p.title.toLowerCase().includes('athletic') || p.category.toLowerCase().includes('sport')) || products[5] || products[0];

    return (
        <div className="bt-container tpl-minimalist">
            {/* Header / Hero */}
            <div className="min-header">
                <div>MENU</div>
                <div style={{ fontWeight: 900, textTransform: 'uppercase' }}>{brandName}</div>
                <div>SEARCH</div>
            </div>

            <div className="min-hero">
                <div className="min-hero-top-text">The Best {brandName} Are Only Here</div>
                <h1 className="min-hero-title">{brandName}</h1>
                <div className="min-hero-imgs">
                    <img src={heroImg} className="min-hero-main-img" alt="Hero" />
                </div>

                <div className="min-swipe-card">
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>SWIPE</div>
                    <div className="min-swipe-line"></div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>DISCOVER NOW</div>
                </div>
            </div>

            {/* Socials */}
            <div className="min-socials">
                <span>Instagram</span>
                <span>Telegram</span>
                <span>Facebook</span>
                <span>Twitter</span>
            </div>

            {/* Ticker */}
            <div className="min-ticker-wrap">
                <div className="min-ticker">
                    THE BEST {brandName} CLOTHING 2024 &nbsp;&bull;&nbsp; THE BEST {brandName} CLOTHING 2024 &nbsp;&bull;&nbsp; THE BEST {brandName} CLOTHING 2024 &nbsp;&bull;&nbsp;
                    THE BEST {brandName} CLOTHING 2024 &nbsp;&bull;&nbsp; THE BEST {brandName} CLOTHING 2024 &nbsp;&bull;&nbsp; THE BEST {brandName} CLOTHING 2024 &nbsp;&bull;&nbsp;
                </div>
            </div>

            {/* 3 Col Highlight */}
            <div className="min-tri-grid">
                {triImages.map((img, i) => (
                    <div className="min-tri-item" key={i}>
                        <img src={img} className="min-tri-img" alt="Highlight" />
                        <div className="min-tri-overlay">
                            <h3 style={{ textTransform: 'uppercase', fontSize: '1.5rem', marginBottom: '5px' }}>
                                {i === 0 ? "Men's Black" : i === 1 ? "Caps & Bags" : "Tote Bag"}
                            </h3>
                            <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '10px' }}>
                                Graphic Printed Oversized {brandName}
                            </p>
                            <Link to="#" className="btn-explore">Explore</Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Collection */}
            <div className="min-collection">
                <h2 className="min-col-title">Our Collection</h2>
                <p className="min-col-desc">
                    If seems like you're referring to "{brandName} Alloy", a narrow and darker generation.
                    Uniquely crafted popularity with mix rotated and independent releases before transforming to a more unified team.
                </p>

                <div className="min-filters">
                    {allCategories.map(cat => (
                        <button
                            key={cat}
                            className={`min-filter-btn ${activeTab === cat ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="min-prod-grid">
                    {filteredProducts.slice(0, 8).map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset min-prod-card">
                            <div className="min-price-tag">Rs. {p.price}</div>
                            <img src={p.image} className="min-prod-img" alt={p.title} />
                            <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>{p.title}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Feature 01 */}
            {feature1 && (
                <div className="min-feature-row">
                    <div className="min-feat-img-box">
                        <img src={feature1.image} style={{ width: '100%', maxWidth: '400px', height: 'auto' }} alt="Feature 1" />
                    </div>
                    <div className="min-feat-content">
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <span className="min-feat-num">01</span>
                            <h3 className="min-feat-title">Sweatshirt</h3>
                        </div>
                        <p className="min-feat-desc">
                            Sweatshirt that fits particularly favored for styles, colors, and details.
                            Sheer relaxed and especially during colder seasons.
                        </p>
                    </div>
                </div>
            )}

            {/* Feature 02 */}
            {feature2 && (
                <div className="min-feature-row reverse">
                    <div className="min-feat-img-box">
                        <img src={feature2.image} style={{ width: '100%', maxWidth: '400px', height: 'auto' }} alt="Feature 2" />
                    </div>
                    <div className="min-feat-content">
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <span className="min-feat-num">02</span>
                            <h3 className="min-feat-title">Athletic</h3>
                        </div>
                        <p className="min-feat-desc">
                            An "Athletic {brandName}" is a specific type of hoodie designed with features tailored for athletic activities and sports.
                        </p>
                    </div>
                </div>
            )}

            {/* Full Winters */}
            <div className="bt-container tpl-minimalist" style={{ padding: 0 }}>
                <div style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px' }}>
                    Full Winters
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', paddingBottom: '60px' }}>
                    {products.slice(0, 2).map(p => (
                        <div key={p.id} style={{ width: '300px' }}>
                            <img src={p.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', paddingBottom: '60px' }}>
                    <button className="min-promo-btn">New Collection // Limited Edition</button>
                </div>
            </div>

            {/* Newsletter */}
            <div className="min-newsletter">
                <h2 className="min-news-title">Subscribe To Our<br />Newsletter</h2>
                <div className="min-news-input-wrap">
                    <input type="text" className="min-news-input" placeholder="YOUR EMAIL..." />
                    <button className="min-news-submit">&rarr;</button>
                </div>
            </div>

            {/* Footer */}
            <div className="min-footer">
                <div style={{ fontSize: '0.8rem', marginBottom: '20px', color: '#888' }}>
                    © HORIZONTAL ALL RIGHTS RESERVED
                </div>
                <div className="min-footer-logo">{brandName}</div>
                <div className="min-footer-links">
                    <Link to="#" className="min-footer-link-btn">Men</Link>
                    <Link to="#" className="min-footer-link-btn">Women</Link>
                    <Link to="#" className="min-footer-link-btn">Children</Link>
                    <Link to="#" className="min-footer-link-btn">Popular</Link>
                </div>
            </div>
        </div>
    );
};

// --- Template 2: Editorial (Novaelle Style) ---
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

// --- Template 3: Ultra (High Fashion / Serif) ---
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
                <div className="ul-logo">ULTRA</div> {/* Assuming brandName replaced or specific */}
                <div className="ul-menu">
                    <Link to="#" className="bt-link-reset">Home</Link>
                    <Link to="#" className="bt-link-reset">New Arrival</Link>
                    <Link to="#" className="bt-link-reset">Clothes</Link>
                    <Link to="#" className="bt-link-reset">Jacket</Link>
                    <Link to="#" className="bt-link-reset">Sale</Link>
                </div>
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

// --- Template 4: Mixtas (Clean / Modern Block) ---
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

// --- Template 5: Artic (Winter / Technical) ---
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

// --- Template 6: Massimo (Tailored / Elegant) ---
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

// --- Template 7: Inspira (Modern Split Layout) ---
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

export const BrandTemplates = {
    1: Template1Minimalist,
    2: Template2Editorial,
    3: Template3Pastel,
    4: Template4Tech,
    5: Template5Luxury,
    6: Template6Pop,
    7: Template7Nature
};
