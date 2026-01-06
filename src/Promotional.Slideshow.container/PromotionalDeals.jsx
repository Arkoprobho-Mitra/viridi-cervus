import React, { useState, useEffect } from 'react';
import PromotionalSlidingWindow from './Promotional.Slideshow.jsx';
import { products } from '../ProductListing.Container/productsData';
import PromotionalBanner from './PromotionalBanner.jsx';
import { Link } from 'react-router-dom';

const PromotionalDeals = () => {
    const [offerItems, setOfferItems] = useState([]);

    useEffect(() => {
        // Filter and sort products by discount
        // We take products with discount > 0 and sort descending
        const deals = products
            .filter(p => p.discount > 0)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, 15);

        // Format for Slider
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
