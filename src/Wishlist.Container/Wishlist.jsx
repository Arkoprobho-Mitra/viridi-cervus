import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Wishlist.css';
import '../ProductListing.Container/ProductListing.css'; // Reuse product card styles
import { products } from '../ProductListing.Container/productsData';
import ProductCard from '../ProductListing.Container/ProductCard';
import Pagination from '../ProductListing.Container/Pagination';

const Wishlist = () => {
    const navigate = useNavigate();
    // Initialize with some mock data (first 8 items)
    const [wishlistItems, setWishlistItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            // Simulate fetching wishlist from server
            setWishlistItems(products.slice(0, 60)); // 60 items total
        }
    }, [navigate]);

    const removeFromWishlist = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlistItems(prev => prev.filter(item => item.id !== id));
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
            <h1 className="wishlist-title">My Wishlist <span className="wishlist-count">({wishlistItems.length} items)</span></h1>
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
