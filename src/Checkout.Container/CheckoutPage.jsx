import React, { useState, useEffect } from 'react';
import './Checkout.css';
import AddressModal from '../Account.Container/AddressModal';
import { useNavigate } from 'react-router-dom';
import { products } from '../ProductListing.Container/productsData';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Load initial data
    useEffect(() => {
        const loadIds = () => {
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            if (storedUser) {
                setCurrentUser(storedUser);
                // Default addresses + user addresses
                const addresses = storedUser.addresses || [
                    {
                        id: 1,
                        name: storedUser.name,
                        mobile: '9876543210',
                        pincode: '560001',
                        address: '123, Green Street, Eco City',
                        locality: 'Central',
                        city: 'Bangalore',
                        state: 'Karnataka',
                        addressType: 'HOME'
                    }
                ];
                setSavedAddresses(addresses);

                // Auto-select the first one or the last selected
                const lastSelected = localStorage.getItem('selectedDeliveryAddress');
                if (lastSelected) {
                    try {
                        const parsed = JSON.parse(lastSelected);
                        // Match by ID, Exact Object String, or Legacy String property
                        const match = addresses.find(a =>
                            (a.id && parsed.id && a.id === parsed.id) ||
                            (JSON.stringify(a) === lastSelected) ||
                            (typeof a === 'string' && a === parsed.address)
                        );

                        // Robust ID determination
                        if (match) {
                            setSelectedAddressId(match.id !== undefined ? match.id : addresses.indexOf(match));
                        } else {
                            setSelectedAddressId(addresses[0].id !== undefined ? addresses[0].id : 0);
                        }
                    } catch (e) {
                        setSelectedAddressId(addresses[0].id !== undefined ? addresses[0].id : 0);
                    }
                } else {
                    setSelectedAddressId(addresses[0].id !== undefined ? addresses[0].id : 0);
                }
            }

            // Load Cart & Enrich
            const storedCart = JSON.parse(localStorage.getItem(`cart_${storedUser?.email}`)) || [];
            const enrichedItems = storedCart.map(item => {
                const product = products.find(p => p.id === item.id);
                // Ensure numeric values and normalize quantity (Cart uses 'qty')
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
        };

        loadIds();

        window.addEventListener('deliveryAddressUpdated', loadIds);
        window.addEventListener('userUpdated', loadIds);
        window.addEventListener('storage', loadIds);

        return () => {
            window.removeEventListener('deliveryAddressUpdated', loadIds);
            window.removeEventListener('userUpdated', loadIds);
            window.removeEventListener('storage', loadIds);
        };
    }, [navigate]);

    const handleAddAddress = (newAddress) => {
        const addressWithId = { ...newAddress, id: Date.now() };
        const updatedAddresses = [...savedAddresses, addressWithId];
        setSavedAddresses(updatedAddresses);

        // Update user in local storage
        if (currentUser) {
            const updatedUser = { ...currentUser, addresses: updatedAddresses };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);
        }

        setSelectedAddressId(addressWithId.id);

        // Auto-select globally
        localStorage.setItem('selectedDeliveryAddress', JSON.stringify(addressWithId));
        window.dispatchEvent(new Event('deliveryAddressUpdated'));

        setIsAddressModalOpen(false);
    };

    const handleAddressSelect = (addr) => {
        // Use ID if available, otherwise find index in current list (risky but fallback)
        const id = addr.id !== undefined ? addr.id : savedAddresses.indexOf(addr);
        setSelectedAddressId(id);
        localStorage.setItem('selectedDeliveryAddress', JSON.stringify(addr));
        window.dispatchEvent(new Event('deliveryAddressUpdated'));
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
                            // Normalize Data
                            const isObject = typeof addr === 'object' && addr !== null;
                            const name = isObject ? addr.name : currentUser?.name;
                            const mobile = isObject ? addr.mobile : (currentUser?.phone || currentUser?.mobile);
                            const addressLine = isObject ? `${addr.address || ''}, ${addr.locality || ''}` : addr;
                            const cityState = isObject ? `${addr.city || ''}, ${addr.state || ''} - ${addr.pincode || ''}` : '';
                            const type = isObject ? addr.addressType : 'HOME';
                            const id = (isObject && addr.id !== undefined) ? addr.id : index; // Robust Fallback ID

                            return (
                                <div
                                    key={id}
                                    className={`address-card ${selectedAddressId === id ? 'selected' : ''}`}
                                    onClick={() => handleAddressSelect(isObject ? addr : { ...currentUser, address: addr, id })}
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

                    <button className="place-order-btn" onClick={handlePlaceOrder}>
                        Make Payment
                    </button>
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
