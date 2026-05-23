import React, { useState, useEffect } from 'react';
import './Checkout.css';
import AddressModal from '../Account.Container/AddressModal';
import { useNavigate } from 'react-router-dom';
import { useAddress } from '../contexts/AddressContext';
import { useCart } from '../contexts/CartContext';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    
    const { currentUser, addresses: savedAddresses, selectedAddress, selectAddress, addAddress } = useAddress();
    const { cartItems } = useCart();
    const selectedAddressId = selectedAddress?.id || null;



    const handleAddAddress = (newAddress) => {
        addAddress(newAddress);
        setIsAddressModalOpen(false);
    };

    const handleAddressSelect = (addr) => {
        selectAddress(addr);
    };

    // Calculations
    // Calculations (ensure numbers)
    const totalMRP = cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
    const totalDiscount = cartItems.reduce((acc, item) => acc + ((item.originalPrice - item.price) * item.quantity), 0);
    const subtotal = totalMRP - totalDiscount;
    const deliveryFee = subtotal > 500 ? 0 : 99;
    const totalAmount = subtotal + deliveryFee;

    const getDeliveryDate = (item) => {
        // Mock logic: Date depends on Item ID for variety
        const offset = (item.id % 3) + 3; // 3, 4, or 5 days
        const date = new Date();
        date.setDate(date.getDate() + offset);
        return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
    };

    // Group items by delivery date
    const groupedItems = cartItems.reduce((acc, item) => {
        const date = getDeliveryDate(item);
        if (!acc[date]) acc[date] = [];
        acc[date].push({ ...item, deliveryDate: date });
        return acc;
    }, {});

    // Sort dates (optional, but good for UX)
    const sortedDates = Object.keys(groupedItems).sort((a, b) => new Date(a) - new Date(b));

    const handlePlaceOrder = () => {
        if (selectedAddressId === null || selectedAddressId === undefined) {
            alert('Please select a delivery address');
            return;
        }
        // Navigate to payment page
        navigate('/payment');
    };

    return (
        <div className="checkout-container">
            <div className="checkout-left">
                <div style={{ marginBottom: '20px' }}>
                    <button
                        onClick={() => navigate('/cart')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#282c3f',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: 0
                        }}
                    >
                        <span>←</span> Back to Cart
                    </button>
                </div>

                {/* 1. Address Section */}
                <div className="checkout-section">
                    <h3>Select Delivery Address</h3>
                    <div className="address-grid">
                        {savedAddresses.map((addr, index) => {
                            // Data is now normalized to objects with IDs
                            const name = addr.name || currentUser?.name;
                            const mobile = addr.mobile || currentUser?.phone || currentUser?.mobile;
                            const addressLine = `${addr.address || ''}, ${addr.locality || ''}`;
                            const cityState = `${addr.city || ''}, ${addr.state || ''} - ${addr.pincode || ''}`;
                            const type = addr.addressType || 'HOME';
                            const id = addr.id;

                            return (
                                <div
                                    key={id}
                                    className={`address-card ${selectedAddressId === id ? 'selected' : ''}`}
                                    onClick={() => handleAddressSelect(addr)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <h4>
                                            {name}
                                            <span className="address-tag">{type}</span>
                                        </h4>
                                        {selectedAddressId === id && (
                                            <div style={{ color: 'forestgreen', fontWeight: 'bold' }}>✓</div>
                                        )}
                                    </div>
                                    <p>{addressLine}</p>
                                    <p>{cityState}</p>
                                    <p><strong>Mobile:</strong> {mobile}</p>
                                </div>
                            );
                        })}
                    </div>
                    <button className="add-address-btn" onClick={() => setIsAddressModalOpen(true)}>
                        + Add New Address
                    </button>
                </div>

                {/* 2. Product Review (Grouped by Delivery Date) */}
                <div className="checkout-section">
                    <h3>Review Items ({cartItems.length} Products)</h3>
                    {sortedDates.map((date) => (
                        <div key={date} className="delivery-group" style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ padding: '12px 15px', backgroundColor: '#f5f5f6', fontWeight: 'bold', color: '#333', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '8px' }}>🚚</span>
                                Delivery by {date}
                                <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 'normal', color: '#666' }}>{groupedItems[date].length} Items</span>
                            </div>
                            <div>
                                {groupedItems[date].map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="checkout-item" style={{ borderBottom: index === groupedItems[date].length - 1 ? 'none' : '1px solid #eee' }}>
                                        <img src={item.image} alt={item.title} className="checkout-item-img" />
                                        <div className="checkout-item-details">
                                            <div className="checkout-item-name">{item.title}</div>
                                            <div className="checkout-item-meta">Size: {item.size} | Qty: {item.quantity}</div>
                                            <div className="checkout-item-price">Rs. {item.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="checkout-right">
                <div className="checkout-section">
                    <h3>Price Details</h3>
                    <div className="price-row">
                        <span>Total MRP</span>
                        <span>Rs. {totalMRP}</span>
                    </div>
                    <div className="price-row">
                        <span>Discount on MRP</span>
                        <span className="free-text">-Rs. {totalDiscount}</span>
                    </div>
                    <div className="price-row">
                        <span>Convenience Fee</span>
                        <span className="free-text">FREE</span>
                    </div>
                    <div className="price-row">
                        <span>Delivery Fee</span>
                        <span>{deliveryFee === 0 ? <span className="free-text">FREE</span> : `Rs. ${deliveryFee}`}</span>
                    </div>
                    <div className="price-row total">
                        <span>Total Amount</span>
                        <span>Rs. {totalAmount}</span>
                    </div>

                    {currentUser ? (
                        <button className="place-order-btn" onClick={handlePlaceOrder}>
                            Make Payment
                        </button>
                    ) : (
                        <button className="place-order-btn" onClick={() => navigate('/login')} style={{ backgroundColor: '#ff3f6c', color: 'white' }}>
                            LOGIN TO CONTINUE
                        </button>
                    )}
                    <div style={{ marginTop: '10px', fontSize: '10px', color: '#777', textAlign: 'center' }}>
                        By placing the order, you agree to Viridi's Terms of Use and Privacy Policy.
                    </div>
                </div>
            </div>

            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                onSave={handleAddAddress}
            />
        </div>
    );
};

export default CheckoutPage;
