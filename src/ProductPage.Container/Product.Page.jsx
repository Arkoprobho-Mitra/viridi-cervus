import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../ProductListing.Container/productsData';
import './Product.Page.css';
import ProductCard from '../ProductListing.Container/ProductCard';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState('desc');

    useEffect(() => {
        window.scrollTo(0, 0);
        const found = products.find(p => p.id === parseInt(id));
        setProduct(found);
    }, [id]);

    if (!product) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

    // Similar Products (Same Category, exclude current)
    const similarProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="product-page-container">
            {/* Breadcrumbs */}
            <div className="product-breadcrumbs">
                <Link to="/">Home</Link> /
                <Link to={`/products?gender=${product.group}`}> {product.group} </Link> /
                <Link to={`/products?gender=${product.group}&category=${encodeURIComponent(product.category)}`}> {product.category} </Link> /
                <span style={{ color: '#000', fontWeight: '600' }}> {product.title}</span>
            </div>

            <div className="product-main-layout">
                {/* Left: Gallery */}
                <div className="product-gallery">
                    <img src={product.image} alt={product.title} className="main-image" />
                    <div className="gallery-grid">
                        <img src={product.image} alt="Detail 1" style={{ opacity: 0.9 }} />
                        <img src={product.image} alt="Detail 2" style={{ opacity: 0.8 }} />
                    </div>
                </div>

                {/* Right: Details */}
                <div className="product-details-panel">
                    <div className="detail-brand">{product.brand}</div>
                    <h1 className="detail-title">{product.title}</h1>

                    <div className="detail-price-section">
                        <span className="detail-current-price">Rs. {product.price}</span>
                        <span className="detail-original-price">Rs. {product.originalPrice}</span>
                        <span className="detail-discount-tag">{product.discount}% OFF</span>
                    </div>

                    <div className="rating-section" style={{ marginBottom: '30px', fontSize: '13px' }}>
                        ⭐ <strong>{product.rating}</strong> | {product.ratingCount} Ratings
                    </div>

                    <label className="selector-label">Select Size</label>
                    <div className="size-selector">
                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <button
                                key={size}
                                className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    <label className="selector-label">Quantity</label>
                    <div className="quantity-selector">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>

                    <button className="add-to-cart-btn">
                        Add to Cart
                    </button>

                    <div className="product-info-accordion">
                        <div className="info-item">
                            <div className="info-header" onClick={() => setActiveAccordion(activeAccordion === 'desc' ? '' : 'desc')}>
                                <span>DESCRIPTION</span>
                                <span>{activeAccordion === 'desc' ? '-' : '+'}</span>
                            </div>
                            {activeAccordion === 'desc' && (
                                <div className="info-content">
                                    <p>Experience the epitome of luxury with the {product.title}. Crafted from the finest materials, this piece defines elegance and sophistication. Perfect for {product.subCategory.toLowerCase()} lovers who appreciate attention to detail.</p>
                                    <p>• Premium Quality</p>
                                    <p>• Modern Fit</p>
                                </div>
                            )}
                        </div>
                        <div className="info-item">
                            <div className="info-header" onClick={() => setActiveAccordion(activeAccordion === 'mat' ? '' : 'mat')}>
                                <span>MATERIAL & CARE</span>
                                <span>{activeAccordion === 'mat' ? '-' : '+'}</span>
                            </div>
                            {activeAccordion === 'mat' && (
                                <div className="info-content">
                                    <p>100% Cotton / Premium Blend.</p>
                                    <p>Machine wash cold. Do not bleach.</p>
                                </div>
                            )}
                        </div>
                        <div className="info-item">
                            <div className="info-header" onClick={() => setActiveAccordion(activeAccordion === 'ship' ? '' : 'ship')}>
                                <span>SHIPPING</span>
                                <span>{activeAccordion === 'ship' ? '-' : '+'}</span>
                            </div>
                            {activeAccordion === 'ship' && (
                                <div className="info-content">
                                    <div style={{ fontSize: '13px', color: '#555' }}>
                                        <p>📍 Sent from Mumbai</p>
                                        <p style={{ marginTop: '5px' }}>Regular Package - Estimated arrival 3-5 days</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Editorial Banner */}
            <div className="editorial-banner">
                <h2 className="editorial-title">Step Into Effortless Style</h2>
                <p className="editorial-text">
                    Discover pieces made to move with you — refined, versatile, and built to last beyond the season.
                </p>
                <button className="editorial-btn">Shop The Collection</button>
            </div>

            {/* Similar Products */}
            <div className="similar-products-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>Similar Products</h2>
                    <button className="view-all-btn">View All &gt;</button>
                </div>
                <div className="similar-grid">
                    {similarProducts.map(p => (
                        <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
