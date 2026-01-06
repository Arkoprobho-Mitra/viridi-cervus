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
        if (!currentUser) return; // Should not happen if auth is true, but safe check

        const visitKey = `visited_products_${currentUser.email}`;
        const searchKey = `search_history_${currentUser.email}`;

        const visitedIds = JSON.parse(localStorage.getItem(visitKey)) || [];
        const searchTerms = JSON.parse(localStorage.getItem(searchKey)) || [];

        // 1. Get Visited Products
        let items = visitedIds.map(id => products.find(p => p.id === id)).filter(Boolean);

        // 2. Fill with Search Results if < 15
        if (items.length < 15) {
            const needed = 15 - items.length;
            const existingIds = new Set(items.map(p => p.id));
            let searchResults = [];

            for (const term of searchTerms) {
                if (searchResults.length >= needed) break;

                const matches = products.filter(p => {
                    if (existingIds.has(p.id)) return false;
                    const text = `${p.title} ${p.brand} ${p.category}`.toLowerCase();
                    return text.includes(term.toLowerCase());
                });

                for (const match of matches) {
                    if (!existingIds.has(match.id)) {
                        searchResults.push(match);
                        existingIds.add(match.id);
                        if (searchResults.length >= needed) break;
                    }
                }
            }
            items = [...items, ...searchResults];
        }

        // 3. Format for Slider
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
        <div>
            <HistoryBanner />
            <HistorySlidingWindow items={historyItems} windowSize={Math.min(4, historyItems.length)} />
            <HistoryBanner />
        </div>
    );
};

export default ItemHistory;
