
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import AccountGuest from './AccountGuest';
import ordersData from '../data/orders.json';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');

    useEffect(() => {
        if (isAuthenticated) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if (user) {
                // If user has no orders in local storage, check the JSON file
                if (!user.orders || user.orders.length === 0) {
                    const demoOrders = ordersData[user.id];

                    if (demoOrders) {
                        // Merge or set demo orders
                        // Note: We might want to persist this so it feels permanent, 
                        // or just show it ephemerally. I'll persist it for consistency with "backend" simulation.
                        const updatedOrders = [...(user.orders || []), ...demoOrders];

                        // Avoid duplicates if any share ID (though unlikely with this logic)
                        const uniqueOrders = Array.from(new Map(updatedOrders.map(item => [item.id, item])).values());

                        user.orders = uniqueOrders;
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        setOrders(uniqueOrders);
                    } else {
                        setOrders([]);
                    }
                } else {
                    setOrders(user.orders);
                }
            }
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your orders." />;
    }

    // Flatten logic: Create an array of individual items with their order context
    const getAllItems = (orderList) => {
        return orderList.flatMap(order =>
            order.items.map((item, idx) => ({
                ...item,
                orderId: order.id,
                originalIndex: idx, // Capture original index within the order
                orderDate: order.date,
                status: order.status,
                deliveryDate: order.deliveryDate,
                total: order.total
            }))
        );
    };

    const allItems = getAllItems(orders);
    const inTransitItems = allItems.filter(item => item.status !== 'Delivered');
    const historyItems = allItems.filter(item => item.status === 'Delivered');

    const renderItemCard = (item, index) => (
        // Use item.id if available, otherwise fallback to its original index within the order
        <Link key={`${item.orderId}-${index}`} to={`/order-details/${item.orderId}/${item.id || item.originalIndex}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="order-item-card" style={{
                backgroundColor: '#fff',
                borderRadius: '4px',
                marginBottom: '16px',
                padding: '16px',
                border: '1px solid #eaeaec',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease'
            }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
                {/* Header: Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                        height: '20px',
                        width: '20px',
                        borderRadius: '50%',
                        backgroundColor: item.status === 'Delivered' ? 'forestgreen' : '#ff9f00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '10px'
                    }}>
                        {item.status === 'Delivered' ? '✓' : '🚚'}
                    </span>
                    <div>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: item.status === 'Delivered' ? '#333' : '#ff9f00' }}>
                            {item.status}
                        </span>
                        <span style={{ fontSize: '12px', color: '#666', marginLeft: '6px' }}>
                            {item.status === 'Delivered' ? `On ${new Date(item.deliveryDate).toLocaleDateString()}` : `Arriving by ${item.deliveryDate}`}
                        </span>
                    </div>
                </div>

                {/* Body: Product Details */}
                <div style={{ display: 'flex', gap: '16px', backgroundColor: '#f9f9fa', padding: '12px', borderRadius: '4px' }}>
                    <img src={item.image} alt={item.title} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ fontWeight: '700', fontSize: '14px', color: '#282c3f', marginBottom: '4px' }}>Viridi Brand</div> {/* Mock Brand */}
                        <div style={{ fontSize: '14px', color: '#333', marginBottom: '4px', lineHeight: '1.4' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: '#94969f' }}>Size: {item.size}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', color: '#282c3f' }}>
                        ⟩
                    </div>
                </div>

                {/* Footer: Rating / Actions */}
                {item.status === 'Delivered' && (
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <span key={star} style={{ fontSize: '20px', color: star <= (item.rating || 0) ? 'gold' : '#ddd', cursor: 'pointer' }}>
                                {star <= (item.rating || 0) ? '★' : '☆'}
                            </span>
                        ))}
                        <span style={{ fontSize: '12px', color: item.rating ? '#282c3f' : 'forestgreen', alignSelf: 'center', marginLeft: '10px', fontWeight: '600', cursor: 'pointer' }}>
                            {item.rating ? 'Rated' : 'Rate & Review'}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );

    return (
        <div className="account-page-container" style={{ maxWidth: '980px', margin: '0 auto', padding: '20px' }}>
            {/* Search and Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#282c3f', margin: 0 }}>All orders</h1>
                    <span style={{ fontSize: '13px', color: '#282c3f' }}>from anytime</span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search in orders"
                        style={{
                            padding: '10px 16px',
                            border: '1px solid #d4d5d9',
                            borderRadius: '4px',
                            fontSize: '14px',
                            width: '280px',
                            backgroundColor: '#fff'
                        }}
                    />
                    <button style={{
                        padding: '10px 20px',
                        border: '1px solid #d4d5d9',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer'
                    }}>
                        FILTER
                    </button>
                </div>
            </div>

            <div className="account-content">
                {/* Current Orders Section (if any) */}
                {inTransitItems.length > 0 && (
                    <div style={{ marginBottom: '30px' }}>
                        {/* Optional Header for clarity, though reference image merges them. Keeping separation for logic utility. */}
                        {inTransitItems.map((item, index) => renderItemCard(item, index))}
                    </div>
                )}

                {/* Past Orders Section */}
                {historyItems.length > 0 && (
                    <div>
                        {historyItems.map((item, index) => renderItemCard(item, index))}
                    </div>
                )}

                {allItems.length === 0 && (
                    <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
                        <h3>No orders found</h3>
                        <p>Check out our latest collection!</p>
                        <Link to="/">
                            <button className="primary-btn" style={{ marginTop: '10px' }}>Start Shopping</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
