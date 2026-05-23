import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { prefetchProductsByIds, getCachedProduct } from '../utils/productCache';
import { useCart } from '../contexts/CartContext';
import './CartPage.css';

const API_BASE = process.env.REACT_APP_SPRING_BASE_URL || 'http://localhost:8081';

const CartPage = () => {
    const { cartItems, cartTotal: subtotal, addToCart, removeFromCart, updateQuantity } = useCart();
    const [savedItems, setSavedItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Size Picker State
    const [showSizePicker, setShowSizePicker] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [pickerContext, setPickerContext] = useState(null); // 'cart' | 'saved'
    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const [secondaryView, setSecondaryView] = useState('saved'); // 'saved' | 'buy_again'

    // Mock Buy Again Items
    const [buyAgainItems, setBuyAgainItems] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE}/api/products?size=2&page=0`)
            .then(r => r.json())
            .then(json => {
                const items = (json?.data?.content ?? json?.content ?? []).slice(0, 2);
                setBuyAgainItems(items.map(p => ({ ...p, size: 'M', qty: 1 })));
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const checkAuth = () => {
            const authStatus = localStorage.getItem('isAuthenticated');
            setIsAuthenticated(!!authStatus);
        };

        checkAuth();
        updateSavedItems();

        window.addEventListener('storage', updateSavedItems);
        window.addEventListener('storage', checkAuth);
        window.addEventListener('wishlistUpdated', updateSavedItems);

        return () => {
            window.removeEventListener('storage', updateSavedItems);
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('wishlistUpdated', updateSavedItems);
        };
    }, []);

    const getKeys = () => {
        const isAuth = localStorage.getItem('isAuthenticated');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const cartKey = isAuth && currentUser ? `cart_${currentUser.email}` : 'cart_guest';
        const savedKey = isAuth && currentUser ? `saved_for_later_${currentUser.email}` : 'saved_for_later_guest';
        return { cartKey, savedKey, isAuth };
    };

    const enrichItems = async (storedItems) => {
        const ids = storedItems.map(item => item.id).filter(Boolean);
        await prefetchProductsByIds(ids);
        return storedItems.map(item => {
            const product = getCachedProduct(item.id);
            return product ? { ...product, ...item } : null;
        }).filter(Boolean);
    };

    const updateSavedItems = async () => {
        const { savedKey, isAuth } = getKeys();

        if (!isAuth) {
            const wishlistIds = JSON.parse(localStorage.getItem('wishlist_guest')) || [];
            await prefetchProductsByIds(wishlistIds);
            const wishlistItems = wishlistIds.map(id => {
                const product = getCachedProduct(id);
                return product ? { ...product, size: 'M', qty: 1 } : null;
            }).filter(Boolean);
            setSavedItems(wishlistItems);
        } else {
            const storedItems = JSON.parse(localStorage.getItem(savedKey)) || [];
            const enriched = await enrichItems(storedItems);
            setSavedItems(enriched);
        }
    };

    const handleQuantityChange = (id, size, change, context = 'cart') => {
        if (context === 'buy_again') {
            setBuyAgainItems(prev => prev.map(item => {
                if (item.id === id && item.size === size) {
                    const newQty = item.qty + change;
                    if (newQty < 1) return item;
                    return { ...item, qty: newQty };
                }
                return item;
            }));
            return;
        }

        if (context === 'cart') {
            updateQuantity(id, size, (prev) => prev + change);
            return;
        }

        const { savedKey } = getKeys();
        const storedItems = JSON.parse(localStorage.getItem(savedKey)) || [];
        const newItems = storedItems.map(item => {
            if (item.id === id && item.size === size) {
                const newQty = item.qty + change;
                if (newQty < 1) return item;
                return { ...item, qty: newQty };
            }
            return item;
        });

        localStorage.setItem(savedKey, JSON.stringify(newItems));
        if (context === 'saved') {
            const { isAuth } = getKeys();
            if (!isAuth) return;
            updateSavedItems();
        }
    };

    const handleManualQuantityChange = (e, id, size, context = 'cart') => {
        const value = e.target.value;
        if (value === '') return;

        const newQty = parseInt(value, 10);
        if (isNaN(newQty) || newQty < 1) return;

        if (context === 'buy_again') {
            setBuyAgainItems(prev => prev.map(item => {
                if (item.id === id && item.size === size) {
                    return { ...item, qty: newQty };
                }
                return item;
            }));
            return;
        }

        if (context === 'cart') {
            updateQuantity(id, size, newQty);
            return;
        }

        if (context === 'saved') {
            const { isAuth } = getKeys();
            if (!isAuth) return;
        }

        const { savedKey } = getKeys();
        const storedItems = JSON.parse(localStorage.getItem(savedKey)) || [];

        const newItems = storedItems.map(item => {
            if (item.id === id && item.size === size) {
                return { ...item, qty: newQty };
            }
            return item;
        });

        localStorage.setItem(savedKey, JSON.stringify(newItems));
        if (context === 'saved') {
            updateSavedItems();
        }
    };

    const handleRemove = (id, size) => {
        removeFromCart(id, size);
    };

    // Size Picker Logic
    const openSizePicker = (item, context = 'cart') => {
        setEditingItem(item);
        setPickerContext(context);
        setShowSizePicker(true);
    };

    const closeSizePicker = () => {
        setShowSizePicker(false);
        setEditingItem(null);
        setPickerContext(null);
    };

    const handleSizeChange = (newSize) => {
        if (!editingItem || editingItem.size === newSize) {
            closeSizePicker();
            return;
        }

        if (pickerContext === 'buy_again') {
            setBuyAgainItems(prev => {
                const existingIndex = prev.findIndex(i => i.id === editingItem.id && i.size === newSize);
                if (existingIndex > -1) {
                    const newList = prev.filter(i => !(i.id === editingItem.id && i.size === editingItem.size));
                    const targetIndex = newList.findIndex(i => i.id === editingItem.id && i.size === newSize);
                    newList[targetIndex].qty += (editingItem.qty || editingItem.quantity || 1);
                    return newList;
                } else {
                    return prev.map(i => {
                        if (i.id === editingItem.id && i.size === editingItem.size) {
                            return { ...i, size: newSize };
                        }
                        return i;
                    });
                }
            });
            closeSizePicker();
            return;
        }

        if (pickerContext === 'cart') {
            // Transfer quantity to new size
            const qtyStr = editingItem.qty || editingItem.quantity || 1;
            const itemQty = parseInt(qtyStr, 10) || 1;
            removeFromCart(editingItem.id, editingItem.size);
            addToCart(editingItem.id, newSize, itemQty);
            closeSizePicker();
            return;
        }

        const { savedKey } = getKeys();
        const storedItems = JSON.parse(localStorage.getItem(savedKey)) || [];
        const existingItemIndex = storedItems.findIndex(i => i.id === editingItem.id && i.size === newSize);

        let newItems;
        if (existingItemIndex > -1) {
            newItems = storedItems.filter(i => !(i.id === editingItem.id && i.size === editingItem.size));
            const targetIndex = newItems.findIndex(i => i.id === editingItem.id && i.size === newSize);
            newItems[targetIndex].qty += (editingItem.qty || 1);
        } else {
            newItems = storedItems.map(i => {
                if (i.id === editingItem.id && i.size === editingItem.size) {
                    return { ...i, size: newSize };
                }
                return i;
            });
        }

        localStorage.setItem(savedKey, JSON.stringify(newItems));
        if (pickerContext === 'saved') {
            updateSavedItems();
        }
        closeSizePicker();
    };

    const handleSaveForLater = (item) => {
        const { savedKey, isAuth } = getKeys();
        const itemQty = parseInt(item.qty || item.quantity || 1, 10) || 1;

        if (!isAuth) {
            const wishlistIds = JSON.parse(localStorage.getItem('wishlist_guest')) || [];
            if (!wishlistIds.includes(item.id)) {
                wishlistIds.push(item.id);
                localStorage.setItem('wishlist_guest', JSON.stringify(wishlistIds));
                window.dispatchEvent(new Event('wishlistUpdated'));
            }
        } else {
            const storedSavedItems = JSON.parse(localStorage.getItem(savedKey)) || [];
            const existingIndex = storedSavedItems.findIndex(i => i.id === item.id && i.size === item.size);
            if (existingIndex > -1) {
                storedSavedItems[existingIndex].qty += itemQty;
            } else {
                storedSavedItems.push({ id: item.id, size: item.size, qty: itemQty });
            }
            localStorage.setItem(savedKey, JSON.stringify(storedSavedItems));
            updateSavedItems();
        }

        // Remove from cart
        removeFromCart(item.id, item.size);
    };

    const handleMoveToBag = (item) => {
        const { savedKey, isAuth } = getKeys();
        const itemQty = parseInt(item.qty || item.quantity || 1, 10) || 1;

        // 1. Add to Cart
        addToCart(item.id, item.size, itemQty);

        // 2. Remove from Source
        if (!isAuth) {
            const wishlistIds = JSON.parse(localStorage.getItem('wishlist_guest')) || [];
            const newWishlistIds = wishlistIds.filter(id => id !== item.id);
            localStorage.setItem('wishlist_guest', JSON.stringify(newWishlistIds));
            window.dispatchEvent(new Event('wishlistUpdated'));
            updateSavedItems();
        } else {
            const storedSavedItems = JSON.parse(localStorage.getItem(savedKey)) || [];
            const newSavedItems = storedSavedItems.filter(i => !(i.id === item.id && i.size === item.size));
            localStorage.setItem(savedKey, JSON.stringify(newSavedItems));
            updateSavedItems();
        }
    };

    const removeSavedItem = (id, size) => {
        const { savedKey } = getKeys();
        const storedItems = JSON.parse(localStorage.getItem(savedKey)) || [];
        const newItems = storedItems.filter(item => !(item.id === id && item.size === size));
        localStorage.setItem(savedKey, JSON.stringify(newItems));
        updateSavedItems();
    };

    const getDeliveryDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    if (cartItems.length === 0 && savedItems.length === 0) {
        return (
            <div className="cart-page-container empty-cart-container">
                <div className="empty-cart-icon">🛍️</div>
                <h2 className="empty-cart-title">Hey, it feels so light!</h2>
                <p className="empty-cart-text">There is nothing in your bag. Let's add some items.</p>
                <Link to="/">
                    <button className="btn-continue-shopping">Start Shopping</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page-container">
            <div className="cart-header">
                <h2>Shopping Bag <span>{cartItems.length} Items</span></h2>
            </div>

            <div className="cart-layout">
                {/* Left Side: Items List */}
                <div className="cart-items-section">
                    {cartItems.length > 0 && (
                        <div className="cart-items-list">
                            {cartItems.map((item, index) => (
                                <div key={`${item.id}-${item.size}-${index}`} className="cart-page-item">
                                    <img src={item.image} alt={item.title} className="cart-item-image" />

                                    <div className="cart-item-details">
                                        <div className="cart-item-brand">{item.brand}</div>
                                        <div className="cart-item-title">{item.title}</div>

                                        <div className="cart-item-meta">
                                            <div
                                                className="meta-chip interactive"
                                                onClick={() => openSizePicker(item)}
                                                title="Change Size"
                                            >
                                                Size: {item.size} <span className="chip-arrow">▼</span>
                                            </div>
                                            <div className="qty-selector" style={{ marginLeft: '10px' }}>
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => handleQuantityChange(item.id, item.size, -1)}
                                                    disabled={item.qty <= 1}
                                                >−</button>
                                                <input
                                                    type="number"
                                                    className="qty-input"
                                                    value={item.qty}
                                                    onChange={(e) => handleManualQuantityChange(e, item.id, item.size)}
                                                    min="1"
                                                />
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => handleQuantityChange(item.id, item.size, 1)}
                                                >+</button>
                                            </div>
                                        </div>

                                        <div className="cart-item-price-block">
                                            <span className="current-price">Rs. {item.price * item.qty}</span>
                                            {item.discount > 0 && (
                                                <>
                                                    <span className="original-price">
                                                        Rs. {Math.round((item.price * 100) / (100 - item.discount)) * item.qty}
                                                    </span>
                                                    <span className="discount-off">({item.discount}% OFF)</span>
                                                </>
                                            )}
                                        </div>

                                        {isAuthenticated && (
                                            <div className="cart-item-delivery">
                                                Delivery by <span style={{ fontWeight: '700' }}>{getDeliveryDate()}</span>
                                                <span> | </span>
                                                <span className="delivery-free">FREE</span>
                                            </div>
                                        )}

                                        <button className="save-later-btn" onClick={() => handleSaveForLater(item)}>
                                            Save For Later
                                        </button>
                                    </div>

                                    <button
                                        className="remove-btn-desktop"
                                        onClick={() => handleRemove(item.id, item.size)}
                                        aria-label="Remove item"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Secondary Section (Saved / Buy Again) */}
                    <div className="saved-for-later-container">
                        <div className="secondary-list-header">
                            <div
                                className={`list-toggle-tab ${secondaryView === 'saved' ? 'active' : ''}`}
                                onClick={() => setSecondaryView('saved')}
                            >
                                Saved For Later ({savedItems.length})
                            </div>
                            {isAuthenticated && (
                                <div
                                    className={`list-toggle-tab ${secondaryView === 'buy_again' ? 'active' : ''}`}
                                    onClick={() => setSecondaryView('buy_again')}
                                >
                                    Buy Again
                                </div>
                            )}
                        </div>

                        {secondaryView === 'saved' && savedItems.map((item, index) => (
                            <div key={`saved-${item.id}-${item.size}-${index}`} className="cart-page-item">
                                <img src={item.image} alt={item.title} className="cart-item-image" />

                                <div className="cart-item-details">
                                    <div className="cart-item-brand">{item.brand}</div>
                                    <div className="cart-item-title">{item.title}</div>

                                    <div className="cart-item-meta">
                                        <div
                                            className="meta-chip interactive"
                                            onClick={() => openSizePicker(item, 'saved')}
                                            title="Change Size"
                                        >
                                            Size: {item.size} <span className="chip-arrow">▼</span>
                                        </div>
                                        <div className="qty-selector" style={{ marginLeft: '10px' }}>
                                            <button
                                                className="qty-btn"
                                                onClick={() => handleQuantityChange(item.id, item.size, -1, 'saved')}
                                                disabled={item.qty <= 1}
                                            >−</button>
                                            <input
                                                type="number"
                                                className="qty-input"
                                                value={item.qty}
                                                onChange={(e) => handleManualQuantityChange(e, item.id, item.size, 'saved')}
                                                min="1"
                                            />
                                            <button
                                                className="qty-btn"
                                                onClick={() => handleQuantityChange(item.id, item.size, 1, 'saved')}
                                            >+</button>
                                        </div>
                                    </div>

                                    <div className="cart-item-price-block">
                                        <span className="current-price">Rs. {item.price * item.qty}</span>
                                        {item.discount > 0 && (
                                            <>
                                                <span className="original-price">
                                                    Rs. {Math.round((item.price * 100) / (100 - item.discount)) * item.qty}
                                                </span>
                                                <span className="discount-off">({item.discount}% OFF)</span>
                                            </>
                                        )}
                                    </div>
                                    <button className="move-to-bag-btn" onClick={() => handleMoveToBag(item)}>
                                        MOVE TO BAG
                                    </button>
                                </div>
                                <button
                                    className="remove-btn-desktop"
                                    onClick={() => removeSavedItem(item.id, item.size)}
                                    aria-label="Remove item"
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        {secondaryView === 'buy_again' && buyAgainItems.map((item, index) => (
                            <div key={`buyagain-${item.id}-${index}`} className="cart-page-item">
                                <img src={item.image} alt={item.title} className="cart-item-image" />

                                <div className="cart-item-details">
                                    <div className="cart-item-brand">{item.brand}</div>
                                    <div className="cart-item-title">{item.title}</div>
                                    <div className="cart-item-meta">
                                        <div
                                            className="meta-chip interactive"
                                            onClick={() => openSizePicker(item, 'buy_again')}
                                            title="Change Size"
                                        >
                                            Size: {item.size} <span className="chip-arrow">▼</span>
                                        </div>
                                        <div className="qty-selector" style={{ marginLeft: '10px' }}>
                                            <button
                                                className="qty-btn"
                                                onClick={() => handleQuantityChange(item.id, item.size, -1, 'buy_again')}
                                                disabled={item.qty <= 1}
                                            >−</button>
                                            <input
                                                type="number"
                                                className="qty-input"
                                                value={item.qty}
                                                onChange={(e) => handleManualQuantityChange(e, item.id, item.size, 'buy_again')}
                                                min="1"
                                            />
                                            <button
                                                className="qty-btn"
                                                onClick={() => handleQuantityChange(item.id, item.size, 1, 'buy_again')}
                                            >+</button>
                                        </div>
                                    </div>
                                    <div className="cart-item-price-block">
                                        <span className="current-price">Rs. {item.price * item.qty}</span>
                                        {item.discount > 0 && (
                                            <>
                                                <span className="original-price">
                                                    Rs. {Math.round((item.price * 100) / (100 - item.discount)) * item.qty}
                                                </span>
                                                <span className="discount-off">({item.discount}% OFF)</span>
                                            </>
                                        )}
                                    </div>
                                    <button className="move-to-bag-btn" onClick={() => handleMoveToBag(item)}>
                                        ADD TO BAG
                                    </button>
                                </div>
                                {/* No remove button for Buy Again generally, or maybe a generic remove? Keeping simple for now */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Size Picker Modal */}
                {showSizePicker && editingItem && (
                    <div className="size-picker-overlay" onClick={closeSizePicker}>
                        <div className="size-picker-modal" onClick={e => e.stopPropagation()}>
                            <div className="size-picker-header">
                                <h3>Select Size</h3>
                                <button className="close-picker-btn" onClick={closeSizePicker}>×</button>
                            </div>
                            <div className="size-picker-list">
                                {availableSizes.map(size => (
                                    <div
                                        key={size}
                                        className={`size-option ${editingItem.size === size ? 'selected' : ''}`}
                                        onClick={() => handleSizeChange(size)}
                                    >
                                        <span>{size}</span>
                                        {editingItem.size === size && <span className="size-check">✓</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}


                {/* Right Side: Order Summary */}
                {cartItems.length > 0 && (
                    <div className="cart-summary-section">
                        <div className="summary-box">
                            <div className="summary-header">Price Details ({cartItems.length} Items)</div>

                            <div className="summary-row">
                                <span>Total MRP</span>
                                <span>Rs. {Math.round(subtotal * 1.1)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Discount on MRP</span>
                                <span className="free-green">-Rs. {Math.round(subtotal * 0.1)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Convenience Fee</span>
                                <span className="free-green">FREE</span>
                            </div>

                            <div className="summary-row total">
                                <span>Total Amount</span>
                                <span>Rs. {subtotal}</span>
                            </div>

                            <Link to="/checkout" style={{ textDecoration: 'none' }}>
                                <button className="btn-checkout-full">PLACE ORDER</button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
