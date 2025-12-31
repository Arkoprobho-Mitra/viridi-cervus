import React, { useState } from 'react';
import './MoveToBagModal.css';

const MoveToBagModal = ({ product, isOpen, onClose, onConfirm }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !product) return null;

    // Mock sizes - ideally this comes from product data
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const handleConfirm = () => {
        if (selectedSize) {
            onConfirm(product, selectedSize, quantity);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>✕</button>

                <div className="modal-header">
                    <img src={product.image} alt={product.title} className="modal-product-img" />
                    <div className="modal-product-info">
                        <h3 className="modal-product-title">{product.title}</h3>
                        <p className="modal-product-price">
                            Rs. {product.price}
                            <span className="modal-original-price">Rs. {product.originalPrice}</span>
                            <span className="modal-discount">({product.discount}% OFF)</span>
                        </p>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="modal-section">
                        <h4>Select Size</h4>
                        <div className="size-selector">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        {/* Error message or prompt could go here if user tries to submit without size */}
                    </div>

                    <div className="modal-section">
                        <h4>Select Quantity</h4>
                        <div className="quantity-selector">
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="qty-display" style={{ display: 'none' }}>{quantity}</span>
                            <input
                                type="number"
                                className="qty-input"
                                value={quantity}
                                placeholder="1"
                                min="1"
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val > 0) {
                                        setQuantity(val);
                                    } else if (e.target.value === '') {
                                        setQuantity(''); // Allow empty while typing
                                    }
                                }}
                                onBlur={() => {
                                    if (quantity === '' || quantity < 1) {
                                        setQuantity(1);
                                    }
                                }}
                            />
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    className={`modal-confirm-btn ${!selectedSize ? 'disabled' : ''}`}
                    onClick={handleConfirm}
                    disabled={!selectedSize}
                >
                    DONE
                </button>
            </div>
        </div>
    );
};

export default MoveToBagModal;
