import React from 'react';
import { Link } from 'react-router-dom';
import './ProductListing.css';

const ProductCard = ({ product, actionType = 'wishlist', onAction, onMoveToBag }) => {
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    // Stable random for "Only Few Left" badge
    const showFewLeft = React.useMemo(() => Math.random() > 0.8, []);

    const getWishlistKey = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser ? `wishlist_${currentUser.email}` : 'wishlist_guest';
    };

    React.useEffect(() => {
        const key = getWishlistKey();
        const wishlist = JSON.parse(localStorage.getItem(key)) || [];
        setIsWishlisted(wishlist.includes(product.id));
    }, [product.id]);

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const key = getWishlistKey();
        const currentWishlist = JSON.parse(localStorage.getItem(key)) || [];
        let newWishlist;

        if (isWishlisted) {
            newWishlist = currentWishlist.filter(id => id !== product.id);
            console.log("Removed from wishlist:", product.title);
        } else {
            if (!currentWishlist.includes(product.id)) {
                newWishlist = [...currentWishlist, product.id];
            } else {
                newWishlist = currentWishlist;
            }
            console.log("Added to wishlist:", product.title);
        }

        localStorage.setItem(key, JSON.stringify(newWishlist));
        setIsWishlisted(!isWishlisted);

        // Dispatch event for other components to update
        window.dispatchEvent(new Event('wishlistUpdated'));
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
                            onClick={toggleWishlist}
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
                                console.log("Added to bag:", product.title);
                                // Logic to actually add to cart would go here
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
