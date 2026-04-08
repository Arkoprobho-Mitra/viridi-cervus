import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.Login.css';
import googleIcon from './login.image.container/search.png';
import metaIcon from './login.image.container/meta.png';
import xIcon from './login.image.container/twitter.png';
import loginVideo from './login.image.container/loginscreenvideo.mp4';
import SignupModal from './SignupModal';
import MergeWishlistModal from './MergeWishlistModal';
import MergeCartModal from './MergeCartModal';
import MockUserList from './MockUserList';
import { usersData } from './usersData';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../api';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    // Merge Wishlist State
    const [showMergeModal, setShowMergeModal] = useState(false);
    const [pendingUser, setPendingUser] = useState(null);
    const [guestIds, setGuestIds] = useState([]);

    // Merge Cart State
    const [showMergeCartModal, setShowMergeCartModal] = useState(false);
    const [guestCartItems, setGuestCartItems] = useState([]);

    const checkGuestCart = (user) => {
        const guestCart = JSON.parse(localStorage.getItem('cart_guest')) || [];
        if (guestCart.length > 0) {
            setPendingUser(user);
            setGuestCartItems(guestCart);
            setShowMergeCartModal(true);
        } else {
            finalizeLogin(user);
        }
    };

    const handleMergeCart = () => {
        const userCartKey = `cart_${pendingUser.email}`;
        const userCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

        const mergedCart = [...userCart];
        guestCartItems.forEach(guestItem => {
            const existingIndex = mergedCart.findIndex(item => item.id === guestItem.id && item.size === guestItem.size);
            if (existingIndex > -1) {
                const existingQty = Number(mergedCart[existingIndex].qty || mergedCart[existingIndex].quantity || 1);
                const incomingQty = Number(guestItem.qty || guestItem.quantity || 1);
                mergedCart[existingIndex].qty = existingQty + incomingQty;
                mergedCart[existingIndex].quantity = existingQty + incomingQty;
            } else {
                mergedCart.push(guestItem);
            }
        });

        localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
        localStorage.removeItem('cart_guest');

        setShowMergeCartModal(false);
        finalizeLogin(pendingUser);
    };

    const handleDiscardCart = () => {
        localStorage.removeItem('cart_guest');
        setShowMergeCartModal(false);
        finalizeLogin(pendingUser);
    };

    const finalizeLogin = (user) => {
        // Merge Guest History (Visited Products)
        const guestHistory = JSON.parse(localStorage.getItem('visited_products_guest')) || [];
        const userHistoryKey = `visited_products_${user.email}`;
        const userHistory = JSON.parse(localStorage.getItem(userHistoryKey)) || [];

        // Merge: Guest items come first (most recent), then existing user items
        // Remove duplicates checking against the combined list
        const combinedHistory = [...guestHistory, ...userHistory];
        const uniqueHistory = [...new Set(combinedHistory)].slice(0, 15);

        localStorage.setItem(userHistoryKey, JSON.stringify(uniqueHistory));
        localStorage.removeItem('visited_products_guest');

        // Merge Guest Search History
        const guestSearch = JSON.parse(localStorage.getItem('search_history_guest')) || [];
        const userSearchKey = `search_history_${user.email}`;
        const userSearch = JSON.parse(localStorage.getItem(userSearchKey)) || [];

        const combinedSearch = [...guestSearch, ...userSearch];
        const uniqueSearch = [...new Set(combinedSearch)].slice(0, 15);

        localStorage.setItem(userSearchKey, JSON.stringify(uniqueSearch));
        localStorage.removeItem('search_history_guest');

        login(user);

        window.dispatchEvent(new Event('wishlistUpdated')); // Also update wishlist counts immediately
        window.dispatchEvent(new Event('cartUpdated')); // Also update cart counts immediately

        navigate('/'); // Redirect to Home
    };

    const handleLogin = (user) => {
        // Check for guest wishlist items
        const guestItems = JSON.parse(localStorage.getItem('wishlist_guest')) || [];

        if (guestItems.length > 0) {
            setPendingUser(user);
            setGuestIds(guestItems);
            setShowMergeModal(true);
        } else {
            checkGuestCart(user);
        }
    };

    const handleMergeWishlist = () => {
        const userKey = `wishlist_${pendingUser.email}`;
        const existingUserWishlist = JSON.parse(localStorage.getItem(userKey)) || [];

        // Merge arrays and remove duplicates
        const mergedSet = new Set([...existingUserWishlist, ...guestIds]);
        const mergedArray = Array.from(mergedSet);

        localStorage.setItem(userKey, JSON.stringify(mergedArray));
        localStorage.removeItem('wishlist_guest'); // Clear guest data

        setShowMergeModal(false);
        checkGuestCart(pendingUser);
    };

    const handleDiscardWishlist = () => {
        localStorage.removeItem('wishlist_guest'); // Clear guest data
        setShowMergeModal(false);
        checkGuestCart(pendingUser);
    };

    const handleDirectLogin = (user) => {
        handleLogin(user);
    };

    const handleManualSubmit = async (e) => {
        e.preventDefault();

        if (loginData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            const data = await authApi.login(loginData.email, loginData.password);
            localStorage.setItem('authToken', data.token);
            const user = {
                id: data.id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                viridiCredit: data.viridiCredit ?? 0,
                addresses: [],
                savedCards: [],
                giftCards: [],
                orders: [],
            };
            handleLogin(user);
        } catch (err) {
            // Fall back to mock users for local dev
            const user = usersData.find(u =>
                (u.email === loginData.email || u.phone === loginData.email) &&
                u.password === loginData.password
            );
            if (user) {
                handleLogin(user);
            } else {
                setError(err.message || 'Invalid credentials.');
            }
        }
    };

    return (
        <div className="login-container" >
            <div className="login-split-container">
                <div className="login-banner-side">
                    <div className="banner-content">
                        <video
                            src={loginVideo}
                            autoPlay
                            preload="auto"
                            loop
                            muted
                            playsInline
                            className="background-video"
                        />
                    </div>
                </div>

                <div className="login-form-side">
                    <div className="login-card">
                        <div className="login-logo">
                            <Link to="/">
                                <img src="/image.container/logo1.png" alt="Viridi Cervus Logo" />
                            </Link>
                        </div>
                        <h2>Welcome Back</h2>
                        <p className="login-subtitle">Login to your account</p>

                        <form className="login-form" onSubmit={handleManualSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email or Mobile Number</label>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={loginData.email}
                                    onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={loginData.password}
                                    onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                    required
                                />
                            </div>
                            {error && <p style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{error}</p>}
                            <div className="form-actions">
                                <a href="#" className="forgot-password">Forgot Password?</a>
                            </div>
                            <button type="submit" className="login-btn-primary">LOGIN</button>
                        </form>

                        <div className="divider">
                            <span>Or Login In Using</span>
                        </div>

                        <div className="social-login">
                            <button className="social-btn meta">
                                <img src={metaIcon} alt="Meta" />
                            </button>
                            <button className="social-btn X">
                                <img src={xIcon} alt="X" />
                            </button>
                            <button className="social-btn google">
                                <img src={googleIcon} alt="Google" />
                            </button>
                        </div>

                        <p className="signup-link">
                            Don't have an account?
                            <span
                                onClick={() => setIsSignupOpen(true)}
                                style={{
                                    color: 'forestgreen',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    marginLeft: '5px'
                                }}
                            >
                                Sign Up
                            </span>
                        </p>

                        {/* Mock User Container */}
                        <MockUserList onDirectLogin={handleDirectLogin} />
                    </div>
                </div>
            </div>

            <SignupModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
            />

            <MergeWishlistModal
                isOpen={showMergeModal}
                guestItemIds={guestIds}
                onMerge={handleMergeWishlist}
                onDiscard={handleDiscardWishlist}
            />

            <MergeCartModal
                isOpen={showMergeCartModal}
                guestCartItems={guestCartItems}
                onMerge={handleMergeCart}
                onDiscard={handleDiscardCart}
            />
        </div>
    );
};

export default Login;
