import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { products } from '../ProductListing.Container/productsData';

export const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const { currentUser, isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const [wishlistIds, setWishlistIds] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    const getWishlistKey = () => isAuthenticated && currentUser ? `wishlist_${currentUser.email}` : 'wishlist_guest';

    const loadWishlist = () => {
        const key = getWishlistKey();
        const storedIds = JSON.parse(localStorage.getItem(key)) || [];
        setWishlistIds(storedIds);

        const enrichedItems = storedIds.map(id => {
            return products.find(p => p.id === id);
        }).filter(Boolean);

        setWishlistItems(enrichedItems);
    };

    useEffect(() => {
        loadWishlist();
        window.addEventListener('storage', loadWishlist);
        window.addEventListener('wishlistUpdated', loadWishlist);

        return () => {
            window.removeEventListener('storage', loadWishlist);
            window.removeEventListener('wishlistUpdated', loadWishlist);
        };
    }, [currentUser, isAuthenticated]);

    const saveWishlist = (newIds) => {
        const key = getWishlistKey();
        localStorage.setItem(key, JSON.stringify(newIds));
        window.dispatchEvent(new Event('wishlistUpdated'));
        loadWishlist();
    };

    const toggleWishlist = (productId) => {
        const currentIds = [...wishlistIds];
        const index = currentIds.indexOf(productId);
        if (index > -1) {
            currentIds.splice(index, 1);
        } else {
            currentIds.push(productId);
        }
        saveWishlist(currentIds);
    };

    const addToWishlist = (productId) => {
        if (!wishlistIds.includes(productId)) {
            saveWishlist([...wishlistIds, productId]);
        }
    };

    const removeFromWishlist = (productId) => {
        const newIds = wishlistIds.filter(id => id !== productId);
        saveWishlist(newIds);
    };

    const isInWishlist = (productId) => wishlistIds.includes(productId);

    const moveToBag = (productId, size, qty = 1) => {
        addToCart(productId, size, qty);
        removeFromWishlist(productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlistIds,
            wishlistItems,
            wishlistCount: wishlistIds.length,
            toggleWishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            moveToBag
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
