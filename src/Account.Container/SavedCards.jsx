import React from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';

const SavedCards = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');
    const [currentUser, setCurrentUser] = React.useState(
        isAuthenticated ? JSON.parse(localStorage.getItem('currentUser')) : null
    );
    const [cards, setCards] = React.useState(currentUser?.savedCards || []);

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your saved cards." />;
    }

    const handleDelete = (cardId) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            const updatedCards = cards.filter(c => c.id !== cardId);
            setCards(updatedCards);

            const updatedUser = { ...currentUser, savedCards: updatedCards };
            setCurrentUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
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
        </div>
    );
};

export default SavedCards;
