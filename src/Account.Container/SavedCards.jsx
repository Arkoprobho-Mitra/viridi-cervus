import React from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';
import { useCards } from '../contexts/CardContext';
import { getCardProvider, validateCardNumber } from '../utils/cardUtils';

const SavedCards = () => {
    const { cards, addCard, deleteCard, isAuthenticated } = useCards();
    const [isAdding, setIsAdding] = React.useState(false);
    const [newCard, setNewCard] = React.useState({ bank: '', number: '', holder: '', expiry: '', type: 'Visa' });

    const handleNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        const provider = getCardProvider(value);
        value = value.replace(/(.{4})/g, '$1 ').trim();
        if (value.length <= 19) {
            setNewCard({...newCard, number: value, type: provider});
        }
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            let month = parseInt(value.substring(0, 2), 10);
            if (month > 12) month = 12;
            if (month === 0) month = 1;
            let monthStr = month.toString().padStart(2, '0');
            value = monthStr + '/' + value.substring(2, 4);
        }
        if (value.length <= 5) setNewCard({...newCard, expiry: value});
    };

    const handleNameChange = (e) => {
        let value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setNewCard({...newCard, holder: value.toUpperCase()});
    };

    const handleBankChange = (e) => {
        let value = e.target.value.replace(/[^a-zA-Z\s\-]/g, '');
        setNewCard({...newCard, bank: value});
    };

    const handleAddCard = (e) => {
        e.preventDefault();

        if (newCard.number.length < 15 || !validateCardNumber(newCard.number)) {
            alert("Please enter a valid card number (failed algorithmic check).");
            return;
        }
        if (newCard.expiry.length < 5) {
            alert("Please enter a valid expiry date (MM/YY).");
            return;
        }
        
        const [month, year] = newCard.expiry.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (Number(month) < 1 || Number(month) > 12) {
            alert("Please enter a valid month (01-12).");
            return;
        }
        
        if (Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) {
            alert("Card has expired. Please check your Valid Thru date.");
            return;
        }
        if (Number(year) > currentYear + 25) {
            alert("Expiry year is too far in the future.");
            return;
        }

        const cardObj = {
            id: Date.now().toString(),
            ...newCard
        };
        addCard(cardObj);
        setIsAdding(false);
        setNewCard({ bank: '', number: '', holder: '', expiry: '', type: 'Visa' });
    };
    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your saved cards." />;
    }

    const handleDelete = (cardId) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            deleteCard(cardId);
        }
    };

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Saved Cards</h1>
            {cards.length > 0 ? (
                <div className="account-content">
                    <div className="card-grid">
                        {cards.map(card => (
                            <div key={card.id} className="info-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#282c3f' }}>{card.bank}</span>
                                    <span style={{ fontSize: '10px', padding: '4px 8px', background: '#eef0f3', borderRadius: '4px', fontWeight: 'bold', color: '#535766' }}>
                                        {card.type.toUpperCase()}
                                    </span>
                                </div>
                                <div style={{ fontSize: '18px', letterSpacing: '2px', margin: '20px 0', color: '#3e4152', fontFamily: 'monospace' }}>
                                    {card.number}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '10px', color: '#7e818c', marginBottom: '2px' }}>Name on Card</span>
                                        <span style={{ fontSize: '13px', fontWeight: '500', color: '#282c3f' }}>{card.holder}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <span style={{ fontSize: '10px', color: '#7e818c', marginBottom: '2px' }}>Expires</span>
                                        <span style={{ fontSize: '13px', fontWeight: '500', color: '#282c3f' }}>{card.expiry}</span>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px dashed #eaeaec', textAlign: 'right' }}>
                                    <button
                                        onClick={() => handleDelete(card.id)}
                                        style={{ color: '#ff3f6c', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                                    >
                                        DELETE CARD
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="account-content empty-state">
                    <h3>No Saved Cards</h3>
                    <p>Save your credit/debit cards during checkout for faster payments.</p>
                </div>
            )}

            {isAdding ? (
                <div className="account-content" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <h3 style={{ marginBottom: '15px' }}>Add New Card</h3>
                    <form onSubmit={handleAddCard} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                        <input type="text" placeholder="Bank Name (e.g. HDFC, ICICI)" value={newCard.bank} onChange={handleBankChange} required style={{ padding: '10px', border: '1px solid #d4d5d9', borderRadius: '4px' }} />
                        <input type="text" placeholder="Card Number (XXXX XXXX XXXX XXXX)" value={newCard.number} onChange={handleNumberChange} required style={{ padding: '10px', border: '1px solid #d4d5d9', borderRadius: '4px' }} />
                        <input type="text" placeholder="Name on Card" value={newCard.holder} onChange={handleNameChange} required style={{ padding: '10px', border: '1px solid #d4d5d9', borderRadius: '4px' }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder="Valid Thru (MM/YY)" value={newCard.expiry} onChange={handleExpiryChange} required style={{ padding: '10px', flex: 1, border: '1px solid #d4d5d9', borderRadius: '4px' }} />
                            <select value={newCard.type} disabled style={{ padding: '10px', flex: 1, border: '1px solid #d4d5d9', borderRadius: '4px', backgroundColor: '#eef0f3', color: '#535766', fontWeight: 'bold' }}>
                                <option value="Visa">Visa</option>
                                <option value="Mastercard">Mastercard</option>
                                <option value="Amex">Amex</option>
                                <option value="Discover">Discover</option>
                                <option value="RuPay">RuPay</option>
                                <option value="Unknown">Unknown</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button type="submit" className="primary-btn" style={{ flex: 1 }}>Save Card</button>
                            <button type="button" onClick={() => setIsAdding(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#333' }}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div style={{ marginTop: '20px', paddingLeft: '20px' }}>
                    <button className="primary-btn" onClick={() => setIsAdding(true)} style={{ width: 'auto', padding: '12px 30px' }}>ADD NEW CARD</button>
                </div>
            )}
        </div>
    );
};

export default SavedCards;
