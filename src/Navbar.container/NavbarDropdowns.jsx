import React from 'react';
import './Navbar.styles.css';

import { Link } from 'react-router-dom';
import AddressModal from '../Account.Container/AddressModal';
import { products } from '../ProductListing.Container/productsData';

export const AccountDropdown = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const currentUser = isAuthenticated ? JSON.parse(localStorage.getItem('currentUser')) : null;

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('selectedDeliveryAddress');
        window.location.href = '/'; // Refresh/Redirect to clear state
    };

    return (
        <div className="dropdown-menu account-dropdown">
            <div className="dropdown-header">
                {isAuthenticated ? (
                    <>
                        <h4>Hello, {currentUser?.name}</h4>
                        <p>{currentUser?.email}</p>
                        <button className="login-btn" onClick={handleLogout} style={{ backgroundColor: 'forestgreen', borderColor: 'black', color: 'white' }}>
                            LOGOUT
                        </button>
                    </>
                ) : (
                    <>
                        <h4>Welcome</h4>
                        <p>To access account and manage orders</p>
                        <Link to="/login">
                            <button className="login-btn">LOGIN / SIGNUP</button>
                        </Link>
                    </>
                )}
            </div>
            <ul className="dropdown-list">
                <li><Link to="/account" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>My Account</Link></li>
                <li><Link to="/orders" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>Orders</Link></li>
                <li><Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>Wishlist</Link></li>
                <li><Link to="/gift-cards" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>Gift Cards</Link></li>
                <li><Link to="/contact-us" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>Contact Us</Link></li>
                <li><Link to="/viridi-credit" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>Viridi Credit</Link></li>
                <li><Link to="/coupons" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>Coupons</Link></li>
                <li><Link to="/saved-cards" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>Saved Cards</Link></li>
                <li><Link to="/saved-addresses" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>Saved Addresses</Link></li>
            </ul>
        </div>
    );
};



export const WishlistDropdown = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const [wishlistProducts, setWishlistProducts] = React.useState([]);

    const updateWishlist = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const key = currentUser ? `wishlist_${currentUser.email}` : 'wishlist_guest';
        const storedIds = JSON.parse(localStorage.getItem(key)) || [];
        // Filter the full products list to find matches
        const items = products
            .filter(p => storedIds.includes(p.id))
            .sort((a, b) => b.discount - a.discount);
        setWishlistProducts(items);
    };

    React.useEffect(() => {
        updateWishlist();
        window.addEventListener('wishlistUpdated', updateWishlist);
        window.addEventListener('storage', updateWishlist); // For cross-tab sync

        return () => {
            window.removeEventListener('wishlistUpdated', updateWishlist);
            window.removeEventListener('storage', updateWishlist);
        };
    }, []);

    const displayedItems = wishlistProducts.slice(0, 5); // Match cart limit of 5
    const remainingCount = wishlistProducts.length - displayedItems.length;

    if (wishlistProducts.length === 0) {
        return (
            <div className="dropdown-menu wishlist-dropdown" style={{ textAlign: 'center', padding: '20px' }}>
                <h4>Your Wishlist</h4>
                <p style={{ margin: '10px 0', fontSize: '13px', color: '#535766' }}>Your wishlist is empty.</p>
                <Link to="/">
                    <button className="login-btn" style={{ width: '100%', marginTop: '10px' }}>START SHOPPING</button>
                </Link>
            </div>
        );
    }

    const removeFromWishlist = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const key = currentUser ? `wishlist_${currentUser.email}` : 'wishlist_guest';
        const currentIds = JSON.parse(localStorage.getItem(key)) || [];

        const newIds = currentIds.filter(itemId => itemId !== id);
        localStorage.setItem(key, JSON.stringify(newIds));

        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    const moveToBag = (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const cartKey = isAuthenticated && currentUser ? `cart_${currentUser.email}` : 'cart_guest';
        const storedItems = JSON.parse(localStorage.getItem(cartKey)) || [];

        // Check if item exists in cart (assuming default size 'M' for now as per ProductCard logic)
        const defaultSize = 'M';
        const existingItemIndex = storedItems.findIndex(cartItem => cartItem.id === item.id && cartItem.size === defaultSize);

        let newItems;
        if (existingItemIndex > -1) {
            newItems = [...storedItems];
            newItems[existingItemIndex].qty += 1;
        } else {
            newItems = [...storedItems, { id: item.id, qty: 1, size: defaultSize }];
        }

        localStorage.setItem(cartKey, JSON.stringify(newItems));
        window.dispatchEvent(new Event('cartUpdated'));

        // Remove from wishlist
        removeFromWishlist(e, item.id);
    };

    return (
        <div className="dropdown-menu wishlist-dropdown">
            <h4>Your Wishlist ({wishlistProducts.length} items)</h4>
            <div className="wishlist-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {displayedItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="wishlist-item" style={{ display: 'flex', gap: '10px', padding: '10px 0', borderBottom: '1px solid #eee', position: 'relative' }}>
                        <Link to={`/product/${item.id}`}>
                            <img src={item.image} alt={item.title} style={{ width: '50px', height: '60px', objectFit: 'cover' }} />
                        </Link>
                        <div className="item-info" style={{ flex: 1 }}>
                            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="item-name" style={{ fontSize: '12px', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>{item.title}</div>
                            </Link>
                            <div className="item-meta" style={{ fontSize: '11px', color: '#777', margin: '2px 0' }}>
                                <span style={{ color: '#ff905a', fontWeight: 'bold' }}>
                                    ({item.discount}% OFF)
                                </span>
                            </div>
                            <div className="item-price" style={{ fontSize: '12px', marginTop: '4px' }}>
                                Rs. {item.price}
                            </div>
                            {isAuthenticated ? (
                                <button
                                    className="move-to-cart"
                                    onClick={(e) => moveToBag(e, item)}
                                    style={{ fontSize: '10px', padding: '4px 8px', marginTop: '5px', backgroundColor: 'forestgreen', border: '1px solid #d4d5d9', cursor: 'pointer', borderRadius: '2px', color: 'white' }}
                                >
                                    MOVE TO BAG
                                </button>
                            ) : (
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <button
                                        className="move-to-cart"
                                        style={{ fontSize: '10px', padding: '4px 8px', marginTop: '5px', backgroundColor: 'forestgreen', border: '1px solid #d4d5d9', cursor: 'pointer', borderRadius: '2px', color: 'white' }}
                                    >
                                        LOGIN TO CONTINUE
                                    </button>
                                </Link>
                            )}
                        </div>
                        <span
                            className="remove-wishlist-item"
                            onClick={(e) => removeFromWishlist(e, item.id)}
                            title="Remove from wishlist"
                            style={{ cursor: 'pointer', fontSize: '16px', color: '#999', position: 'absolute', top: '5px', right: '0' }}
                        >×</span>
                    </div>
                ))}
            </div>
            {remainingCount > 0 && (
                <div style={{ textAlign: 'center', margin: '5px 0', fontSize: '11px', color: 'forestgreen', fontWeight: 'bold' }}>
                    + {remainingCount} more items
                </div>
            )}
            <div className="wishlist-actions" style={{ padding: '10px 0', borderTop: '1px solid #eee' }}>
                <Link to="/wishlist" style={{ display: 'block' }}>
                    <button className="view-wishlist-btn" style={{ width: '100%', padding: '8px', backgroundColor: 'forestgreen', color: 'white', border: 'none', fontWeight: 'bold' }}>VIEW WISHLIST</button>
                </Link>
            </div>
        </div>
    );
};

