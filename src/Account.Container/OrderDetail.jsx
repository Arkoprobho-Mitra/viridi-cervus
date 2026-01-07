import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Account.css';

const OrderDetail = () => {
    const { orderId, productId } = useParams();
    const [orderItem, setOrderItem] = useState(null);
    const [fullOrder, setFullOrder] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setUserInfo(storedUser);
            if (storedUser.orders) {
                const order = storedUser.orders.find(o => o.id.toString() === orderId);
                if (order) {
                    setFullOrder(order);
                    const item = order.items.find((i, idx) =>
                        // Try to match by ID if available, else index
                        (i.id && i.id.toString() === productId) || (idx.toString() === productId)
                    );

                    // If item not found by ID (fallback for mock data without item.id), use productId as index
                    if (!item && order.items[productId]) {
                        setOrderItem(order.items[productId]);
                    } else {
                        setOrderItem(item);
                    }
                }
            }
        }
    }, [orderId, productId]);

    if (!orderItem || !fullOrder) return <div className="account-page-container">Loading details...</div>;

    const isDelivered = fullOrder.status === 'Delivered';

    // Mock recommendations for UI
    const recommendations = [
        { id: 1, title: 'Roadster', img: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1364628/2016/8/31/11472636737098-Roadster-Men-Blue-Regular-Fit-Printed-Casual-Shirt-6121472636736864-1.jpg', desc: 'Men Blue Regular Fit' },
        { id: 2, title: 'HRX', img: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1700944/2019/6/8/972c9498-3a37-4d5d-976c-4493b4d5c0021559989322791-HRX-by-Hrithik-Roshan-Men-Yellow-Printed-Round-Neck-T-Shirt--1.jpg', desc: 'Yellow Printed Tee' },
        { id: 3, title: 'Highlander', img: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2019/2/23/e804f86d-f495-468b-a5d6-0c644c322b7a1550901502476-1.jpg', desc: 'Slim Fit Jeans' },
        { id: 4, title: 'Wrogn', img: 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/7546645/2018/12/31/9485c219-c0ae-4322-9f32-15f163b983791546244675549-WROGN-Men-Grey-Slim-Fit-Solid-Chinos-7531546244674064-1.jpg', desc: 'Grey Chinos' },
    ];

    return (
        <div className="account-page-container" style={{ maxWidth: '980px', margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/orders" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#282c3f', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '18px' }}>←</span> Back to Orders
                </Link>
            </div>

            <div style={{ fontSize: '12px', color: '#94969f', marginBottom: '10px' }}>
                <Link to="/orders" style={{ textDecoration: 'none', color: '#94969f' }}>Orders</Link>
                <span style={{ margin: '0 5px' }}>/</span>
                <span>{fullOrder.status}</span>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

                {/* Main Content */}
                <div style={{ flex: 1 }}>

                    {/* Item Details Card */}
                    <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaec', borderRadius: '4px', padding: '15px', marginBottom: '20px', display: 'flex', gap: '15px' }}>
                        <img src={orderItem.image} alt={orderItem.title} style={{ width: '100px', height: '130px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '700', fontSize: '18px', color: '#282c3f', marginBottom: '5px' }}>Viridi Brand</div>
                            <div style={{ fontSize: '16px', color: '#535766', marginBottom: '5px' }}>{orderItem.title}</div>
                            <div style={{ fontSize: '14px', color: '#94969f', marginBottom: '10px' }}>Size: {orderItem.size}</div>

                            {/* Help Button */}
                            <Link to={`/help/${orderId}/${productId}`} style={{ textDecoration: 'none' }}>
                                <button style={{
                                    padding: '8px 16px',
                                    border: '1px solid #d4d5d9',
                                    backgroundColor: '#fff',
                                    color: '#ff3f6c',
                                    borderRadius: '4px',
                                    fontWeight: '600',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    marginTop: '5px'
                                }}>
                                    ? HELP WITH ORDER
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* Status Bar */}
                    <div style={{
                        backgroundColor: isDelivered ? '#00b852' : '#ff9f00',
                        color: '#fff',
                        padding: '15px 20px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '24px' }}>{isDelivered ? '✓' : '🚚'}</span>
                            <div>
                                <div style={{ fontWeight: '700', fontSize: '16px' }}>{fullOrder.status}</div>
                                <div style={{ fontSize: '12px', opacity: 0.9 }}>
                                    {isDelivered ? `On ${new Date(fullOrder.deliveryDate).toDateString()}` : `Arriving by ${fullOrder.deliveryDate}`}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rate Product */}
                    {isDelivered && (
                        <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaec', borderRadius: '4px', padding: '15px', marginBottom: '20px' }}>
                            <div style={{ fontWeight: '600', fontSize: '14px', color: '#282c3f', marginBottom: '10px' }}>
                                {orderItem.rating ? 'You rated this product' : 'Rate this product'}
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        style={{
                                            fontSize: '28px',
                                            color: (star <= (orderItem.rating || 0)) ? 'gold' : '#d4d5d9',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s'
                                        }}
                                        onClick={() => {
                                            const newRating = star;
                                            // Update local state
                                            const updatedItem = { ...orderItem, rating: newRating };
                                            setOrderItem(updatedItem);

                                            // Update full order and persist to localStorage
                                            const updatedFullOrder = { ...fullOrder };
                                            const updatedItemIndex = updatedFullOrder.items.findIndex(i => i.id === orderItem.id);

                                            if (updatedItemIndex > -1) {
                                                updatedFullOrder.items[updatedItemIndex] = updatedItem;
                                                setFullOrder(updatedFullOrder);

                                                // Persist to userInfo and localStorage
                                                const updatedUserInfo = { ...userInfo };
                                                const orderIndex = updatedUserInfo.orders.findIndex(o => o.id === fullOrder.id);
                                                if (orderIndex > -1) {
                                                    updatedUserInfo.orders[orderIndex] = updatedFullOrder;
                                                    setUserInfo(updatedUserInfo);
                                                    localStorage.setItem('currentUser', JSON.stringify(updatedUserInfo));
                                                }
                                            }
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!orderItem.rating) e.target.style.color = 'gold';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!orderItem.rating) e.target.style.color = '#d4d5d9';
                                        }}
                                    >
                                        {(star <= (orderItem.rating || 0)) ? '★' : '☆'}
                                    </span>
                                ))}
                            </div>

                            {/* Review Text Area */}
                            <div>
                                <textarea
                                    placeholder="Write your review here... (max 200 characters)"
                                    maxLength={200}
                                    value={orderItem.review || ''}
                                    style={{
                                        width: '100%',
                                        height: '80px',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #d4d5d9',
                                        fontSize: '14px',
                                        fontFamily: 'inherit',
                                        resize: 'none',
                                        marginBottom: '5px'
                                    }}
                                    onChange={(e) => {
                                        const newReview = e.target.value;
                                        setOrderItem({ ...orderItem, review: newReview });
                                    }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                                    <div style={{ fontSize: '12px', color: '#94969f' }}>
                                        {(orderItem.review || '').length} / 200
                                    </div>
                                    <button
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: 'forestgreen',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontWeight: '600',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            opacity: !orderItem.review ? 0.6 : 1
                                        }}
                                        disabled={!orderItem.review}
                                        onClick={() => {
                                            // Persist on button click
                                            const updatedFullOrder = { ...fullOrder };
                                            const updatedItemIndex = updatedFullOrder.items.findIndex(i => i.id === orderItem.id);

                                            if (updatedItemIndex > -1) {
                                                updatedFullOrder.items[updatedItemIndex].review = orderItem.review;
                                                setFullOrder(updatedFullOrder);

                                                const updatedUserInfo = { ...userInfo };
                                                const orderIndex = updatedUserInfo.orders.findIndex(o => o.id === fullOrder.id);
                                                if (orderIndex > -1) {
                                                    updatedUserInfo.orders[orderIndex] = updatedFullOrder;
                                                    setUserInfo(updatedUserInfo);
                                                    localStorage.setItem('currentUser', JSON.stringify(updatedUserInfo));
                                                    alert('Review Submitted Successfully!');
                                                }
                                            }
                                        }}
                                    >
                                        SUBMIT REVIEW
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Similar Items Slider (Mock) */}
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#282c3f', marginBottom: '10px' }}>Items that go well with this item</div>
                        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                            {recommendations.map(rec => (
                                <div key={rec.id} style={{ minWidth: '120px', border: '1px solid #eaeaec', borderRadius: '4px', padding: '10px', backgroundColor: '#fff' }}>
                                    <img src={rec.img} alt={rec.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
                                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{rec.title}</div>
                                    <div style={{ fontSize: '10px', color: '#777' }}>{rec.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Side Info (Optional / Breakdown) */}
                <div style={{ width: '320px' }}>
                    <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaec', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#282c3f', marginBottom: '15px' }}>Total Order Price</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '10px' }}>
                            <span style={{ color: '#535766' }}>Price</span>
                            <span style={{ fontWeight: '600', color: '#282c3f' }}>Rs. {orderItem.price || orderItem.originalPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '10px' }}>
                            <span style={{ color: '#535766' }}>Discount</span>
                            <span style={{ color: '#03a685' }}>- Rs. 0</span>
                        </div>
                        <div style={{ borderTop: '1px solid #eaeaec', margin: '10px 0' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 'bold' }}>
                            <span>Total paid</span>
                            <span>Rs. {orderItem.price || orderItem.originalPrice}</span>
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaec', borderRadius: '4px', padding: '20px' }}>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#282c3f', marginBottom: '10px' }}>Updates sent to</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#535766', marginBottom: '8px' }}>
                            <span>📞</span> {userInfo?.phone || userInfo?.mobile || 'N/A'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#535766' }}>
                            <span>✉️</span> {userInfo?.email || 'N/A'}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderDetail;
