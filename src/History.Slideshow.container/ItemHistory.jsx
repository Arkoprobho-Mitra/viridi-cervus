import React, { useState, useEffect, useCallback } from 'react';
import HistorySlidingWindow from './History.Slideshow.jsx';
import HistoryBanner from './History.Banner.jsx';
import { Link } from 'react-router-dom';
import { prefetchProductsByIds, getCachedProduct } from '../utils/productCache';

const API_BASE = process.env.REACT_APP_SPRING_BASE_URL || 'http://localhost:8081';

const ItemHistory = () => {
    const [historyItems, setHistoryItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated'));

    const formatForSlider = (products) => products.map(product => ({
        image: (
            <Link to={`/product/${product.id}`} draggable="false">
                <img src={product.image} alt={product.title} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Link>
        ),
        description: (
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '5px', color: '#333' }}>{product.brand}</div>
                <div style={{ fontSize: '12px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.title}</div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#282c3f' }}>Rs. {product.price}</div>
            </div>
        )
    }));

    const updateHistory = useCallback(async () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const visitKey = `visited_products_${currentUser.email}`;
        const visitedIds = JSON.parse(localStorage.getItem(visitKey)) || [];

        await prefetchProductsByIds(visitedIds);
        let items = visitedIds.map(id => getCachedProduct(id)).filter(Boolean);
        const existingIds = new Set(items.map(p => p.id));

        if (items.length < 15) {
            try {
                const res = await fetch(`${API_BASE}/api/products?size=50&page=0&sortBy=rating`);
                const json = await res.json();
                const pool = json?.data?.content ?? json?.content ?? [];
                for (const p of pool) {
                    if (items.length >= 15) break;
                    if (!existingIds.has(p.id)) {
                        items.push(p);
                        existingIds.add(p.id);
                    }
                }
            } catch { /* graceful empty */ }
        }

        setHistoryItems(formatForSlider(items));
    }, []);

    const checkAuth = useCallback(() => {
        const auth = !!localStorage.getItem('isAuthenticated');
        setIsAuthenticated(auth);
        if (auth) updateHistory();
        else setHistoryItems([]);
    }, [updateHistory]);

    useEffect(() => {
        checkAuth();
        window.addEventListener('historyUpdated', updateHistory);
        window.addEventListener('storage', checkAuth);
        return () => {
            window.removeEventListener('historyUpdated', updateHistory);
            window.removeEventListener('storage', checkAuth);
        };
    }, [checkAuth, updateHistory]);

    if (!isAuthenticated || historyItems.length === 0) return null;

    return (
        <div className="history-slideshow-wrapper">
            <HistoryBanner />
            <HistorySlidingWindow items={historyItems} windowSize={Math.min(6, historyItems.length)} />
            <HistoryBanner />
        </div>
    );
};

export default ItemHistory;
