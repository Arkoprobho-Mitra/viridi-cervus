import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Wishlist.css';
import '../ProductListing.Container/ProductListing.css'; // Reuse product card styles
import { products } from '../ProductListing.Container/productsData';
import ProductCard from '../ProductListing.Container/ProductCard';
import Pagination from '../ProductListing.Container/Pagination';
import WishlistGuest from './WishlistGuest';

const Wishlist = () => {
    const navigate = useNavigate();
    // Initialize with some mock data (first 8 items)
    const [wishlistItems, setWishlistItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const itemsPerPage = 50;
    const [sortBy, setSortBy] = useState('discount');
    const [isSortOpen, setSortOpen] = useState(false);

    // Sorting Logic
    const sortItems = (items, sortType) => {
        const sorted = [...items];
        if (sortType === 'discount') {
            sorted.sort((a, b) => b.discount - a.discount);
        } else if (sortType === 'priceLow') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortType === 'priceHigh') {
            sorted.sort((a, b) => b.price - a.price);
        }
        return sorted;
    };

    useEffect(() => {
        if (wishlistItems.length > 0) {
            const sorted = sortItems(wishlistItems, sortBy);
            // Only update if order effectively changes (simple check or force update)
            // Ideally we re-sort when sorting state changes
            setWishlistItems(sorted);
        }
    }, [sortBy]);

    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(!!auth);

        if (auth) {
            const loadWishlist = () => {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                const key = currentUser ? `wishlist_${currentUser.email}` : 'wishlist_guest';
                const storedIds = JSON.parse(localStorage.getItem(key)) || [];
                let items = products.filter(p => storedIds.includes(p.id));

                // Initial Sort
                items = sortItems(items, sortBy);

                setWishlistItems(items);
            };

            loadWishlist();
            window.addEventListener('wishlistUpdated', loadWishlist);

            return () => {
                window.removeEventListener('wishlistUpdated', loadWishlist);
            };
        }
    }, [sortBy]); // Re-load/Re-sort if dependencies change

    if (!isAuthenticated) {
        return <WishlistGuest />;
    }

    const removeFromWishlist = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        // Update Local State
        setWishlistItems(prev => prev.filter(item => item.id !== id));

        // Update Storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const key = currentUser ? `wishlist_${currentUser.email}` : 'wishlist_guest';
        const currentIds = JSON.parse(localStorage.getItem(key)) || [];
        const newIds = currentIds.filter(itemId => itemId !== id);
        localStorage.setItem(key, JSON.stringify(newIds));

        // Dispatch Event (for Navbar)
        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Calculate Pagination
    const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);
    const displayedItems = wishlistItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="wishlist-container">
            <div className="wishlist-header">
                <h1 className="wishlist-title">My Wishlist <span className="wishlist-count">({wishlistItems.length} items)</span></h1>

                {wishlistItems.length > 0 && (
                    <div className="sort-container">
                        <span className="sort-label">Sort by : </span>
                        <div
                            className={`custom-sort-dropdown ${isSortOpen ? 'open' : ''}`}
                            onClick={() => setSortOpen(!isSortOpen)}
                        >
                            <span className="selected-sort">
                                {sortBy === 'discount' && 'Better Discount'}
                                {sortBy === 'priceLow' && 'Price: Low to High'}
                                {sortBy === 'priceHigh' && 'Price: High to Low'}
                            </span>
                            <span className="sort-chevron"></span>

                            {isSortOpen && (
                                <ul className="sort-options-list">
                                    <li
                                        className={sortBy === 'discount' ? 'active' : ''}
                                        onClick={(e) => { e.stopPropagation(); setSortBy('discount'); setSortOpen(false); }}
                                    >
                                        Better Discount
                                    </li>
                                    <li
                                        className={sortBy === 'priceLow' ? 'active' : ''}
                                        onClick={(e) => { e.stopPropagation(); setSortBy('priceLow'); setSortOpen(false); }}
                                    >
                                        Price: Low to High
                                    </li>
                                    <li
                                        className={sortBy === 'priceHigh' ? 'active' : ''}
                                        onClick={(e) => { e.stopPropagation(); setSortBy('priceHigh'); setSortOpen(false); }}
                                    >
                                        Price: High to Low
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {wishlistItems.length === 0 ? (
                <div className="empty-wishlist">
                    <h2>Your Wishlist is Empty</h2>
                    <p>Save items that you like in your wishlist. Review them anytime and easily move them to the bag.</p>
                    <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
                </div>
            ) : (
                <>
                    <div className="wishlist-page-grid">
                        {displayedItems.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                actionType="remove"
                                onAction={(e) => removeFromWishlist(e, product.id)}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ marginTop: '40px' }}>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Wishlist;
