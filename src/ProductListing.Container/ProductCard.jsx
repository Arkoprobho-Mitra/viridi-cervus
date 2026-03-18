import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import './ProductListing.css';

const ProductCard = ({ product, actionType = 'wishlist', onAction, onMoveToBag }) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    
    // Stable random for "Only Few Left" badge
    const showFewLeft = React.useMemo(() => Math.random() > 0.8, []);

    const isWishlisted = isInWishlist(product.id);

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
    };

    return (
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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

                    {actionType === 'remove' ? (
                        <div
                            className="wishlist-btn-overlay remove-btn"
                            onClick={onAction}
                        >
                            ✕ Remove
                        </div>
                    ) : (
                        <div
                            className={`wishlist-btn-overlay ${isWishlisted ? 'wishlisted' : ''}`}
                            onClick={handleToggleWishlist}
                        >
                            {isWishlisted ? '♥ WISHLISTED' : '♡ WISHLIST'}
                        </div>
                    )}
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
                    <div className="few-left" style={{ visibility: showFewLeft ? 'visible' : 'hidden' }}>Only Few Left!</div>
                </div>

                {/* Add to Cart Button (Conditional) */}
                {/* Action Button: 'MOVE TO BAG' for Wishlist, 'ADD TO BAG' for Listing */}
                <div className="product-action-footer">
                    <button
                        className="add-to-cart-action-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // vital to prevent Link navigation

                            if (actionType === 'remove' && onMoveToBag) {
                                onMoveToBag();
                            } else {
                                addToCart(product.id, 'M', 1);
                                alert(`${product.title} added to bag!`);
                            }
                        }}
                    >
                        {actionType === 'remove' ? 'MOVE TO BAG' : 'ADD TO BAG'}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
