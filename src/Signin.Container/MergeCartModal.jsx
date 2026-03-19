import React from 'react';
import './MergeWishlistModal.css'; // Reusing wishlist modal styles
import { products } from '../ProductListing.Container/productsData';

const MergeCartModal = ({ isOpen, guestCartItems, onMerge, onDiscard }) => {
    if (!isOpen) return null;

    // Filter products to show preview
    const cartPreviewItems = guestCartItems.map(item => {
        const product = products.find(p => p.id === item.id);
        return {
            ...product,
            cartQty: item.quantity || item.qty || 1,
            cartSize: item.size
        };
    }).filter(p => p.id); // Filter out any undefined matches

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
