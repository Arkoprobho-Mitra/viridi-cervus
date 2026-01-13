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
export const Template1Minimalist = ({ brandName, products }) => {
    const categories = getBrandCategories(products);
    const slogan = getSlogan(brandName, products);

    return (
        <div className="bt-container tpl-minimalist">
            <div className="min-hero">
                <div className="min-logo">{brandName[0]}</div>
                <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '20px' }}>{brandName}</h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>{slogan}</p>
                <i style={{ display: 'block', marginTop: '20px' }}>"Simplicity is the ultimate sophistication."</i>
            </div>

            <div className="min-grid">
                {categories.map((cat, i) => (
                    <div className="min-cat-item" key={i}>
                        <img src={cat.image} className="bt-img-cover min-cat-img" alt={cat.name} />
                        <h3 style={{ fontSize: '1rem', textTransform: 'uppercase' }}>{cat.name}</h3>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid #eee' }}>
                <h3>Latest Arrivals</h3>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
                    {products.slice(0, 5).map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset" style={{ width: '150px' }}>
                            <img src={p.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt={p.title} />
                            <div style={{ marginTop: '5px', fontSize: '0.9rem' }}>{p.title}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Template 2: Editorial (Split Screen) ---
export const Template2Editorial = ({ brandName, products }) => {
    const categories = getBrandCategories(products);
    const slogan = getSlogan(brandName, products);
    const heroImg = products[0]?.image || "";

    return (
        <div className="bt-container tpl-editorial">
            <div className="ed-hero">
                <div className="ed-content">
                    <h1>{brandName}</h1>
                    <p style={{ fontSize: '1.5rem', marginBottom: '40px' }}>{slogan}</p>
                    <p>"We believe in formatting style that speaks louder than words."</p>

                    <div className="ed-cat-list">
                        {categories.map((cat, i) => (
                            <div className="ed-cat-tag" key={i}>{cat.name}</div>
                        ))}
                    </div>
                </div>
                <div className="ed-visual">
                    <img src={heroImg} className="bt-img-cover" alt="Hero" />
                </div>
            </div>

            <div className="ed-banner">
                {products.slice(0, 8).map(p => (
                    <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset" style={{ flex: '0 0 250px' }}>
                        <img src={p.image} style={{ width: '100%', height: '350px', objectFit: 'cover' }} alt={p.title} />
                        <div style={{ background: '#fff', padding: '10px' }}>
                            <strong>{p.title}</strong>
                            <div>Rs. {p.price}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// --- Template 3: Boutique (Soft/Pastel Circles) ---
export const Template3Pastel = ({ brandName, products }) => {
    const categories = getBrandCategories(products);
    const slogan = getSlogan(brandName, products);

    return (
        <div className="bt-container tpl-boutique">
            <div className="bou-hero">
                <h1 style={{ fontFamily: 'cursive', fontSize: '3rem', color: '#d87093' }}>{brandName}</h1>
                <p>{slogan}</p>
                <p style={{ marginTop: '10px' }}>"Curated with Love"</p>
            </div>

            <div className="bou-circles">
                {categories.map((cat, i) => (
                    <div className="bou-circle-item" key={i}>
                        <img src={cat.image} className="bou-img" alt={cat.name} />
                        <div style={{ fontWeight: 600, color: '#d87093' }}>{cat.name}</div>
                    </div>
                ))}
            </div>

            <div style={{ padding: '40px', background: '#fff' }}>
                <h2 style={{ color: '#d87093', marginBottom: '30px' }}>Shop the Look</h2>
                <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
                    {products.slice(0, 10).map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset" style={{ flex: '0 0 200px' }}>
                            <img src={p.image} style={{ width: '100%', borderRadius: '10px' }} alt={p.title} />
                            <div style={{ marginTop: '5px', fontSize: '0.9rem' }}>{p.title}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Template 4: Urban (Dark) ---
export const Template4Tech = ({ brandName, products }) => {
    const categories = getBrandCategories(products);
    const heroImg = products[1]?.image || "";

    return (
        <div className="bt-container tpl-urban">
            <div className="urb-hero">
                <img src={heroImg} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} alt="bg" />
                <h1 style={{ position: 'relative', zIndex: 2 }}>{brandName}</h1>
            </div>

            <div className="urb-cat-grid">
                {categories.slice(0, 4).map((cat, i) => (
                    <div className="urb-cat-item" key={i}>
                        <img src={cat.image} className="bt-img-cover" alt={cat.name} />
                        <div className="urb-cat-label">{cat.name}</div>
                    </div>
                ))}
            </div>

            <div style={{ padding: '40px', borderTop: '2px solid #333' }}>
                <h2 style={{ textTransform: 'uppercase', marginBottom: '20px' }}>Drop Zone</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '2px', background: '#333' }}>
                    {products.slice(0, 6).map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} style={{ background: '#111', padding: '10px' }} className="bt-link-reset">
                            <img src={p.image} style={{ width: '100%', opacity: 0.8 }} alt={p.title} />
                            <div style={{ marginTop: '10px', color: '#fff' }}>{p.price}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Template 5: Luxury (Gold Slider) ---
export const Template5Luxury = ({ brandName, products }) => {
    const categories = getBrandCategories(products);
    const heroImg = products[2]?.image || products[0]?.image || "";

    return (
        <div className="bt-container tpl-luxe">
            <div className="lux-hero">
                <img src={heroImg} className="bt-img-cover" alt="Hero" />
                <div className="lux-overlay">
                    <h1>{brandName}</h1>
                    <p style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>"Elegance is an attitude."</p>
                </div>
            </div>

            <div className="lux-cat-slider">
                {categories.map((cat, i) => (
                    <div className="lux-cat-card" key={i}>
                        <img src={cat.image} className="lux-cat-img" alt={cat.name} />
                        <h3 style={{ marginTop: '20px', fontFamily: 'serif', fontSize: '1.5rem' }}>{cat.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Template 6: Pop (Bento Grid) ---
export const Template6Pop = ({ brandName, products }) => {
    const categories = getBrandCategories(products);
    const heroImg = products[0]?.image;

    return (
        <div className="bt-container tpl-pop">
            <div className="tpl-pop-hero">
                <h1 style={{ fontSize: '4rem', textTransform: 'uppercase', transform: 'rotate(-2deg)' }}>{brandName}</h1>
                <p style={{ fontSize: '1.5rem', background: '#000', color: '#fff', display: 'inline-block', padding: '5px' }}>POP CULTURE FASHION</p>
            </div>

            <div className="tpl-pop-bento">
                {categories.slice(0, 6).map((cat, i) => (
                    <div className="tpl-pop-item" key={i}>
                        <img src={cat.image} className="bt-img-cover" alt={cat.name} />
                        <div className="tpl-pop-label">{cat.name}</div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', gap: '20px', overflowX: 'auto' }}>
                {products.slice(0, 8).map(p => (
                    <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset" style={{ flex: '0 0 200px', border: '3px solid #000', background: '#fff', padding: '10px' }}>
                        <img src={p.image} style={{ width: '100%' }} alt={p.title} />
                        <strong>{p.title}</strong>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// --- Template 7: Nature (Organic) ---
export const Template7Nature = ({ brandName, products }) => {
    const categories = getBrandCategories(products);
    const slogan = getSlogan(brandName, products);
    const heroImg = products[0]?.image;

    return (
        <div className="bt-container tpl-nature">
            <div className="nat-hero">
                <h1 style={{ fontFamily: 'serif', fontSize: '3rem', color: '#4a4036' }}>{brandName}</h1>
                <p>{slogan}</p>
                <img src={heroImg} className="nat-img-blob" alt="Hero" />
                <p style={{ fontStyle: 'italic' }}>"Inspired by the world around us."</p>
            </div>

            <div className="nat-grid">
                {categories.map((cat, i) => (
                    <div className="nat-item" key={i}>
                        <img src={cat.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt={cat.name} />
                        <div>{cat.name}</div>
                    </div>
                ))}
            </div>

            <div style={{ background: '#fff', padding: '40px', borderRadius: '40px 40px 0 0' }}>
                <h2 style={{ textAlign: 'center', color: '#4a4036' }}>Sustainable Choices</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '30px' }}>
                    {products.slice(0, 4).map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="bt-link-reset" style={{ width: '200px', textAlign: 'center' }}>
                            <img src={p.image} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '15px' }} alt={p.title} />
                            <div style={{ marginTop: '10px' }}>{p.title}</div>
                        </Link>
                    ))}
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
