import React, { useState, useEffect } from 'react';
import HistorySlidingWindow from './History.Slideshow.jsx';
import { products } from '../ProductListing.Container/productsData';
import HistoryBanner from './History.Banner.jsx';
import { Link } from 'react-router-dom';

const ItemHistory = () => {
    const [historyItems, setHistoryItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated'));

    const checkAuth = () => {
        const auth = !!localStorage.getItem('isAuthenticated');
        setIsAuthenticated(auth);
        if (!auth) {
            setHistoryItems([]);
        } else {
            updateHistory();
        }
    };

    const updateHistory = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const visitKey = `visited_products_${currentUser.email}`;
        const visitedIds = JSON.parse(localStorage.getItem(visitKey)) || [];

        // 1. Visited Products
        let items = visitedIds.map(id => products.find(p => p.id === id)).filter(Boolean);
        const existingIds = new Set(items.map(p => p.id));

        const fill = (candidates) => {
            for (const p of candidates) {
                if (items.length >= 15) return;
                if (!existingIds.has(p.id)) {
                    items.push(p);
                    existingIds.add(p.id);
                }
            }
        };

        // 2. Similar Products (Matches SubCategory of visited items)
        if (items.length < 15) {
            const visitedSubCats = new Set(items.map(p => p.subCategory).filter(Boolean));
            // Prioritize by finding all matching params, but simple filter is okay for now
            const similarItems = products.filter(p => visitedSubCats.has(p.subCategory));
            fill(similarItems);
        }

        // 3. Same Brand (Matches Brand of visited items)
        if (items.length < 15) {
            const visitedBrands = new Set(items.map(p => p.brand).filter(Boolean));
            const brandItems = products.filter(p => visitedBrands.has(p.brand));
            fill(brandItems);
        }

        // 4. Promotional Ads
        if (items.length < 15) {
            const ads = products.filter(p => p.isAd);
            fill(ads);
        }

        // Format for Slider
        const formattedItems = items.map(product => ({
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

        setHistoryItems(formattedItems);
    };

    useEffect(() => {
        checkAuth();
        window.addEventListener('historyUpdated', updateHistory);
        window.addEventListener('storage', checkAuth); // Listen for cross-tab updates or manual storage changes if fired
        return () => {
            window.removeEventListener('historyUpdated', updateHistory);
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

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
