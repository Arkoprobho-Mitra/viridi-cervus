import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Wishlist.css';
import '../ProductListing.Container/ProductListing.css'; // Reuse product card styles
import ProductCard from '../ProductListing.Container/ProductCard';
import Pagination from '../ProductListing.Container/Pagination';
import WishlistGuest from './WishlistGuest';
import MoveToBagModal from './MoveToBagModal';
import { useWishlist } from '../contexts/WishlistContext';

const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlistItems: rawWishlistItems, removeFromWishlist, moveToBag } = useWishlist();
    const [currentPage, setCurrentPage] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const itemsPerPage = 50;
    const [sortBy, setSortBy] = useState('discount');
    const [isSortOpen, setSortOpen] = useState(false);
    const sortTimeoutRef = React.useRef(null);

    // Modal State
    const [selectedProductForBag, setSelectedProductForBag] = useState(null);

    const handleSortLeave = () => {
        sortTimeoutRef.current = setTimeout(() => {
            setSortOpen(false);
        }, 200);
    };

    const handleSortEnter = () => {
        if (sortTimeoutRef.current) {
            clearTimeout(sortTimeoutRef.current);
        }
    };

    useEffect(() => {
        return () => {
            if (sortTimeoutRef.current) {
                clearTimeout(sortTimeoutRef.current);
            }
        };
    }, []);

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

    const wishlistItems = React.useMemo(() => sortItems(rawWishlistItems, sortBy), [rawWishlistItems, sortBy]);

    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(!!auth);
    }, []);

    if (!isAuthenticated) {
        return <WishlistGuest />;
    }

    const handleRemove = (e, id) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        removeFromWishlist(id);
    };

    const handleMoveToBag = (product) => {
        setSelectedProductForBag(product);
    };

    const handleConfirmMoveToBag = (product, size, qty) => {
        moveToBag(product.id, size, qty);
        setSelectedProductForBag(null);
        alert(`${product.title} (Size: ${size}, Qty: ${qty}) moved to bag!`);
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
                            onMouseLeave={handleSortLeave}
                            onMouseEnter={handleSortEnter}
                        >
                            <span className="selected-sort">
                                {sortBy === 'discount' && 'Better Discount'}
                                {sortBy === 'priceLow' && 'Price: Low to High'}
                                {sortBy === 'priceHigh' && 'Price: High to Low'}
                            </span>
                            <span className="sort-chevron"></span>

                            <ul className="sort-options-list">
                                <li
                                    className={sortBy === 'discount' ? 'active' : ''}
                                    onClick={(e) => { e.stopPropagation(); setSortBy('discount'); handleSortLeave(); }}
                                >
                                    Better Discount
                                </li>
                                <li
                                    className={sortBy === 'priceLow' ? 'active' : ''}
                                    onClick={(e) => { e.stopPropagation(); setSortBy('priceLow'); handleSortLeave(); }}
                                >
                                    Price: Low to High
                                </li>
                                <li
                                    className={sortBy === 'priceHigh' ? 'active' : ''}
                                    onClick={(e) => { e.stopPropagation(); setSortBy('priceHigh'); handleSortLeave(); }}
                                >
                                    Price: High to Low
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {wishlistItems.length === 0 ? (
                <div className="empty-wishlist">
                    <h2>Your Wishlist is Empty</h2>
                    <p>Save items that you like in your wishlist. Review them anytime and easily move them to the bag.</p>
                    <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
                </div>
            ) : (
                <>
                    <div className="wishlist-page-grid">
                        {displayedItems.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                actionType="remove"
                                onAction={(e) => handleRemove(e, product.id)}
                                onMoveToBag={() => handleMoveToBag(product)}
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

                    {/* Move to Bag Modal */}
                    <MoveToBagModal
                        product={selectedProductForBag}
                        isOpen={!!selectedProductForBag}
                        onClose={() => setSelectedProductForBag(null)}
                        onConfirm={handleConfirmMoveToBag}
                    />
                </>
            )}
        </div>
    );
};



export default Wishlist;