export const CartDropdown = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const [cartItems, setCartItems] = React.useState([]);

    const updateCart = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const key = isAuthenticated && currentUser ? `cart_${currentUser.email}` : 'cart_guest';
        const storedItems = JSON.parse(localStorage.getItem(key)) || [];

        // Enrich stored items with product details
        const enrichedItems = storedItems.map(item => {
            const product = products.find(p => p.id === item.id);
            return product ? { ...product, ...item } : null;
        }).filter(item => item !== null);

        setCartItems(enrichedItems);
    };

    React.useEffect(() => {
        updateCart();
        window.addEventListener('cartUpdated', updateCart);
        window.addEventListener('storage', updateCart);

        return () => {
            window.removeEventListener('cartUpdated', updateCart);
            window.removeEventListener('storage', updateCart);
        };
    }, [isAuthenticated]);

    const removeFromCart = (e, id, size) => {
        e.preventDefault();
        e.stopPropagation();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const key = isAuthenticated && currentUser ? `cart_${currentUser.email}` : 'cart_guest';
        const storedItems = JSON.parse(localStorage.getItem(key)) || [];

        const newItems = storedItems.filter(item => !(item.id === id && item.size === size));
        localStorage.setItem(key, JSON.stringify(newItems));

        window.dispatchEvent(new Event('cartUpdated'));
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const displayedItems = cartItems.slice(0, 5); // Show max 5 items in dropdown
    const remainingCount = cartItems.length - displayedItems.length;

    if (cartItems.length === 0) {
        return (
            <div className="dropdown-menu cart-dropdown" style={{ textAlign: 'center', padding: '20px' }}>
                <h4>Shopping Bag</h4>
                <p style={{ margin: '10px 0', fontSize: '13px', color: '#535766' }}>Your bag is empty.</p>
                <Link to="/">
                    <button className="login-btn" style={{ width: '100%', marginTop: '10px' }}>START SHOPPING</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="dropdown-menu cart-dropdown">
            <h4>Shopping Bag ({cartItems.length} items)</h4>
            <div className="cart-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {displayedItems.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="cart-item" style={{ display: 'flex', gap: '10px', padding: '10px 0', borderBottom: '1px solid #eee', position: 'relative' }}>
                        <Link to={`/product/${item.id}`}>
                            <img src={item.image} alt={item.title} style={{ width: '50px', height: '60px', objectFit: 'cover' }} />
                        </Link>
                        <div className="item-info" style={{ flex: 1 }}>
                            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="item-name" style={{ fontSize: '12px', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>{item.title}</div>
                            </Link>
                            <div className="item-meta" style={{ fontSize: '11px', color: '#777' }}>
                                Size: {item.size} | Qty: {item.qty}
                            </div>
                            <div className="item-price" style={{ fontSize: '12px', marginTop: '4px' }}>
                                Rs. {item.price * item.qty}
                            </div>
                        </div>
                        <span
                            className="remove-item"
                            style={{ cursor: 'pointer', fontSize: '16px', color: '#999', position: 'absolute', top: '5px', right: '0' }}
                            onClick={(e) => removeFromCart(e, item.id, item.size)}
                        >
                            ×
                        </span>
                    </div>
                ))}
            </div>
            {remainingCount > 0 && (
                <div style={{ textAlign: 'center', margin: '5px 0', fontSize: '11px', color: 'forestgreen', fontWeight: 'bold' }}>
                    + {remainingCount} more items
                </div>
            )}
            <div className="cart-total" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontWeight: 'bold', borderTop: '1px solid #eee' }}>
                <span>Total</span>
                <span>Rs. {total}</span>
            </div>

            <div className="cart-actions" style={{ display: 'flex', gap: '10px' }}>
                <Link to="/cart" style={{ flex: 1 }}>
                    <button className="view-cart-btn" style={{ width: '100%', padding: '8px', backgroundColor: 'white', border: '1px solid #d4d5d9', fontWeight: 'bold' }}>VIEW BAG</button>
                </Link>
                <Link to="/checkout" style={{ flex: 1 }}>
                    <button className="checkout-btn" style={{ width: '100%', padding: '8px', backgroundColor: 'forestgreen', color: 'white', border: 'none', fontWeight: 'bold' }}>CHECKOUT</button>
                </Link>
            </div>
        </div>
    );
};

