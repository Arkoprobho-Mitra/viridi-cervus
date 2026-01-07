import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useNavigate } from 'react-router-dom';
import { products } from '../ProductListing.Container/productsData';

const PaymentPage = () => {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('cod'); // Default to COD or first option
    const [subSelect, setSubSelect] = useState(null); // For sub-options like specific card
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [bankSearchTerm, setBankSearchTerm] = useState('');
    const [userData, setUserData] = useState(null);
    const [useCredits, setUseCredits] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Load Data
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        setUserData(storedUser);
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
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            // Deduct Credits if used
            if (useCredits) {
                let deduction = Math.min(totalCredits, totalAmount);
                if (deduction > 0) {
                    let remainingDeduction = deduction;

                    // 1. Deduct from Wallet Balance first
                    if (storedUser.walletBalance > 0) {
                        const walletDeduction = Math.min(storedUser.walletBalance, remainingDeduction);
                        storedUser.walletBalance -= walletDeduction;
                        remainingDeduction -= walletDeduction;
                    }

                    // 2. Deduct from Gift Cards if needed
                    if (remainingDeduction > 0 && storedUser.giftCards) {
                        storedUser.giftCards = storedUser.giftCards.map(card => {
                            if (remainingDeduction <= 0 || !card.isRedeemed) return card;
                            const cardDeduction = Math.min(card.balance, remainingDeduction);
                            card.balance -= cardDeduction;
                            remainingDeduction -= cardDeduction;
                            return card;
                        });
                    }

                    // Add to History
                    const newHistoryItem = {
                        type: 'debit',
                        amount: deduction,
                        date: new Date().toISOString(),
                        description: 'Order Payment'
                    };
                    storedUser.creditHistory = [newHistoryItem, ...(storedUser.creditHistory || [])];

                    // Update Local Storage
                    localStorage.setItem('currentUser', JSON.stringify(storedUser));
                    setUserData(storedUser); // Update local state to reflect new balance immediately
                }
            }

            // Save Order Details
            const newOrder = {
                id: Date.now(), // Simple ID
                date: new Date().toISOString(),
                status: 'In Transit', // Default status for new orders
                items: cartItems,
                total: totalAmount,
                deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString() // Mock delivery date (+5 days)
            };
            storedUser.orders = [newOrder, ...(storedUser.orders || [])];
            localStorage.setItem('currentUser', JSON.stringify(storedUser));

            // Clear Cart
            localStorage.removeItem(`cart_${storedUser.email}`);
        }

        window.dispatchEvent(new Event('cartUpdated'));
        setShowSuccessPopup(true);
    };

    const handleClosePopup = () => {
        navigate('/'); // Go back to Home
    };

    const renderPaymentContent = () => {
        // Calculate dynamic amounts if credits are used
        let giftCardBalance = 0;
        let walletBalance = 0;

        if (userData) {
            giftCardBalance = (userData.giftCards || [])
                .filter(card => card.isRedeemed)
                .reduce((sum, card) => sum + card.balance, 0);
            walletBalance = userData.walletBalance || 0;
        }

        const totalCredits = giftCardBalance + walletBalance;
        const creditDeduction = useCredits ? Math.min(totalCredits, totalAmount) : 0;
        const finalPayable = totalAmount - creditDeduction;

        // If fully paid by credits, maybe show a "Proceed" button or empty state?
        // For now, let's keep the switch for the remaining amount payment method.

        switch (selectedMethod) {
            case 'netbanking': {
                const banks = [
                    "HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank",
                    "Punjab National Bank", "Bank of Baroda", "Canara Bank", "Union Bank of India",
                    "IDBI Bank", "Citi Bank", "Standard Chartered", "IndusInd Bank", "Yes Bank", "Federal Bank"
                ];

                const filteredBanks = banks.filter(bank => bank.toLowerCase().includes(bankSearchTerm.toLowerCase()));

                return (
                    <div className="netbanking-section">
                        <div className="method-title">Net Banking</div>
                        <input
                            type="text"
                            placeholder="Search for your bank"
                            className="bank-search-input"
                            value={bankSearchTerm}
                            onChange={(e) => setBankSearchTerm(e.target.value)}
                        />
                        <div className="bank-list-container">
                            {filteredBanks.map(bank => (
                                <div
                                    key={bank}
                                    className={`payment-item-card ${subSelect === bank ? 'selected' : ''}`}
                                    onClick={() => setSubSelect(subSelect === bank ? null : bank)}
                                >
                                    <span>{bank}</span>
                                    {subSelect === bank && <span className="selection-tick">✓</span>}
                                </div>
                            ))}
                            {filteredBanks.length === 0 && (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#777' }}>
                                    No banks found
                                </div>
                            )}
                        </div>
                    </div>
                );
            }
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
                        <div className={`payment-item-card ${subSelect === 'gpay' ? 'selected' : ''}`} onClick={() => setSubSelect(subSelect === 'gpay' ? null : 'gpay')}>
                            <span>Google Pay</span>
                            {subSelect === 'gpay' && <span className="selection-tick">✓</span>}
                        </div>
                        <div className={`payment-item-card ${subSelect === 'phonepe' ? 'selected' : ''}`} onClick={() => setSubSelect(subSelect === 'phonepe' ? null : 'phonepe')}>
                            <span>PhonePe</span>
                            {subSelect === 'phonepe' && <span className="selection-tick">✓</span>}
                        </div>
                        <div className={`payment-item-card ${subSelect === 'paytm' ? 'selected' : ''}`} onClick={() => setSubSelect(subSelect === 'paytm' ? null : 'paytm')}>
                            <span>Paytm UPI</span>
                            {subSelect === 'paytm' && <span className="selection-tick">✓</span>}
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <input type="text" placeholder="Enter UPI ID (e.g. user@bank)" style={{ padding: '10px', width: '100%', border: '1px solid #ddd' }} />
                        </div>
                    </div>
                );
            case 'card': {
                const savedCards = userData?.savedCards || [];
                return (
                    <div className="card-input-form">
                        <div className="method-title">Credit / Debit Card</div>
                        {savedCards.length > 0 && (
                            <div className="saved-cards-selection" style={{ marginBottom: '20px' }}>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', color: '#535766' }}>Saved Cards</div>
                                {savedCards.map(card => (
                                    <div
                                        key={card.id}
                                        className={`payment-item-card ${subSelect === card.id ? 'selected' : ''}`}
                                        onClick={() => setSubSelect(subSelect === card.id ? null : card.id)}
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '12px' }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <span style={{ fontWeight: '600' }}>{card.bank}</span>
                                            <span style={{ fontSize: '12px', background: '#eef0f3', padding: '2px 6px', borderRadius: '4px' }}>{card.type.toUpperCase()}</span>
                                        </div>
                                        <span style={{ fontSize: '14px', color: '#3e4152', marginTop: '4px' }}>{card.number}</span>
                                        <span style={{ fontSize: '12px', color: '#7e818c' }}>{card.holder}</span>
                                        {subSelect === card.id && <span className="selection-tick">✓</span>}
                                    </div>
                                ))}
                                <div
                                    className={`payment-item-card ${subSelect === 'new_card' ? 'selected' : ''}`}
                                    onClick={() => setSubSelect(subSelect === 'new_card' ? null : 'new_card')}
                                    style={{ marginTop: '10px' }}
                                >
                                    <span>+ Add New Card</span>
                                    {subSelect === 'new_card' && <span className="selection-tick">✓</span>}
                                </div>
                            </div>
                        )}
                        {(subSelect === 'new_card' || savedCards.length === 0) && (
                            <div className="new-card-form">
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
                        )}
                    </div>
                );
            }
            case 'wallet': {
                const wallets = ['Paytm Wallet', 'PhonePe Wallet', 'JioMoney', 'MobiKwik', 'Freecharge', 'Airtel Money'];
                return (
                    <div className="wallet-section">
                        <div className="method-title">Wallets</div>
                        <div className="saved-cards-list">
                            {wallets.map(wallet => (
                                <div
                                    key={wallet}
                                    className={`payment-item-card ${subSelect === wallet ? 'selected' : ''}`}
                                    onClick={() => setSubSelect(subSelect === wallet ? null : wallet)}
                                >
                                    <span>{wallet}</span>
                                    {subSelect === wallet && <span className="selection-tick">✓</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }
            default:
                return <div>Select a payment method</div>;
        }
    };

    // Calculate credits for top block
    let giftCardBalance = 0;
    let walletBalance = 0;
    if (userData) {
        giftCardBalance = (userData.giftCards || [])
            .filter(card => card.isRedeemed)
            .reduce((sum, card) => sum + card.balance, 0);
        walletBalance = userData.walletBalance || 0;
    }
    const totalCredits = giftCardBalance + walletBalance;

    return (
        <div className="payment-container">
            <div className="payment-left">
                {/* Viridi Credits Block */}
                <div className="viridi-credits-block-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <input
                            type="checkbox"
                            checked={useCredits}
                            onChange={(e) => setUseCredits(e.target.checked)}
                            style={{ width: '20px', height: '20px', accentColor: 'forestgreen', cursor: 'pointer' }}
                            disabled={totalCredits <= 0}
                        />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Use Viridi Credits</div>
                            <div style={{ fontSize: '14px', color: '#666' }}>Available Balance: <span style={{ color: 'forestgreen', fontWeight: 'bold' }}>Rs. {totalCredits.toFixed(2)}</span></div>
                        </div>
                        {useCredits && (
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                                - Rs. {Math.min(totalCredits, totalAmount).toFixed(2)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Viridi Credit History Block Removed - Moved to Account Page */}

                <div className="payment-split-layout">
                    <div className="payment-options-sidebar">
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
                    </div>
                </div>
                <button className="pay-now-btn" onClick={handlePayNow}>
                    {selectedMethod === 'cod' ? 'PROCEED WITH ORDER' : 'PAY NOW'}
                </button>
            </div>

            <div className="payment-right">
                <div className="checkout-section">
                    <h3>Price Details</h3>
                    <div className="price-row total">
                        <span>Total Amount</span>
                        <span>Rs. {totalAmount}</span>
                    </div>
                    {useCredits && (
                        <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', color: 'forestgreen' }}>
                            <span>Viridi Credits</span>
                            <span>- Rs. {Math.min(totalCredits, totalAmount).toFixed(2)}</span>
                        </div>
                    )}
                    <div className="price-row total" style={{ borderTop: '1px solid #eaeaec', paddingTop: '15px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <span>To Pay</span>
                        <span>Rs. {Math.max(0, totalAmount - (useCredits ? totalCredits : 0)).toFixed(2)}</span>
                    </div>
                </div>
            </div>
            {showSuccessPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
                        <h2>Order Placed Successfully!</h2>
                        <p style={{ fontSize: '16px', color: '#555', margin: '15px 0' }}>Thinking for purchasing.</p>
                        <p style={{ fontStyle: 'italic', color: 'forestgreen', fontWeight: 'bold', marginBottom: '25px' }}>
                            "The Premier Online Fashion Destination"
                        </p>
                        <button className="primary-btn" onClick={handleClosePopup} style={{ padding: '12px 30px' }}>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
