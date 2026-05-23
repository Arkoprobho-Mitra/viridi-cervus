import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { prefetchProductsByIds, getCachedProduct } from '../utils/productCache';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { currentUser, isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    const getCartKey = () => isAuthenticated && currentUser ? `cart_${currentUser.email}` : 'cart_guest';

    const loadCart = async () => {
        const key = getCartKey();
        const storedItems = JSON.parse(localStorage.getItem(key)) || [];

        // Prefetch all product details in one parallel batch
        const ids = storedItems.map(item => item.id).filter(Boolean);
        await prefetchProductsByIds(ids);

        const enrichedItems = storedItems.map(item => {
            const product = getCachedProduct(item.id);
            const qty = Number(item.qty || item.quantity || 1);
            return product ? {
                ...product,
                ...item,
                quantity: qty,
                originalPrice: Number(product.originalPrice || product.price),
                price: Number(product.price)
            } : null;
        }).filter(Boolean);

        setCartItems(enrichedItems);
    };

    // Load initial and sync across tabs
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        loadCart();
        window.addEventListener('storage', loadCart);
        window.addEventListener('cartUpdated', loadCart);

        return () => {
            window.removeEventListener('storage', loadCart);
            window.removeEventListener('cartUpdated', loadCart);
        };
    }, [currentUser, isAuthenticated]);

    const saveCart = (newItems) => {
        const key = getCartKey();
        // Only save bare necessary info to local storage
        const itemsToSave = newItems.map(item => ({
            id: item.id,
            qty: item.quantity,
            size: item.size
        }));
        localStorage.setItem(key, JSON.stringify(itemsToSave));
        window.dispatchEvent(new Event('cartUpdated')); // Keep old event for partial refactors
        loadCart(); // Refresh state immediately
    };

    const addToCart = (productId, size, quantity = 1) => {
        const currentItems = [...cartItems];
        const existingIndex = currentItems.findIndex(item => item.id === productId && item.size === size);

        if (existingIndex > -1) {
            currentItems[existingIndex].quantity += quantity;
        } else {
            // Need a fully enriched object for immediate state updates, 
            // but `saveCart` strips it down for localStorage and cleanly re-loads it.
            currentItems.push({ id: productId, size, quantity });
        }
        
        saveCart(currentItems);
    };

    const removeFromCart = (productId, size) => {
        const newItems = cartItems.filter(item => !(item.id === productId && item.size === size));
        saveCart(newItems);
    };

    const updateQuantity = (productId, size, newObjOrQty) => {
        // Handle direct quantity number or delta change function
        const currentItems = [...cartItems];
        const itemIndex = currentItems.findIndex(item => item.id === productId && item.size === size);
        
        if (itemIndex > -1) {
            let newQty;
            if (typeof newObjOrQty === 'function') {
                newQty = newObjOrQty(currentItems[itemIndex].quantity);
            } else {
                newQty = newObjOrQty;
            }

            if (newQty <= 0) {
                currentItems.splice(itemIndex, 1);
            } else {
                currentItems[itemIndex].quantity = newQty;
            }
            saveCart(currentItems);
        }
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartMRP = cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
    const totalDiscount = cartMRP - cartTotal;

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            cartTotal,
            cartMRP,
            totalDiscount,
            addToCart,
            removeFromCart,
            updateQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};
