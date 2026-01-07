import React from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';

const PremiumSelect = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Find label for selected value
    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

    return (
        <div style={{ position: 'relative' }}>
            <div
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: isOpen ? '2px solid forestgreen' : '1px solid #e0e0e0',
                    borderRadius: '12px',
                    background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: value ? '#333' : '#888',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                }}
            >
                <span>{selectedLabel}</span>
                <span style={{ fontSize: '12px', color: '#555', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
            </div>

            {isOpen && (
                <div
                    className="custom-scrollbar"
                    style={{
                        position: 'absolute',
                        top: '110%',
                        left: 0,
                        width: '100%',
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                        zIndex: 100,
                        overflow: 'hidden',
                        border: '1px solid #f0f0f0',
                        maxHeight: '150px',
                        overflowY: 'auto'
                    }}>
                    <style>
                        {`
                            .custom-scrollbar::-webkit-scrollbar {
                                width: 4px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                                background: #f1f1f1;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: #c1c1c1;
                                border-radius: 4px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: #a8a8a8;
                            }
                            
                            /* Hide scrollbar for the main modal content but keep functionality */
                            .no-scrollbar {
                                -ms-overflow-style: none;  /* IE and Edge */
                                scrollbar-width: none;  /* Firefox */
                            }
                            .no-scrollbar::-webkit-scrollbar {
                                display: none;
                            }
                        `}
                    </style>
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            onClick={(e) => { e.stopPropagation(); onChange(opt.value); setIsOpen(false); }}
                            className="dropdown-item"
                            style={{
                                padding: '14px 20px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #f9f9f9',
                                color: '#333',
                                fontSize: '14px',
                                background: value === opt.value ? '#f0fdf4' : 'white',
                                fontWeight: value === opt.value ? '600' : 'normal',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => { if (value !== opt.value) e.currentTarget.style.background = '#fcfcfc'; }}
                            onMouseLeave={(e) => { if (value !== opt.value) e.currentTarget.style.background = 'white'; }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ViridiCredit = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');
    const [currentUser, setCurrentUser] = React.useState(
        isAuthenticated ? JSON.parse(localStorage.getItem('currentUser')) : null
    );

    const [isTopUpModalOpen, setIsTopUpModalOpen] = React.useState(false);
    const [topUpAmount, setTopUpAmount] = React.useState('');

    // Payment State
    const [paymentCategory, setPaymentCategory] = React.useState(''); // 'UPI', 'CARD', 'NETBANKING'
    const [selectedOption, setSelectedOption] = React.useState(''); // Specific app/bank/cardId
    const [newCard, setNewCard] = React.useState({ number: '', holder: '', expiry: '', cvv: '' });

    const UPI_APPS = ['Amazon Pay', 'Google Pay', 'PhonePe', 'Paytm'];
    const BANKS = ['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank'];

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your Viridi Credit." />;
    }

    const giftCards = currentUser?.giftCards || [];
    const savedCards = currentUser?.savedCards || [];

    const giftCardBalance = giftCards
        .filter(card => card.isRedeemed)
        .reduce((sum, card) => sum + card.balance, 0);

    const walletBalance = currentUser?.walletBalance || 0;
    const totalBalance = giftCardBalance + walletBalance;

    const handleTopUp = () => {
        const amount = parseFloat(topUpAmount);
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        if (!paymentCategory) {
            alert("Please select a payment method");
            return;
        }

        if (!selectedOption) {
            alert("Please select a specific payment option");
            return;
        }

        let updatedUser = { ...currentUser };

        // Handle New Card Saving
        if (paymentCategory === 'CARD' && selectedOption === 'NEW_CARD') {
            if (!newCard.number || !newCard.holder || !newCard.expiry || !newCard.cvv) {
                alert("Please enter all card details");
                return;
            }

            const cardData = {
                id: Date.now(),
                bank: 'New Bank', // Simplified
                type: 'Credit Card', // Simplified default
                number: newCard.number,
                holder: newCard.holder,
                expiry: newCard.expiry
            };

            const newSavedCards = [...(updatedUser.savedCards || []), cardData];
            updatedUser.savedCards = newSavedCards;
        }

        // Update Balance
        updatedUser.walletBalance = (updatedUser.walletBalance || 0) + amount;

        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        setIsTopUpModalOpen(false);
        setTopUpAmount('');
        setPaymentCategory('');
        setSelectedOption('');
        setNewCard({ number: '', holder: '', expiry: '', cvv: '' });

        alert(`Successfully added Rs. ${amount}!`);
    };

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Viridi Credit</h1>
            <div className="account-content empty-state">
                <div style={{ fontSize: '48px', color: 'forestgreen', marginBottom: '10px' }}>Rs. {totalBalance.toFixed(2)}</div>
                <h3>Your Credit Balance</h3>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    Includes Rs. {giftCardBalance} from Gift Cards and Rs. {walletBalance} from Top-ups.
                </p>

                <button className="primary-btn" onClick={() => setIsTopUpModalOpen(true)}>+ TOP UP CREDIT</button>
            </div>

            {isTopUpModalOpen && (
                <div className="modal-overlay" onClick={() => setIsTopUpModalOpen(false)}>
                    <div className="modal-content no-scrollbar" onClick={(e) => e.stopPropagation()} style={{
                        maxWidth: '850px',
                        width: '90%',
                        height: '540px',
                        overflowY: 'auto',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div className="modal-header" style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '15px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>Top Up Wallet</h3>
                            <button className="close-btn" style={{ fontSize: '24px', color: '#999', top: '20px', right: '20px' }} onClick={() => setIsTopUpModalOpen(false)}>×</button>
                        </div>

                        <div style={{ display: 'flex', gap: '25px', marginBottom: '10px' }}>
                            {/* Left Column: Amount */}
                            <div style={{ flex: '0 0 35%' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: '700', color: '#888', letterSpacing: '1px' }}>ENTER AMOUNT</label>
                                <div style={{ position: 'relative', marginBottom: '20px' }}>
                                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#333', fontWeight: '600' }}>₹</span>
                                    <input
                                        type="number"
                                        value={topUpAmount}
                                        onChange={(e) => setTopUpAmount(e.target.value)}
                                        placeholder="500"
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px 10px 30px',
                                            border: '2px solid #eaeaec',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                            color: '#333',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'forestgreen'}
                                        onBlur={(e) => e.target.style.borderColor = '#eaeaec'}
                                    />
                                </div>

                                <div style={{ background: '#f9f9fa', padding: '15px', borderRadius: '12px', border: '1px solid #eaeaec' }}>
                                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', fontWeight: '600' }}>Current Balance</div>
                                    <div style={{ fontSize: '18px', color: 'forestgreen', fontWeight: '700' }}>Rs. {walletBalance}</div>
                                </div>
                            </div>

                            {/* Right Column: Payment Method */}
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: '700', color: '#888', letterSpacing: '1px' }}>PAYMENT METHOD</label>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {/* UPI Option */}
                                    <div
                                        onClick={() => { setPaymentCategory('UPI'); setSelectedOption(''); }}
                                        style={{
                                            border: paymentCategory === 'UPI' ? '2px solid forestgreen' : '2px solid #f5f5f7',
                                            borderRadius: '10px',
                                            padding: '12px',
                                            cursor: 'pointer',
                                            background: paymentCategory === 'UPI' ? '#f0fdf4' : 'white',
                                            transition: 'all 0.2s',
                                            boxShadow: paymentCategory === 'UPI' ? '0 8px 20px rgba(40, 167, 69, 0.15)' : 'none'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #d1d1d1',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                borderColor: paymentCategory === 'UPI' ? 'forestgreen' : '#d1d1d1',
                                                background: 'white'
                                            }}>
                                                {paymentCategory === 'UPI' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'forestgreen' }}></div>}
                                            </div>
                                            <span style={{ fontWeight: '700', color: '#282c3f', fontSize: '14px' }}>UPI Apps</span>
                                        </div>

                                        {paymentCategory === 'UPI' && (
                                            <div style={{ marginTop: '12px', paddingLeft: '30px' }}>
                                                <PremiumSelect
                                                    options={UPI_APPS.map(app => ({ label: app, value: app }))}
                                                    value={selectedOption}
                                                    onChange={setSelectedOption}
                                                    placeholder="Select UPI App"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Option */}
                                    <div
                                        onClick={() => { setPaymentCategory('CARD'); setSelectedOption(''); }}
                                        style={{
                                            border: paymentCategory === 'CARD' ? '2px solid forestgreen' : '2px solid #f5f5f7',
                                            borderRadius: '10px',
                                            padding: '12px',
                                            cursor: 'pointer',
                                            background: paymentCategory === 'CARD' ? '#f0fdf4' : 'white',
                                            transition: 'all 0.2s',
                                            boxShadow: paymentCategory === 'CARD' ? '0 8px 20px rgba(40, 167, 69, 0.15)' : 'none'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #d1d1d1',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                borderColor: paymentCategory === 'CARD' ? 'forestgreen' : '#d1d1d1',
                                                background: 'white'
                                            }}>
                                                {paymentCategory === 'CARD' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'forestgreen' }}></div>}
                                            </div>
                                            <span style={{ fontWeight: '700', color: '#282c3f', fontSize: '14px' }}>Credit / Debit Card</span>
                                        </div>

                                        {paymentCategory === 'CARD' && (
                                            <div style={{ marginTop: '12px', paddingLeft: '30px' }} onClick={(e) => e.stopPropagation()}>
                                                <div style={{ position: 'relative', marginBottom: '12px' }}>
                                                    <PremiumSelect
                                                        options={[
                                                            ...savedCards.map(card => ({
                                                                label: `${card.bank} - ${card.number.slice(-4)} ${card.type ? `(${card.type})` : ''}`,
                                                                value: card.id
                                                            })),
                                                            { label: '+ Add New Card', value: 'NEW_CARD' }
                                                        ]}
                                                        value={selectedOption}
                                                        onChange={setSelectedOption}
                                                        placeholder="Select Card"
                                                    />
                                                </div>

                                                {selectedOption === 'NEW_CARD' && (
                                                    <div style={{ background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #eaeaec', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                                                        <input
                                                            type="text"
                                                            placeholder="Card Number"
                                                            value={newCard.number}
                                                            onChange={e => setNewCard({ ...newCard, number: e.target.value })}
                                                            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#fdfdfd' }}
                                                        />
                                                        <div style={{ display: 'flex', gap: '10px' }}>
                                                            <input
                                                                type="text"
                                                                placeholder="MM/YY"
                                                                value={newCard.expiry}
                                                                onChange={e => setNewCard({ ...newCard, expiry: e.target.value })}
                                                                style={{ flex: 1, padding: '10px', marginBottom: '10px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#fdfdfd' }}
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="CVV"
                                                                value={newCard.cvv}
                                                                onChange={e => setNewCard({ ...newCard, cvv: e.target.value })}
                                                                style={{ width: '80px', padding: '10px', marginBottom: '10px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#fdfdfd' }}
                                                            />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="Name on Card"
                                                            value={newCard.holder}
                                                            onChange={e => setNewCard({ ...newCard, holder: e.target.value })}
                                                            style={{ width: '100%', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#fdfdfd' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Net Banking Option */}
                                    <div
                                        onClick={() => { setPaymentCategory('NETBANKING'); setSelectedOption(''); }}
                                        style={{
                                            border: paymentCategory === 'NETBANKING' ? '2px solid forestgreen' : '2px solid #f5f5f7',
                                            borderRadius: '10px',
                                            padding: '12px',
                                            cursor: 'pointer',
                                            background: paymentCategory === 'NETBANKING' ? '#f0fdf4' : 'white',
                                            transition: 'all 0.2s',
                                            boxShadow: paymentCategory === 'NETBANKING' ? '0 8px 20px rgba(40, 167, 69, 0.15)' : 'none'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #d1d1d1',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                borderColor: paymentCategory === 'NETBANKING' ? 'forestgreen' : '#d1d1d1',
                                                background: 'white'
                                            }}>
                                                {paymentCategory === 'NETBANKING' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'forestgreen' }}></div>}
                                            </div>
                                            <span style={{ fontWeight: '700', color: '#282c3f', fontSize: '14px' }}>Net Banking</span>
                                        </div>

                                        {paymentCategory === 'NETBANKING' && (
                                            <div style={{ marginTop: '12px', paddingLeft: '30px' }}>
                                                <PremiumSelect
                                                    options={BANKS.map(bank => ({ label: bank, value: bank }))}
                                                    value={selectedOption}
                                                    onChange={setSelectedOption}
                                                    placeholder="Select Bank"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            className="primary-btn"
                            onClick={handleTopUp}
                            style={{ width: '100%', marginTop: 'auto', marginBottom: '0', justifyContent: 'center' }}
                        >
                            PROCEED TO PAY
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViridiCredit;
