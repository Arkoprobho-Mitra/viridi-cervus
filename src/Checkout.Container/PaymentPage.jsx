import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useNavigate } from 'react-router-dom';
import { products } from '../ProductListing.Container/productsData';

const PaymentPage = () => {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('recommended');
    const [subSelect, setSubSelect] = useState(null); // For sub-options like specific card
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    // Load Data
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        const cartKey = storedUser ? `cart_${storedUser.email}` : 'cart_guest'; // Fallback though likely guarded
        const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

        // Calculate Totals Reuse Logic
        const enrichedItems = storedCart.map(item => {
            const product = products.find(p => p.id === item.id);
            const qty = Number(item.qty || item.quantity || 1);
            return product ? {
                ...product,
                ...item,
                quantity: qty,
                originalPrice: Number(product.originalPrice || product.price),
                price: Number(product.price)
            } : null;
        }).filter(Boolean);

        setCartItems(enrichedItems);

        const totalMRP = enrichedItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
        const totalDiscount = enrichedItems.reduce((acc, item) => acc + ((item.originalPrice - item.price) * item.quantity), 0);
        const sub = totalMRP - totalDiscount;
        const fee = sub > 500 ? 0 : 99;
        setTotalAmount(sub + fee);

        if (enrichedItems.length === 0) {
            navigate('/cart');
        }

    }, [navigate]);

    const handlePayNow = () => {
        alert(`Payment Successful via ${selectedMethod.toUpperCase()}!`);

        // Clear Cart
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            localStorage.removeItem(`cart_${storedUser.email}`);
        }
        window.dispatchEvent(new Event('cartUpdated'));
        navigate('/'); // Or Order Success Page
    };

    const renderPaymentContent = () => {
        switch (selectedMethod) {
            case 'recommended':
                return (
                    <div className="saved-cards-list">
                        <div className="method-title">Recommended Payment Options</div>
                        <div
                            className={`payment-item-card ${subSelect === 'gpay' ? 'selected' : ''}`}
                            onClick={() => setSubSelect('gpay')}
                        >
                            <img src="https://img.icons8.com/color/48/google-pay-india.png" alt="GPay" width="24" />
                            <span>Google Pay</span>
                        </div>
                        <div
                            className={`payment-item-card ${subSelect === 'cod' ? 'selected' : ''}`}
                            onClick={() => setSubSelect('cod')}
                        >
                            <span>💵 Cash on Delivery (Cash/UPI)</span>
                        </div>
                    </div>
                );
            case 'cod':
                return (
                    <div className="cod-section">
                        <div className="method-title">Cash On Delivery</div>
                        <div className="payment-item-card selected">
                            Pay on delivery (Cash/Card/UPI)
                        </div>
                        <p style={{ fontSize: '12px', color: '#777' }}>Additional fee of Rs. 10 may apply for COD.</p>
                    </div>
                );
            case 'upi':
                return (
                    <div className="upi-options">
                        <div className="method-title">Pay via UPI</div>
                        <div className={`payment-item-card ${subSelect === 'phonepe' ? 'selected' : ''}`} onClick={() => setSubSelect('phonepe')}>
                            <span>PhonePe</span>
                        </div>
                        <div className={`payment-item-card ${subSelect === 'paytm' ? 'selected' : ''}`} onClick={() => setSubSelect('paytm')}>
                            <span>Paytm UPI</span>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <input type="text" placeholder="Enter UPI ID (e.g. user@bank)" style={{ padding: '10px', width: '100%', border: '1px solid #ddd' }} />
                        </div>
                    </div>
                );
            case 'card':
                return (
                    <div className="card-input-form">
                        <div className="method-title">Credit / Debit Card</div>
                        <div className="form-group">
                            <input type="text" placeholder="Card Number" />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Name on Card" />
                        </div>
                        <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder="Valid Thru (MM/YY)" />
                            <input type="text" placeholder="CVV" />
                        </div>
                    </div>
                );
            default:
                return <div>Select a payment method</div>;
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-left">
                <div className="payment-options-sidebar">
                    <div
                        className={`payment-option-tab ${selectedMethod === 'recommended' ? 'active' : ''}`}
                        onClick={() => setSelectedMethod('recommended')}
                    >
                        Recommended
                    </div>
                    <div
                        className={`payment-option-tab ${selectedMethod === 'cod' ? 'active' : ''}`}
                        onClick={() => setSelectedMethod('cod')}
                    >
                        Cash On Delivery
                    </div>
                    <div
                        className={`payment-option-tab ${selectedMethod === 'upi' ? 'active' : ''}`}
                        onClick={() => setSelectedMethod('upi')}
                    >
                        UPI (Google Pay, PhonePe)
                    </div>
                    <div
                        className={`payment-option-tab ${selectedMethod === 'card' ? 'active' : ''}`}
                        onClick={() => setSelectedMethod('card')}
                    >
                        Credit / Debit Card
                    </div>
                    <div
                        className={`payment-option-tab ${selectedMethod === 'netbanking' ? 'active' : ''}`}
                        onClick={() => setSelectedMethod('netbanking')}
                    >
                        Net Banking
                    </div>
                    <div
                        className={`payment-option-tab ${selectedMethod === 'wallet' ? 'active' : ''}`}
                        onClick={() => setSelectedMethod('wallet')}
                    >
                        Wallets
                    </div>
                </div>
                <div className="payment-method-content">
                    {renderPaymentContent()}
                    <button className="pay-now-btn" onClick={handlePayNow}>
                        PAY NOW
                    </button>
                </div>
            </div>

            <div className="payment-right">
                <div className="checkout-section">
                    <h3>Price Details</h3>
                    <div className="price-row total">
                        <span>Total Amount</span>
                        <span>Rs. {totalAmount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
