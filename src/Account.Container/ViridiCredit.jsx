import React from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';

const ViridiCredit = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');
    const [currentUser, setCurrentUser] = React.useState(
        isAuthenticated ? JSON.parse(localStorage.getItem('currentUser')) : null
    );

    const [isTopUpModalOpen, setIsTopUpModalOpen] = React.useState(false);
    const [topUpAmount, setTopUpAmount] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('UPI');

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your Viridi Credit." />;
    }

    const giftCards = currentUser?.giftCards || [];
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

        const updatedUser = {
            ...currentUser,
            walletBalance: (currentUser.walletBalance || 0) + amount
        };

        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        setIsTopUpModalOpen(false);
        setTopUpAmount('');
        alert(`Successfully added Rs. ${amount} via ${paymentMethod}!`);
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
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h3>Top Up Wallet</h3>
                            <button className="close-btn" onClick={() => setIsTopUpModalOpen(false)}>×</button>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>ENTER AMOUNT</label>
                            <input
                                type="number"
                                value={topUpAmount}
                                onChange={(e) => setTopUpAmount(e.target.value)}
                                placeholder="e.g. 500"
                                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', marginBottom: '20px' }}
                            />

                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '12px', fontWeight: 'bold', color: '#555' }}>PAYMENT METHOD</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {['UPI', 'Credit Card', 'Debit Card'].map(method => (
                                    <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            checked={paymentMethod === method}
                                            onChange={() => setPaymentMethod(method)}
                                        />
                                        {method}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button
                            className="primary-btn"
                            onClick={handleTopUp}
                            style={{ width: '100%', marginTop: '0' }}
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