export const AddressDropdown = ({ isOpen, setIsOpen }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const [currentUser, setCurrentUser] = React.useState(null);
    const [selectedAddrStr, setSelectedAddrStr] = React.useState(localStorage.getItem('selectedDeliveryAddress'));

    const loadData = () => {
        if (!isAuthenticated) return;
        const user = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(user);
    };

    React.useEffect(() => {
        loadData();
        window.addEventListener('userUpdated', loadData);
        return () => window.removeEventListener('userUpdated', loadData);
    }, [isAuthenticated]);

    const onAddressClick = (addr) => {
        const str = JSON.stringify(addr);
        setSelectedAddrStr(str);
        localStorage.setItem('selectedDeliveryAddress', str);

        // Save as last used for this user
        if (currentUser && currentUser.email) {
            localStorage.setItem(`last_selected_address_${currentUser.email}`, str);
        }

        window.dispatchEvent(new Event('deliveryAddressUpdated'));
    };

    const handleSaveAddress = (addressData) => {
        const addressWithId = { ...addressData, id: Date.now() };
        const newAddresses = [...(currentUser.addresses || []), addressWithId];
        const updatedUser = { ...currentUser, addresses: newAddresses };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('userUpdated'));
        setIsOpen(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="dropdown-menu address-dropdown" style={{ textAlign: 'center', padding: '20px' }}>
                <h4>Saved Addresses</h4>
                <p style={{ margin: '10px 0', fontSize: '13px', color: '#535766' }}>Login to view your saved addresses.</p>
                <Link to="/login">
                    <button className="login-btn" style={{ width: '100%', marginTop: '10px' }}>LOGIN</button>
                </Link>
            </div>
        );
    }

    const addresses = currentUser?.addresses || [];

    const renderAddressText = (addr) => {
        if (typeof addr === 'string') return addr;
        return `${addr.address}, ${addr.locality}, ${addr.city} - ${addr.pincode}`;
    };

    const getTypeLabel = (addr) => {
        if (typeof addr !== 'object') return 'HOME';
        if (addr.addressType === 'OTHER' && addr.customType) return addr.customType;
        return addr.addressType || 'HOME';
    };

    return (
        <>
            <div className="dropdown-menu address-dropdown">
                <h4>Saved Addresses</h4>
                {addresses.length > 0 ? (
                    <div className="address-list">
                        {addresses.map((addr, idx) => {
                            const isSel = selectedAddrStr === JSON.stringify(addr);
                            return (
                                <div
                                    key={idx}
                                    className={`address-item ${isSel ? 'selected' : ''}`}
                                    onClick={() => onAddressClick(addr)}
                                >
                                    <div className="address-name">
                                        {typeof addr === 'object' ? addr.name : (currentUser?.name || 'User')}
                                        <span className="address-badge">{getTypeLabel(addr)}</span>
                                        {isSel && <span style={{ float: 'right', color: 'forestgreen', fontWeight: 'bold' }}>✓</span>}
                                    </div>
                                    <div className="address-details">
                                        {renderAddressText(addr)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px 0', color: '#666', fontSize: '13px' }}>
                        No addresses saved.
                    </div>
                )}

                <button className="add-address-btn" onClick={() => setIsOpen(true)}>+ ADD NEW ADDRESS</button>

            </div>
            {isOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
                    <AddressModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onSave={handleSaveAddress}
                        initialData={null}
                    />
                </div>
            )}
        </>
    );
};
