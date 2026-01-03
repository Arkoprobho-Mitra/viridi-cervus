import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../ProductListing.Container/productsData';
import './Product.Page.css';
import ProductCard from '../ProductListing.Container/ProductCard';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
    const [animatingId, setAnimatingId] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState('desc');
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Check wishlist status on mount/update
    useEffect(() => {
        window.scrollTo(0, 0);
        const found = products.find(p => p.id === parseInt(id));
        setProduct(found);
        if (found) {
            const imgs = Array(8).fill(found.image).map((src, i) => ({ src, id: i }));
            setImages(imgs);
            setThumbnailStartIndex(0);
        }
    }, [id]);

    useEffect(() => {
        const checkWishlistStatus = () => {
            const auth = localStorage.getItem('isAuthenticated');
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const key = auth && currentUser ? `wishlist_${currentUser.email}` : 'wishlist_guest';
            const storedIds = JSON.parse(localStorage.getItem(key)) || [];

            if (product) {
                setIsWishlisted(storedIds.includes(product.id));
            }
        };

        checkWishlistStatus();
        window.addEventListener('wishlistUpdated', checkWishlistStatus);

        return () => {
            window.removeEventListener('wishlistUpdated', checkWishlistStatus);
        };
    }, [product]);

    const handleWishlistToggle = () => {
        const auth = localStorage.getItem('isAuthenticated');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const key = auth && currentUser ? `wishlist_${currentUser.email}` : 'wishlist_guest';

        const storedIds = JSON.parse(localStorage.getItem(key)) || [];
        let newIds;

        if (isWishlisted) {
            newIds = storedIds.filter(id => id !== product.id);
        } else {
            newIds = [...storedIds, product.id];
        }

        localStorage.setItem(key, JSON.stringify(newIds));
        setIsWishlisted(!isWishlisted); // Optimistic UI update
        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    // Delivery Check State
    const [pincode, setPincode] = useState('');
    const [deliveryResult, setDeliveryResult] = useState(null);

    const checkPincode = () => {
        if (!/^\d{6}$/.test(pincode)) {
            alert('Please enter a valid 6-digit pincode.');
            return;
        }
        // Mock API simulation
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 4); // Date + 4 days

        setDeliveryResult({
            date: deliveryDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', weekday: 'short' }),
            fee: 'FREE',
            message: 'Delivery available'
        });
    };

    // Reviews State & logic
    const [reviewSort, setReviewSort] = useState('newest');
    const [isReviewSortOpen, setReviewSortOpen] = useState(false);
    const [visibleReviewsCount, setVisibleReviewsCount] = useState(3);
    const reviewSortTimeoutRef = useRef(null);

    const handleReviewSortLeave = () => {
        reviewSortTimeoutRef.current = setTimeout(() => {
            setReviewSortOpen(false);
        }, 200);
    };

    const handleReviewSortEnter = () => {
        if (reviewSortTimeoutRef.current) {
            clearTimeout(reviewSortTimeoutRef.current);
        }
    };

    useEffect(() => {
        return () => {
            if (reviewSortTimeoutRef.current) {
                clearTimeout(reviewSortTimeoutRef.current);
            }
        };
    }, []);

    const reviewsData = useMemo(() => [
        { id: 1, user: 'Arjun K.', rating: 5, date: '2 days ago', dateObj: new Date(Date.now() - 2 * 86400000), text: 'Absolutely love the fit! The fabric feels premium and breathable.' },
        { id: 2, user: 'Sneha P.', rating: 4, date: '1 week ago', dateObj: new Date(Date.now() - 7 * 86400000), text: 'Great quality but the size runs slightly large. Recommend sizing down.' },
        { id: 3, user: 'Rahul M.', rating: 5, date: '2 weeks ago', dateObj: new Date(Date.now() - 14 * 86400000), text: 'Best purchase I made this season. Worth every rupee.' },
        { id: 4, user: 'Vikram S.', rating: 2, date: '1 month ago', dateObj: new Date(Date.now() - 30 * 86400000), text: 'Color faded after one wash. Disappointed.' },
        { id: 5, user: 'Priya D.', rating: 1, date: '2 months ago', dateObj: new Date(Date.now() - 60 * 86400000), text: 'Stitching came off immediately. Poor quality.' },
        { id: 6, user: 'Amit B.', rating: 5, date: '2 months ago', dateObj: new Date(Date.now() - 65 * 86400000), text: 'Perfect for office wear. Very comfortable.' },
        { id: 7, user: 'Kavita R.', rating: 4, date: '3 months ago', dateObj: new Date(Date.now() - 90 * 86400000), text: 'Good material, but delivery was delayed.' },
        { id: 8, user: 'Rohan J.', rating: 3, date: '4 months ago', dateObj: new Date(Date.now() - 120 * 86400000), text: 'Average quality. Expected better for the price.' },
        { id: 9, user: 'Meera S.', rating: 5, date: '5 months ago', dateObj: new Date(Date.now() - 150 * 86400000), text: 'Loved it! Will buy again.' },
        { id: 10, user: 'Suresh T.', rating: 4, date: '6 months ago', dateObj: new Date(Date.now() - 180 * 86400000), text: 'Fits well, true to size.' }
    ], []);

    const sortedReviews = useMemo(() => {
        const sorted = [...reviewsData];
        switch (reviewSort) {
            case 'newest': return sorted.sort((a, b) => b.dateObj - a.dateObj);
            case 'oldest': return sorted.sort((a, b) => a.dateObj - b.dateObj);
            case 'ratingHigh': return sorted.sort((a, b) => b.rating - a.rating);
            case 'ratingLow': return sorted.sort((a, b) => a.rating - b.rating);
            default: return sorted;
        }
    }, [reviewsData, reviewSort]);

    const getReviewSortLabel = (type) => {
        switch (type) {
            case 'newest': return 'Newest First';
            case 'oldest': return 'Oldest First';
            case 'ratingHigh': return 'Positive First';
            case 'ratingLow': return 'Negative First';
            default: return 'Newest First';
        }
    };

    // Click outside handler for sort dropdown
    const sortRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setReviewSortOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMainNext = () => {
        setImages(prev => {
            const next = [...prev];
            const first = next.shift();
            next.push(first);
            return next;
        });
    };

    const handleMainPrev = () => {
        setImages(prev => {
            const next = [...prev];
            const last = next.pop();
            next.unshift(last);
            return next;
        });
    };

    const handleThumbnailClick = (clickedId) => {
        if (animatingId !== null) return;
        setAnimatingId(clickedId);

        setTimeout(() => {
            setImages(prev => {
                const index = prev.findIndex(img => img.id === clickedId);
                if (index === -1 || index === 0) return prev;
                const next = [...prev];
                [next[0], next[index]] = [next[index], next[0]];
                return next;
            });
            setAnimatingId(null);
        }, 300);
    };

    const similarRef = useRef(null);

    // Similar Products (Priority: SubCategory > Brand > Ads)
    const similarProducts = useMemo(() => {
        if (!product) return [];
        return products
            .filter(p => p.id !== product.id)
            .map(p => {
                let score = 0;
                if (p.subCategory === product.subCategory) score += 1000;
                if (p.brand === product.brand) score += 100;
                if (p.isAd) score += 10;
                return { ...p, score };
            })
            .filter(p => p.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 15);
    }, [product]);

    if (!product) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

    const handleSimilarNext = () => {
        if (similarRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = similarRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 50) {
                similarRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                similarRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }
    };

    const handleSimilarPrev = () => {
        if (similarRef.current) {
            similarRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

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
                    <div className="main-image-wrapper">
                        <button className="gallery-nav-btn prev" onClick={handleMainPrev}>&lt;</button>
                        <img
                            src={images[0]?.src || product.image}
                            alt={product.title}
                            className={`main-image ${animatingId !== null ? 'animating' : ''}`}
                        />
                        <button className="gallery-nav-btn next" onClick={handleMainNext}>&gt;</button>
                    </div>

                    <div className="gallery-scroll-wrapper">
                        <div className="gallery-grid">
                            {images.slice(1).slice(thumbnailStartIndex, thumbnailStartIndex + 3).map((img) => (
                                <img
                                    key={img.id}
                                    src={img.src}
                                    alt={`Detail ${img.id}`}
                                    className={`gallery-item ${animatingId === img.id ? 'animating' : ''}`}
                                    onClick={() => handleThumbnailClick(img.id)}
                                />
                            ))}
                        </div>
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
                        <button onClick={() => setQuantity(Math.max(1, (parseInt(quantity) || 0) - 1))}>-</button>
                        <input
                            type="number"
                            className="quantity-input"
                            value={quantity}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '' || /^\d+$/.test(val)) {
                                    setQuantity(val);
                                }
                            }}
                            onBlur={() => {
                                let val = parseInt(quantity);
                                if (!val || val < 1) val = 1;
                                setQuantity(val);
                            }}
                        />
                        <button onClick={() => setQuantity((parseInt(quantity) || 0) + 1)}>+</button>
                    </div>

                    <button
                        className="add-to-cart-btn"
                        onClick={() => {
                            const auth = localStorage.getItem('isAuthenticated');
                            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                            const key = auth && currentUser ? `cart_${currentUser.email}` : 'cart_guest';

                            const storedItems = JSON.parse(localStorage.getItem(key)) || [];
                            const existingItemIndex = storedItems.findIndex(item => item.id === product.id && item.size === selectedSize);

                            let newItems;
                            if (existingItemIndex > -1) {
                                newItems = [...storedItems];
                                newItems[existingItemIndex].qty += parseInt(quantity);
                            } else {
                                newItems = [...storedItems, { id: product.id, qty: parseInt(quantity), size: selectedSize }];
                            }

                            localStorage.setItem(key, JSON.stringify(newItems));
                            window.dispatchEvent(new Event('cartUpdated'));
                            alert(`${product.title} (${selectedSize}) added to bag!`);
                        }}
                    >
                        Add to Cart
                    </button>

                    <button
                        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                        onClick={handleWishlistToggle}
                        style={isWishlisted ? { backgroundColor: '#333', color: '#fff', borderColor: '#333' } : {}}
                    >
                        {isWishlisted ? '♥ Wishlisted' : '♡ Add to Wishlist'}
                    </button>

                    {/* Delivery Check Section */}
                    <div className="delivery-check-section">
                        <div className="delivery-header-title">
                            DELIVERY OPTIONS <span style={{ fontSize: '16px' }}>🚚</span>
                        </div>

                        {localStorage.getItem('isAuthenticated') ? (
                            <div className="delivery-result">
                                <p style={{ margin: '5px 0' }}><strong>Detected Location:</strong> Mumbai, 400001</p>
                                <p style={{ margin: '5px 0' }}>
                                    Get it by <strong>{new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-US', { day: 'numeric', month: 'short', weekday: 'short' })}</strong>
                                    <span style={{ marginLeft: '10px', color: 'forestgreen', fontWeight: 'bold' }}>FREE</span>
                                </p>
                            </div>
                        ) : (
                            !deliveryResult ? (
                                <div className="pincode-input-wrapper">
                                    <input
                                        type="text"
                                        className="pincode-input"
                                        placeholder="Enter Pincode"
                                        maxLength="6"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                                    />
                                    <button className="check-pincode-btn" onClick={checkPincode}>Check</button>
                                </div>
                            ) : (
                                <div className="delivery-result">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p style={{ margin: 0 }}>Delivery to <strong>{pincode}</strong></p>
                                        <button className="change-pincode-btn" onClick={() => { setDeliveryResult(null); setPincode(''); }}>Change</button>
                                    </div>
                                    <p style={{ marginTop: '10px', marginBottom: '5px' }}>
                                        Get it by <strong>{deliveryResult.date}</strong> |
                                        {deliveryResult.fee === 'FREE' ? <span style={{ color: 'forestgreen', fontWeight: 'bold', marginLeft: '5px' }}>FREE</span> : `Rs. ${deliveryResult.fee}`}
                                    </p>
                                </div>
                            )
                        )}
                        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px', lineHeight: '1.4' }}>
                            Please enter PIN code to check delivery time & Pay on Delivery Availability
                        </p>
                    </div>

                    <div className="product-info-accordion">
                        {[
                            {
                                id: 'desc', label: 'DESCRIPTION', content: (
                                    <>
                                        <p>Experience the epitome of luxury with the {product.title}. Crafted from the finest materials, this piece defines elegance and sophistication. Perfect for {(product.subCategory || product.category || '').toLowerCase()} lovers who appreciate attention to detail.</p>
                                        <p>• Premium Quality</p>
                                        <p>• Modern Fit</p>
                                    </>
                                )
                            },
                            {
                                id: 'mat', label: 'MATERIAL & CARE', content: (
                                    <>
                                        <p>100% Cotton / Premium Blend.</p>
                                        <p>Machine wash cold. Do not bleach.</p>
                                    </>
                                )
                            },
                            {
                                id: 'ship', label: 'SHIPPING', content: (
                                    <div style={{ fontSize: '13px', color: '#555' }}>
                                        <p>📍 Sent from Mumbai</p>
                                        <p style={{ marginTop: '5px' }}>Regular Package - Estimated arrival 3-5 days</p>
                                    </div>
                                )
                            },
                            {
                                id: 'reviews', label: `REVIEWS (${sortedReviews.length})`, content: (
                                    <div className="reviews-block">
                                        <div className="review-summary">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span className="summary-score">{product.rating} <span style={{ color: '#03a685' }}>★</span></span>
                                                <span className="summary-text">Overall Rating</span>
                                            </div>

                                            {/* Review Sort Dropdown */}
                                            <div className="review-sort-container" ref={sortRef}>
                                                <div
                                                    className={`review-sort-dropdown ${isReviewSortOpen ? 'open' : ''}`}
                                                    onClick={() => setReviewSortOpen(!isReviewSortOpen)}
                                                    onMouseLeave={handleReviewSortLeave}
                                                    onMouseEnter={handleReviewSortEnter}
                                                >
                                                    <span>{getReviewSortLabel(reviewSort)}</span>
                                                    <span className="sort-chevron"></span>

                                                    <ul className="review-sort-options">
                                                        <li onClick={() => { setReviewSort('newest'); handleReviewSortLeave(); }}>Newest First</li>
                                                        <li onClick={() => { setReviewSort('oldest'); handleReviewSortLeave(); }}>Oldest First</li>
                                                        <li onClick={() => { setReviewSort('ratingHigh'); handleReviewSortLeave(); }}>Positive First</li>
                                                        <li onClick={() => { setReviewSort('ratingLow'); handleReviewSortLeave(); }}>Negative First</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="review-list">
                                            {sortedReviews.slice(0, visibleReviewsCount).map(review => (
                                                <div key={review.id} className="review-item">
                                                    <div className="review-header">
                                                        <span className="review-rating">{review.rating} ★</span>
                                                        <span className="review-user">{review.user}</span>
                                                        <span className="review-date">{review.date}</span>
                                                    </div>
                                                    <p className="review-text">{review.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {sortedReviews.length > 3 && (
                                            <button
                                                className="view-all-reviews-btn"
                                                onClick={() => setVisibleReviewsCount(visibleReviewsCount === 3 ? 8 : 3)}
                                            >
                                                {visibleReviewsCount === 3 ? 'View All Reviews' : 'View Less'}
                                            </button>
                                        )}
                                    </div>
                                )
                            }
                        ].map(section => (
                            <div className="info-item" key={section.id}>
                                <div className="info-header" onClick={() => setActiveAccordion(activeAccordion === section.id ? '' : section.id)}>
                                    <span>{section.label}</span>
                                    <span>{activeAccordion === section.id ? '-' : '+'}</span>
                                </div>
                                <div className={`info-content-wrapper ${activeAccordion === section.id ? 'open' : ''}`}>
                                    <div className="info-content-inner">
                                        <div className="info-content">
                                            {section.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>Similar Products</h2>
                    <div className="similar-nav">
                        <button className="similar-btn prev" onClick={handleSimilarPrev}>&lt;</button>
                        <button className="similar-btn next" onClick={handleSimilarNext}>&gt;</button>
                    </div>
                </div>
                <div className="similar-scroll-view" ref={similarRef}>
                    {similarProducts.map(p => (
                        <div key={p.id} className="similar-card-wrapper">
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="view-all-container">
                <Link
                    to={`/products?gender=${product.group}${product.subCategory ? `&subCategory=${encodeURIComponent(product.subCategory)}` : `&category=${encodeURIComponent(product.category)}`}`}
                    className="view-all-bottom-btn"
                >
                    View All {product.subCategory || product.category}
                </Link>
            </div>
        </div>
    );
};

export default ProductPage;