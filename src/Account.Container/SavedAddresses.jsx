import React, { useState, useEffect } from 'react';
import './Account.css';
import AccountGuest from './AccountGuest';
import AddressModal from './AddressModal';

const SavedAddresses = () => {
    const isAuthenticated = !!localStorage.getItem('isAuthenticated');
    const [currentUser, setCurrentUser] = useState(
        isAuthenticated ? JSON.parse(localStorage.getItem('currentUser')) : null
    );
    const [selectedAddrStr, setSelectedAddrStr] = useState(localStorage.getItem('selectedDeliveryAddress'));
    const [addresses, setAddresses] = useState(currentUser?.addresses || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setAddresses(currentUser.addresses || []);
        }
    }, [currentUser]);

    const handleSelectAddress = (addr) => {
        const str = JSON.stringify(addr);
        setSelectedAddrStr(str);
        localStorage.setItem('selectedDeliveryAddress', str);
        window.dispatchEvent(new Event('deliveryAddressUpdated'));
    };

    if (!isAuthenticated) {
        return <AccountGuest title="PLEASE LOG IN" subtitle="Login to view your saved addresses." />;
    }

    const handleSaveAddress = (addressData) => {
        let updatedAddresses;
        if (editingIndex !== null) {
            // Edit existing
            updatedAddresses = [...addresses];
            updatedAddresses[editingIndex] = formatAddressString(addressData);
        } else {
            // Add new
            updatedAddresses = [...addresses, formatAddressString(addressData)];
        }

        updateUserStorage(updatedAddresses);
        setIsModalOpen(false);
        setEditingIndex(null);
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            const updatedAddresses = addresses.filter((_, i) => i !== index);
            updateUserStorage(updatedAddresses);
        }
    };

    const handleEdit = (index, e) => {
        e.stopPropagation(); // Prevent triggering selection
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (index, e) => {
        e.stopPropagation();
        handleDelete(index);
    }

    const handleAddNew = () => {
        setEditingIndex(null);
        setIsModalOpen(true);
    };

    const updateUserStorage = (newAddresses) => {
        const updatedUser = { ...currentUser, addresses: newAddresses };
        setCurrentUser(updatedUser);
        setAddresses(newAddresses);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('userUpdated'));
    };

    const formatAddressString = (data) => {
        return data;
    };

    const renderAddress = (addr) => {
        if (typeof addr === 'string') return addr;
        return `${addr.address}, ${addr.locality}, ${addr.city}, ${addr.state} - ${addr.pincode}, Mob: ${addr.mobile}`;
    };

    const getInitialDataForEdit = (index) => {
        if (index === null) return null;
        const addr = addresses[index];
        if (typeof addr === 'string') {
            return {
                name: currentUser.name,
                mobile: currentUser.phone,
                pincode: '',
                address: addr,
                locality: '',
                city: '',
                state: ''
            };
        }
        return addr;
    };

    return (
        <div className="account-page-container">
            <h1 className="account-page-header">Saved Addresses</h1>
            <div className="account-content">
                {addresses.length > 0 ? (
                    <div className="card-grid">
                        {addresses.map((addr, idx) => {
                            const isSel = selectedAddrStr === JSON.stringify(addr);
                            return (
                                <div
                                    key={idx}
                                    className={`info-card ${isSel ? 'selected-card' : ''}`}
                                    onClick={() => handleSelectAddress(addr)}
                                    style={{ cursor: 'pointer', border: isSel ? '2px solid forestgreen' : '1px solid #eaeaec', backgroundColor: isSel ? '#f0fdf4' : 'fff' }}
                                >
                                    <div style={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                        {typeof addr === 'object' ? addr.name : currentUser.name}
                                        <span style={{ marginLeft: '10px', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', backgroundColor: '#f0f0f0', color: '#777' }}>
                                            {typeof addr === 'object'
                                                ? (addr.addressType === 'OTHER' && addr.customType ? addr.customType : addr.addressType || 'HOME')
                                                : 'HOME'
                                            }
                                        </span>
                                        {isSel && (
                                            <span style={{ marginLeft: '10px', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', backgroundColor: 'forestgreen', color: 'white', fontWeight: 'bold' }}>
                                                CURRENT
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
                                        {renderAddress(addr)}
                                    </div>
                                    <div style={{ marginTop: '15px' }}>
                                        <button
                                            onClick={(e) => handleEdit(idx, e)}
                                            style={{ color: 'forestgreen', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginRight: '15px' }}
                                        >
                                            EDIT
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteClick(idx, e)}
                                            style={{ color: 'red', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                                        >
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="empty-state">
                        <h3>No Saved Addresses</h3>
                        <p>Add addresses for a faster checkout.</p>
                    </div>
                )}
                <button className="primary-btn" onClick={handleAddNew}>Add New Address</button>
            </div>

            <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveAddress}
                initialData={getInitialDataForEdit(editingIndex)}
            />
        </div>
    );
};

export default SavedAddresses;
