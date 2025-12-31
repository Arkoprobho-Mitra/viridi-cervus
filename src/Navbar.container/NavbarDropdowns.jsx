import React from 'react';
import './Navbar.styles.css';

import { Link } from 'react-router-dom';
import { products } from '../ProductListing.Container/productsData';

export const AccountDropdown = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const currentUser = isAuthenticated ? JSON.parse(localStorage.getItem('currentUser')) : null;

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
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
                <li>My Account</li>
                <li>Orders</li>
                <li><Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>Wishlist</Link></li>
                <li>Gift Cards</li>
                <li>Contact Us</li>
                <li>Viridi Credit</li>
                <li>Coupons</li>
                <li>Saved Cards</li>
                <li>Saved Addresses</li>
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

    const displayedItems = wishlistProducts.slice(0, 8);
    const remainingCount = wishlistProducts.length - displayedItems.length;

    if (!isAuthenticated) {
        return (
            <div className="dropdown-menu wishlist-dropdown" style={{ textAlign: 'center', padding: '20px' }}>
                <h4>Your Wishlist</h4>
                <p style={{ margin: '10px 0', fontSize: '13px', color: '#535766' }}>Login to view items in your wishlist</p>
                <Link to="/login">
                    <button className="login-btn" style={{ width: '100%', marginTop: '10px' }}>LOGIN / SIGNUP</button>
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

    return (
        <div className="dropdown-menu wishlist-dropdown">
            <h4>Your Wishlist ({wishlistProducts.length} items)</h4>
            <div className="wishlist-grid">
                {displayedItems.map(item => (
                    <div key={item.id} className="wishlist-item">
                        <img src={item.image} alt={item.title} />
                        <div className="item-details">
                            <span className="item-name" style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{item.title}</span>
                            <span className="item-price">
                                Rs. {item.price}
                                <span style={{ fontSize: '10px', color: '#ff905a', marginLeft: '5px', fontWeight: 'bold' }}>
                                    ({item.discount}% OFF)
                                </span>
                            </span>
                        </div>
                        {/* Simplified 'Move to Bag' for dropdown */}
                        <button className="move-to-cart" style={{ fontSize: '10px', padding: '4px 8px', marginRight: '5px' }}>MOVE</button>
                        <span
                            className="remove-wishlist-item"
                            onClick={(e) => removeFromWishlist(e, item.id)}
                            title="Remove from wishlist"
                        >×</span>
                    </div>
                ))}
            </div>
            {remainingCount > 0 && (
                <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '12px', color: '#ff3f6c', fontWeight: 'bold' }}>
                    + {remainingCount} more items
                </div>
            )}
            <Link to="/wishlist" style={{ textDecoration: 'none' }}>
                <button className="view-all-btn">VIEW ALL</button>
            </Link>
        </div>
    );
};

export const CartDropdown = () => {
    // Mock data for cart
    const cartItems = [
        { id: 1, name: 'Cotton T-Shirt', price: 599, qty: 1, img: 'https://via.placeholder.com/60' },
        { id: 2, name: 'Casual Sneakers', price: 1999, qty: 1, img: 'https://via.placeholder.com/60' },
    ];

    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div className="dropdown-menu cart-dropdown">
            <h4>Shopping Bag ({cartItems.length})</h4>
            <div className="cart-list">
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.img} alt={item.name} />
                        <div className="item-info">
                            <div className="item-name">{item.name}</div>
                            <div className="item-meta">Qty: {item.qty}</div>
                            <div className="item-price">Rs. {item.price}</div>
                        </div>
                        <span className="remove-item">×</span>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <span>Total</span>
                <span>Rs. {total}</span>
            </div>
            <div className="cart-actions">
                <button className="view-cart-btn">VIEW BAG</button>
                <button className="checkout-btn">CHECKOUT</button>
            </div>
        </div>
    );
};
