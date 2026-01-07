import React from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';

const GiftCards = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');
    const [currentUser, setCurrentUser] = React.useState(
        isAuthenticated ? JSON.parse(localStorage.getItem('currentUser')) : null
    );
    const giftCards = currentUser?.giftCards || [];

    const totalBalance = giftCards
        .filter(card => card.isRedeemed)
        .reduce((sum, card) => sum + card.balance, 0);

    const sortedGiftCards = [...giftCards].sort((a, b) => {
        const isAUnredeemed = a.status === 'Active' && !a.isRedeemed;
        const isBUnredeemed = b.status === 'Active' && !b.isRedeemed;

        // 1. Unredeemed comes first
        if (isAUnredeemed && !isBUnredeemed) return -1;
        if (!isAUnredeemed && isBUnredeemed) return 1;

        // 2. Sort by expiry date (ascending - closest first)
        const dateA = new Date(a.expiry);
        const dateB = new Date(b.expiry);
        return dateA - dateB;
    });

    const [isBuyModalOpen, setIsBuyModalOpen] = React.useState(false);
    const [buyAmount, setBuyAmount] = React.useState('');
    const [visibleCodes, setVisibleCodes] = React.useState({});

    // Claim Modal State
    const [isClaimModalOpen, setIsClaimModalOpen] = React.useState(false);
    const [claimCode, setClaimCode] = React.useState('');

    const handleBuy = () => {
        const amount = parseFloat(buyAmount);
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        const newCard = {
            id: Date.now(),
            code: generateCode(),
            balance: amount,
            expiry: getExpiryDate(),
            status: 'Active',
            isRedeemed: false
        };

        const updatedUser = { ...currentUser, giftCards: [...giftCards, newCard] };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        setIsBuyModalOpen(false);
        setBuyAmount('');
        alert("Gift card purchased successfully!");
    };

    const handleClaim = () => {
        // Basic format check: VIRI-XXXX-XXXX
        const codePattern = /^VIRI-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        if (!codePattern.test(claimCode.toUpperCase())) {
            alert("Invalid code format. Expected: VIRI-XXXX-XXXX");
            return;
        }

        // Check if code already exists
        const exists = giftCards.some(c => c.code === claimCode.toUpperCase());
        if (exists) {
            alert("This card has already been added to your account.");
            return;
        }

        // Simulate fetching card details (random balance)
        const newCard = {
            id: Date.now(),
            code: claimCode.toUpperCase(),
            balance: Math.floor(Math.random() * 2000) + 500, // Random 500-2500
            expiry: getExpiryDate(),
            status: 'Active',
            isRedeemed: false
        };

        const updatedUser = { ...currentUser, giftCards: [...giftCards, newCard] };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        setIsClaimModalOpen(false);
        setClaimCode('');
        alert(`Card added successfully! Value: Rs. ${newCard.balance}`);
    };

    const handleRedeem = (cardId) => {
        let redeemedAmount = 0;
        const updatedCards = giftCards.map(card => {
            if (card.id === cardId) {
                redeemedAmount = card.balance;
                return { ...card, isRedeemed: true };
            }
            return card;
        });

        const newHistoryItem = {
            type: 'credit',
            amount: redeemedAmount,
            date: new Date().toISOString(),
            description: 'Gift Card Redeemed'
        };

        const updatedHistory = [newHistoryItem, ...(currentUser.creditHistory || [])];

        const updatedUser = {
            ...currentUser,
            giftCards: updatedCards,
            creditHistory: updatedHistory
        };

        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        alert("Gift card redeemed successfully! Amount added to balance.");
    };

    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'VIRI';
        for (let i = 0; i < 12; i++) {
            if (i % 4 === 0) code += '-';
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    const getExpiryDate = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const toggleVisibility = (id) => {
        setVisibleCodes(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        alert("Code copied to clipboard!");
    };

    const shareViaGmail = (card) => {
        const subject = "Here is a Viridi Gift Card for you!";
        const body = `Hi,\n\nI am sending you a Viridi Gift Card worth Rs. ${card.balance}.\n\nCode: ${card.code}\nExpiry: ${card.expiry}\n\nHappy Shopping!\n\nRedeem at Viridi Cervus.`;
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailLink, '_blank');
    };

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your gift cards." />;
    }

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Gift Cards</h1>
            <div className="account-content">
                <div className="info-card" style={{ maxWidth: '400px', background: 'linear-gradient(45deg, #11998e, #38ef7d)', color: 'white', border: 'none', marginBottom: '30px' }}>
                    <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '20px' }}>TOTAL BALANCE</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>Rs. {totalBalance.toFixed(2)}</div>
                    <div style={{ marginTop: '20px', fontSize: '12px' }}>Have a gift card? Redeem it at checkout.</div>
                </div>

                {giftCards.length > 0 ? (
                    <div>
                        <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#282c3f' }}>Your Gift Cards</h3>
                        <div className="card-grid">
                            {sortedGiftCards.map(card => {
                                const isVisible = visibleCodes[card.id];
                                return (
                                    <div key={card.id} className="info-card" style={{ opacity: card.status === 'Expired' ? 0.6 : 1, position: 'relative' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <span style={{ fontWeight: 'bold', color: '#282c3f' }}>Viridi Gift Card</span>
                                            <span style={{
                                                fontSize: '10px',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                backgroundColor: card.status === 'Active' ? (card.isRedeemed ? '#d1e7dd' : '#e5f7ee') : '#f0f0f0',
                                                color: card.status === 'Active' ? (card.isRedeemed ? '#0f5132' : 'forestgreen') : '#777',
                                                fontWeight: 'bold'
                                            }}>
                                                {card.status === 'Active' ? (card.isRedeemed ? 'REDEEMED' : 'ACTIVE') : card.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '16px', fontFamily: 'monospace', color: '#555', margin: '15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span>
                                                {isVisible ? card.code : `****-****-${card.code.slice(-4)}`}
                                            </span>
                                            <button
                                                onClick={() => toggleVisibility(card.id)}
                                                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}
                                                title={isVisible ? "Hide Code" : "Show Code"}
                                            >
                                                {isVisible ? '👁️' : '👁️‍🗨️'}
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '13px' }}>
                                            <div>
                                                <div style={{ color: '#7e818c', fontSize: '10px' }}>Balance</div>
                                                <div style={{ fontWeight: 'bold' }}>Rs. {card.balance}</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ color: '#7e818c', fontSize: '10px' }}>Expires</div>
                                                <div>{card.expiry}</div>
                                            </div>
                                        </div>
                                        {card.status === 'Active' && (
                                            <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px dashed #eee', display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    {!card.isRedeemed && (
                                                        <button onClick={() => handleRedeem(card.id)} style={{ fontSize: '12px', color: 'white', background: '#282c3f', border: 'none', cursor: 'pointer', fontWeight: 'bold', padding: '6px 12px', borderRadius: '4px' }}>REDEEM</button>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    {!card.isRedeemed && (
                                                        <>
                                                            <button onClick={() => copyToClipboard(card.code)} style={{ fontSize: '12px', color: 'forestgreen', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>COPY</button>
                                                            <button onClick={() => shareViaGmail(card)} style={{ fontSize: '12px', color: '#db4437', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>GMAIL</button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="empty-state" style={{ padding: '20px 0', textAlign: 'left' }}>
                        <p>No active gift cards found.</p>
                    </div>
                )}

                <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                    <button className="primary-btn" onClick={() => setIsBuyModalOpen(true)}>Buy Gift Card</button>
                    <button className="primary-btn" onClick={() => setIsClaimModalOpen(true)} style={{ backgroundColor: 'white', color: '#282c3f', border: '1px solid #d4d5d9' }}>Claim Gift Card</button>
                </div>
            </div>

            {isBuyModalOpen && (
                <div className="modal-overlay" onClick={() => setIsBuyModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h3>Buy Gift Card</h3>
                            <button className="close-btn" onClick={() => setIsBuyModalOpen(false)}>×</button>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>ENTER AMOUNT</label>
                            <input
                                type="number"
                                value={buyAmount}
                                onChange={(e) => setBuyAmount(e.target.value)}
                                placeholder="Enter amount (e.g. 1000)"
                                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
                            />
                            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {[500, 1000, 2000, 5000].map(amt => (
                                    <button
                                        key={amt}
                                        onClick={() => setBuyAmount(amt)}
                                        style={{ padding: '5px 10px', border: '1px solid #ddd', borderRadius: '15px', background: 'none', cursor: 'pointer', fontSize: '12px' }}
                                    >
                                        + {amt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            className="primary-btn"
                            onClick={handleBuy}
                            style={{ width: '100%', marginTop: '0' }}
                        >
                            PROCEED TO PAY
                        </button>
                    </div>
                </div>
            )}

            {isClaimModalOpen && (
                <div className="modal-overlay" onClick={() => setIsClaimModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h3>Claim Gift Card</h3>
                            <button className="close-btn" onClick={() => setIsClaimModalOpen(false)}>×</button>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>GIFT CARD CODE</label>
                            <input
                                type="text"
                                value={claimCode}
                                onChange={(e) => {
                                    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                                    if (val.length > 12) val = val.slice(0, 12);

                                    if (val.length > 8) {
                                        val = `${val.slice(0, 4)}-${val.slice(4, 8)}-${val.slice(8)}`;
                                    } else if (val.length > 4) {
                                        val = `${val.slice(0, 4)}-${val.slice(4)}`;
                                    }
                                    setClaimCode(val);
                                }}
                                placeholder="Enter 12-digit code (e.g. VIRI-XXXX-XXXX)"
                                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', textTransform: 'uppercase' }}
                            />
                            <p style={{ fontSize: '11px', color: '#777', marginTop: '5px' }}>
                                Valid format: VIRI-XXXX-XXXX
                            </p>
                        </div>
                        <button
                            className="primary-btn"
                            onClick={handleClaim}
                            style={{ width: '100%', marginTop: '0' }}
                        >
                            ADD TO ACCOUNT
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GiftCards;
