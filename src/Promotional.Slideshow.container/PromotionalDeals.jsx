import React, { useState, useEffect } from 'react';
import PromotionalSlidingWindow from './Promotional.Slideshow.jsx';
import PromotionalBanner from './PromotionalBanner.jsx';
import { Link } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_SPRING_BASE_URL || 'http://localhost:8081';

const PromotionalDeals = () => {
    const [offerItems, setOfferItems] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE}/api/products?size=50&page=0&sortBy=discount&sortDir=desc`)
            .then(r => r.json())
            .then(json => {
                const deals = (json?.data?.content ?? json?.content ?? [])
                    .filter(p => p.discount > 0)
                    .slice(0, 15);

                const formattedItems = deals.map(product => ({
                    image: (
                        <Link to={`/product/${product.id}`} draggable="false">
                            <img src={product.image} alt={product.title} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Link>
                    ),
                    description: (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '5px', color: '#333' }}>{product.brand}</div>
                            <div style={{ fontSize: '12px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.title}</div>
                            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#282c3f' }}>
                                Rs. {product.price}
                                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '11px', marginLeft: '5px' }}>Rs. {product.originalPrice}</span>
                                <span style={{ color: '#ff905a', fontSize: '11px', marginLeft: '5px' }}>({product.discount}% OFF)</span>
                            </div>
                        </div>
                    )
                }));

                setOfferItems(formattedItems);
            })
            .catch(() => {});
    }, []);

    if (offerItems.length === 0) return null;

    return (
        <div>
            <PromotionalBanner />
            <PromotionalSlidingWindow items={offerItems} windowSize={Math.min(4, offerItems.length)} />
            <PromotionalBanner />
        </div>
    );
};

export default PromotionalDeals;
