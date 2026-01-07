import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Account.css';

const Help = () => {
    const { orderId, itemId } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [activeTab, setActiveTab] = useState('Order Related Queries');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [showDateDropdown, setShowDateDropdown] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser && storedUser.orders) {
            const order = storedUser.orders.find(o => o.id.toString() === orderId);
            if (order) {
                const foundItem = order.items.find((i, idx) =>
                    (i.id && i.id.toString() === itemId) || (idx.toString() === itemId)
                );
                // Fallback if accessed via index
                if (!foundItem && order.items[itemId]) {
                    setItem(order.items[itemId]);
                } else {
                    setItem(foundItem);
                }
            }
        }
    }, [orderId, itemId]);

    // specific data for non-order related
    const topicData = {
        'Offers': {
            description: "For Bank and wallet offers you can refer to the payment page. Instant cashback will be applied directly to the product or order value in your cart as per the eligibility criteria and the same is subject to recovery in case of return or cancellation.",
            linkText: "Link to Orders page >",
            linkPath: "/orders",
            faqs: [
                {
                    question: "What are the Current Bank Offers? Where can I find them?",
                    answer: "You can find the latest applicable bank offers on the product page under 'Best Offers' and also on the cart/checkout page before making a payment."
                },
                {
                    question: "What is Instant Cashback?",
                    answer: "Instant Cashback is a discount provided by Viridi Credit or partner banks that is applied immediately to your order total at the time of checkout."
                },
                {
                    question: "How does instant cashback recovery happen?",
                    answer: "If you return an item purchased with instant cashback, the cashback amount proportionally applied to that item will be deducted from your refund amount."
                }
            ]
        },
        'Payments': {
            description: "You can pay for your order using various modes of payment such as UPI, Credit/Debit Cards, Net Banking, Wallets, and COD.",
            faqs: [
                {
                    question: "My payment transaction failed but amount was deducted.",
                    answer: "If the amount was deducted for a failed transaction, it will be automatically refunded to your source account within 5-7 business days."
                },
                {
                    question: "How can I get a refund for a failed transaction?",
                    answer: "Refunds for failed transactions are initiated automatically by our system. You do not need to raise a separate request."
                },
                {
                    question: "What is COD (Cash on Delivery)?",
                    answer: "Cash on Delivery allows you to pay for your order in cash at the time of delivery. Please note that COD might not be available for all pin codes or order values."
                }
            ]
        },
        'Returns & Exchanges': {
            description: "We offer a convenient return and exchange policy. You can return or exchange items within the specified window from the date of delivery.",
            faqs: [
                {
                    question: "What is the return policy?",
                    answer: "You can return products within 30 days of delivery. The items must be unused, unwashed, and in their original packaging with tags intact."
                },
                {
                    question: "How do I place an exchange request?",
                    answer: "Go to 'Orders', select the item you wish to exchange, click on 'Exchange', select the reason and the new size you want, and submit your request."
                },
                {
                    question: "When will the pickup happen?",
                    answer: "Our courier partner will pick up the item within 2-3 business days after your return/exchange request is approved."
                }
            ]
        },
        'Cancellations & Charges': {
            description: "You can cancel your order anytime before it is packed for shipping. Cancellation charges may apply in certain cases.",
            faqs: [
                {
                    question: "How do I cancel my order?",
                    answer: "Navigate to 'Orders', select the order you want to cancel, and click the 'Cancel' button. Note that cancellation is only possible before the item is shipped."
                },
                {
                    question: "What are the cancellation charges?",
                    answer: "There are typically no charges if you cancel before the order is packed. If cancelled later, a nominal fee may be deducted from your refund."
                },
                {
                    question: "Can I modify my order after placing it?",
                    answer: "Unfortunately, we cannot modify an order (e.g., change size or color) once it is placed. You can cancel the existing order and place a new one."
                }
            ]
        }
    };

    // Fallback data for general FAQs tab
    const generalFaqs = [
        {
            question: "How can I cancel my order?",
            answer: "You can cancel your order from the 'Orders' section by selecting the order and clicking 'Cancel', provided it hasn't been shipped yet."
        },
        {
            question: "When will I receive my refund?",
            answer: "Refunds are processed within 5-7 business days after the returned item reaches our warehouse and passes quality checks."
        },
        {
            question: "What are the shipping charges?",
            answer: "Shipping is free for all orders above $50. For orders below this amount, a flat shipping fee of $5 applies."
        }
    ];

    const handleTopicClick = (topic) => {
        if (topic === 'Account') {
            navigate('/account');
        } else if (topic === 'Viridi Credit') {
            navigate('/viridi-credit');
        } else {
            setSelectedTopic(topic);
        }
    };

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    const handleDateChange = (range) => {
        setDateRange(range);
        setShowDateDropdown(false);
    };

    // Reset expansion when tabs or topics change
    useEffect(() => {
        setExpandedFaq(null);
    }, [activeTab, selectedTopic]);

    if (!item) return <div className="account-page-container">Loading help options...</div>;

    const sidebarOptions = [
        'Order Related Queries',
        'Non-order Related Issues',
        'Recent Issues',
        'Frequently Asked Questions'
    ];

    const queries = [
        'Where is my order?',
        'Report bad delivery agent behaviour',
        'I want to return/exchange the item.',
        'I am unable to place an return/exchange request.',
        'I have a billing issue',
        'Different item received'
    ];

    // Topics list for horizontal nav and grid
    const browsableTopics = ['Account', 'Returns & Exchanges', 'Viridi Credit', 'Offers', 'Payments', 'Cancellations & Charges'];


    return (
        <div className="account-page-container" style={{ maxWidth: '1000px', margin: '40px auto' }}>

            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontFamily: '"Playfair Display", serif', color: '#282c3f', fontWeight: '700', margin: '0 0 10px', letterSpacing: '2px' }}>HELP CENTER</h1>
                <div style={{ color: '#1f2022ff', fontSize: '14px' }}>We are here to help you</div>
            </div>

            <div style={{ display: 'flex', border: '1px solid #eaeaec', backgroundColor: '#fff', minHeight: '500px' }}>

                {/* Sidebar */}
                <div style={{ width: '250px', borderRight: '1px solid #eaeaec', backgroundColor: '#f9f9fa' }}>
                    <div style={{ padding: '20px', fontSize: '14px', fontFamily: '"Playfair Display", serif', fontWeight: '700', color: '#1f2022ff', letterSpacing: '1.5px' }}>
                        SELECT QUERY TYPE
                    </div>
                    {sidebarOptions.map(option => (
                        <div
                            key={option}
                            onClick={() => {
                                setActiveTab(option);
                                setSelectedTopic(null); // Reset detail view on tab switch
                            }}
                            style={{
                                padding: '15px 20px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                backgroundColor: activeTab === option ? '#fff' : 'transparent',
                                borderLeft: activeTab === option ? '4px solid forestgreen' : '4px solid transparent',
                                color: activeTab === option ? '#282c3f' : '#696e79',
                                fontWeight: activeTab === option ? '600' : '400',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            {option}
                            {activeTab === option && <span style={{ color: 'forestgreen' }}>›</span>}
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, padding: '30px' }}>
                    {activeTab === 'Order Related Queries' && (
                        <>
                            {/* Item Context Card */}
                            <Link to={`/order-details/${orderId}/${itemId}`} style={{ textDecoration: 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', padding: '15px', backgroundColor: '#fff', border: '1px solid #eaeaec', borderRadius: '4px', marginBottom: '30px', cursor: 'pointer' }}>
                                    <img src={item.image} alt={item.title} style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }} />
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#282c3f' }}>Viridi Brand</div>
                                        <div style={{ fontSize: '13px', color: '#696e79', marginBottom: '4px' }}>{item.title}</div>
                                        <div style={{ fontSize: '12px', color: '#94969f' }}>Size: {item.size}</div>
                                    </div>
                                    <div style={{ marginLeft: 'auto', color: '#94969f' }}>›</div>
                                </div>
                            </Link>
                            <div style={{ borderTop: '1px solid #eaeaec' }}>
                                {queries.map((query, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            padding: '20px 0',
                                            borderBottom: '1px solid #eaeaec',
                                            textDecoration: 'none',
                                            color: '#282c3f',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}
                                        onClick={() => alert(`Redirecting to support for: ${query}`)}
                                    >
                                        {query}
                                        <span style={{ color: '#94969f' }}>›</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'Recent Issues' && (
                        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
                            <div style={{ fontSize: '14px', color: '#535766', marginBottom: '50px', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                                <span>Queries from <strong>{dateRange}</strong></span>
                                <div style={{ position: 'relative' }}>
                                    <span
                                        style={{ color: 'forestgreen', fontWeight: 'bold', cursor: 'pointer' }}
                                        onClick={() => setShowDateDropdown(!showDateDropdown)}
                                    >
                                        CHANGE {showDateDropdown ? '▲' : '▼'}
                                    </span>
                                    {showDateDropdown && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            right: 0,
                                            backgroundColor: '#fff',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            borderRadius: '4px',
                                            zIndex: 10,
                                            minWidth: '150px',
                                            border: '1px solid #eaeaec',
                                            textAlign: 'left'
                                        }}>
                                            {['Last 30 Days', 'Last 90 Days', 'Last 180 Days', 'Last 1 Year'].map(option => (
                                                <div
                                                    key={option}
                                                    onClick={() => handleDateChange(option)}
                                                    style={{
                                                        padding: '10px 15px',
                                                        fontSize: '13px',
                                                        color: '#282c3f',
                                                        cursor: 'pointer',
                                                        borderBottom: '1px solid #f0f0f0',
                                                        backgroundColor: dateRange === option ? '#f9f9fa' : '#fff',
                                                        fontWeight: dateRange === option ? '600' : '400'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f4f4f5'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = dateRange === option ? '#f9f9fa' : '#fff'}
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <img
                                src="/images/profile_placeholder.png"
                                alt="No queries"
                                style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 20px', display: 'block', objectFit: 'cover' }}
                            />
                            <div style={{ fontWeight: '600', fontSize: '16px', color: '#282c3f', marginBottom: '10px' }}>No queries found</div>
                            <div style={{ fontSize: '14px', color: '#696e79', marginBottom: '30px' }}>
                                There were no queries raised<br />in <strong>{dateRange}</strong>
                            </div>

                        </div>
                    )}

                    {activeTab === 'Non-order Related Issues' && (
                        <div>
                            {!selectedTopic ? (
                                <>
                                    <div style={{ fontFamily: '"Playfair Display", serif', fontWeight: '700', fontSize: '20px', color: '#282c3f', marginBottom: '20px' }}>Browse Topics</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '40px' }}>
                                        {browsableTopics.map(topic => (
                                            <div
                                                key={topic}
                                                onClick={() => handleTopicClick(topic)}
                                                className="topic-item"
                                            >
                                                <span style={{ color: '#696e79' }}>📄</span> {topic}
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ borderTop: '1px solid #eaeaec' }}>
                                        {generalFaqs.map((faq, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    padding: '20px 0',
                                                    borderBottom: '1px solid #eaeaec',
                                                    color: '#282c3f',
                                                    fontSize: '14px',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => toggleFaq(idx)}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    {faq.question}
                                                    <span style={{ color: '#94969f' }}>{expandedFaq === idx ? '∧' : '∨'}</span>
                                                </div>
                                                {expandedFaq === idx && (
                                                    <div style={{ marginTop: '10px', color: '#696e79', fontSize: '13px', lineHeight: '1.5' }}>
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                // Detailed View Logic
                                <div>
                                    {/* Horizontal Nav */}
                                    <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #eaeaec', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
                                        {browsableTopics.filter(t => !['Account', 'Viridi Credit'].includes(t)).map(topic => (
                                            <div
                                                key={topic}
                                                onClick={() => handleTopicClick(topic)}
                                                style={{
                                                    cursor: 'pointer',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    color: selectedTopic === topic ? 'forestgreen' : '#282c3f',
                                                    paddingBottom: '5px',
                                                    borderBottom: selectedTopic === topic ? '2px solid forestgreen' : 'none',
                                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px'
                                                }}
                                            >
                                                <div style={{
                                                    width: '40px', height: '40px', borderRadius: '50%', backgroundColor: selectedTopic === topic ? '#fff' : '#f4f4f5',
                                                    border: selectedTopic === topic ? '2px solid forestgreen' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}>📄</div>
                                                {topic}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Topic Content */}
                                    {topicData[selectedTopic] && (
                                        <div style={{ animation: 'fadeIn 0.3s' }}>
                                            <div style={{ border: '1px solid #eaeaec', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
                                                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '10px' }}>{selectedTopic}</div>
                                                <div style={{ fontSize: '13px', color: '#696e79', lineHeight: '1.6' }}>
                                                    {topicData[selectedTopic].description}
                                                    {topicData[selectedTopic].linkText && (
                                                        <div style={{ marginTop: '10px' }}>
                                                            <Link to={topicData[selectedTopic].linkPath} style={{ color: 'forestgreen', textDecoration: 'none', fontWeight: '600' }}>
                                                                {topicData[selectedTopic].linkText}
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: '700', marginBottom: '15px', color: '#282c3f' }}>Top Queries</div>
                                            <div>
                                                {topicData[selectedTopic].faqs.map((faq, idx) => (
                                                    <div key={idx}
                                                        style={{
                                                            border: '1px solid #eaeaec', borderRadius: '4px', padding: '15px', marginBottom: '10px',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => toggleFaq(idx)}
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span>{faq.question}</span>
                                                            <span style={{ color: '#94969f' }}>{expandedFaq === idx ? '∧' : '∨'}</span>
                                                        </div>
                                                        {expandedFaq === idx && (
                                                            <div style={{ marginTop: '10px', color: '#696e79', fontSize: '13px', lineHeight: '1.5', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
                                                                {faq.answer}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'Frequently Asked Questions' && (
                        <div>
                            <div style={{ borderTop: '1px solid #eaeaec' }}>
                                {generalFaqs.map((faq, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            padding: '20px 0',
                                            borderBottom: '1px solid #eaeaec',
                                            color: '#282c3f',
                                            fontSize: '14px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => toggleFaq(idx)}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {faq.question}
                                            <span style={{ color: '#94969f' }}>{expandedFaq === idx ? '∧' : '∨'}</span>
                                        </div>
                                        {expandedFaq === idx && (
                                            <div style={{ marginTop: '10px', color: '#696e79', fontSize: '13px', lineHeight: '1.5' }}>
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Help;
