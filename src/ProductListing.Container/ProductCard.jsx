
import React from 'react';
import './ProductListing.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />

                {product.rating && (
                    <div className="rating-badge">
                        {product.rating} <span className="rating-star">★</span>
                        <span className="rating-separator">|</span>
                        {product.ratingCount}
                    </div>
                )}

                {product.isAd && <div className="ad-badge">Ad</div>}

                <div className="wishlist-btn-overlay">
                    ♡ Wishlist
                </div>
            </div>

            <div className="product-info">
                <div className="product-brand">{product.brand}</div>
                <div className="product-title">{product.title}</div>
                <div className="product-price-row">
                    <span className="current-price">Rs. {product.price}</span>
                    <span className="original-price">Rs. {product.originalPrice}</span>
                    <span className="discount-text">({product.discount}% OFF)</span>
                </div>
                {/* Randomly show "Only Few Left!" for visual variety if needed, or based on data */}
                {Math.random() > 0.8 && <div className="few-left">Only Few Left!</div>}
            </div>
        </div>
    );
};

export default ProductCard;
