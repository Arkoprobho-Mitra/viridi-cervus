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

        const handleAddressUpdate = () => {
            setSelectedAddrStr(localStorage.getItem('selectedDeliveryAddress'));
        };

        window.addEventListener('deliveryAddressUpdated', handleAddressUpdate);
        window.addEventListener('storage', handleAddressUpdate);

        return () => {
            window.removeEventListener('deliveryAddressUpdated', handleAddressUpdate);
            window.removeEventListener('storage', handleAddressUpdate);
        };
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
            const existing = addresses[editingIndex];
            // Preserve ID if it exists
            updatedAddresses[editingIndex] = {
                ...(typeof existing === 'object' ? existing : {}),
                ...formatAddressString(addressData)
            };
        } else {
            // Add new
            const newAddr = { ...formatAddressString(addressData), id: Date.now() };
            updatedAddresses = [...addresses, newAddr];
        }

        updateUserStorage(updatedAddresses);
        setIsModalOpen(false);
        setEditingIndex(null);
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            const addressToDelete = addresses[index];
            const updatedAddresses = addresses.filter((_, i) => i !== index);
            updateUserStorage(updatedAddresses);

            // Check if deleted address was selected
            let isDeletedSelected = false;
            try {
                const selected = JSON.parse(selectedAddrStr);
                // Check ID match
                if (typeof addressToDelete === 'object' && addressToDelete.id && selected.id) {
                    isDeletedSelected = addressToDelete.id === selected.id;
                }
                // Check String match or fallback
                else {
                    isDeletedSelected = JSON.stringify(addressToDelete) === selectedAddrStr;
                }
            } catch (e) {
                isDeletedSelected = JSON.stringify(addressToDelete) === selectedAddrStr;
            }

            if (isDeletedSelected) {
                if (updatedAddresses.length > 0) {
                    // Select first available
                    const first = updatedAddresses[0];
                    const str = JSON.stringify(first);
                    setSelectedAddrStr(str);
                    localStorage.setItem('selectedDeliveryAddress', str);
                } else {
                    // Clear selection
                    setSelectedAddrStr(null);
                    localStorage.removeItem('selectedDeliveryAddress');
                }
                window.dispatchEvent(new Event('deliveryAddressUpdated'));
            }
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
                            // Robust selection check
                            const isSel = (() => {
                                if (!selectedAddrStr) return false;
                                try {
                                    const selected = JSON.parse(selectedAddrStr);

                                    // Complex Object Match (ID or Content)
                                    if (typeof addr === 'object' && addr !== null) {
                                        if (selected.id && addr.id) return selected.id === addr.id;
                                        // Fallback to strict match if IDs are missing
                                        return JSON.stringify(addr) === selectedAddrStr;
                                    }

                                    // Legacy String Match
                                    if (typeof addr === 'string') {
                                        // If selected is user-normalized object from string
                                        if (selected.address === addr) return true;
                                        // Or exact string match
                                        return selected === addr;
                                    }
                                    return false;
                                } catch (e) {
                                    return JSON.stringify(addr) === selectedAddrStr;
                                }
                            })();
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
