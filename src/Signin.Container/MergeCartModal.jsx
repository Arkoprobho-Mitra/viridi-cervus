import React, { useState, useEffect } from 'react';
import './MergeWishlistModal.css';
import { prefetchProductsByIds, getCachedProduct } from '../utils/productCache';

const MergeCartModal = ({ isOpen, guestCartItems, onMerge, onDiscard }) => {
    const [cartPreviewItems, setCartPreviewItems] = useState([]);

    useEffect(() => {
        if (!isOpen || !guestCartItems?.length) return;
        const ids = guestCartItems.map(item => item.id).filter(Boolean);
        prefetchProductsByIds(ids).then(() => {
            const enriched = guestCartItems.map(item => {
                const product = getCachedProduct(item.id);
                return product ? {
                    ...product,
                    cartQty: item.quantity || item.qty || 1,
                    cartSize: item.size
                } : null;
            }).filter(Boolean);
            setCartPreviewItems(enriched);
        });
    }, [isOpen, guestCartItems]);

    if (!isOpen) return null;

    return (
        <div className="merge-modal-overlay" onClick={onDiscard}>
            <div className="merge-modal" onClick={(e) => e.stopPropagation()}>
                <div className="merge-header">
                    <h3>Unsaved Cart Items</h3>
                    <p>You have items in your guest cart. Would you like to add them to your account?</p>
                </div>

                <div className="merge-preview-grid">
                    {cartPreviewItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="merge-item-card">
                            <img src={item.image} alt={item.title} />
                            <div className="merge-item-info">
                                <span className="item-name">{item.title}</span>
                                <span className="item-price" style={{fontSize: '12px', color: '#555'}}>Size: {item.cartSize} | Qty: {item.cartQty}</span>
                                <span className="item-price">Rs. {Number(item.price) * item.cartQty}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="merge-actions">
                    <button className="btn-discard" onClick={onDiscard}>NO, DISCARD THEM</button>
                    <button className="btn-merge" onClick={onMerge}>YES, ADD TO ACCOUNT</button>
                </div>
            </div>
        </div>
    );
};

export default MergeCartModal;
