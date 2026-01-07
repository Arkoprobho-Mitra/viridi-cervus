import React from 'react';
import './MergeWishlistModal.css';
import { products } from '../ProductListing.Container/productsData';

const MergeWishlistModal = ({ isOpen, guestItemIds, onMerge, onDiscard }) => {
    if (!isOpen) return null;

    // Filter products to show preview
    const guestItems = products.filter(p => guestItemIds.includes(p.id));

    return (
        <div className="merge-modal-overlay" onClick={onDiscard}>
            <div className="merge-modal" onClick={(e) => e.stopPropagation()}>
                <div className="merge-header">
                    <h3>Unsaved Wishlist Items</h3>
                    <p>You have items in your guest wishlist. Would you like to add them to your account?</p>
                </div>

                <div className="merge-preview-grid">
                    {guestItems.map(item => (
                        <div key={item.id} className="merge-item-card">
                            <img src={item.image} alt={item.title} />
                            <div className="merge-item-info">
                                <span className="item-name">{item.title}</span>
                                <span className="item-price">Rs. {item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="merge-actions">
                    <button className="btn-discard" onClick={onDiscard}>NO, DELETE THEM</button>
                    <button className="btn-merge" onClick={onMerge}>YES, ADD TO MY WISHLIST</button>
                </div>
            </div>
        </div>
    );
};

export default MergeWishlistModal;
