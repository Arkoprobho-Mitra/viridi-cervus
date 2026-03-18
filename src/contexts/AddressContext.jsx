import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

export const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

const generateUniqueId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const AddressProvider = ({ children }) => {
    const { isAuthenticated, currentUser, updateUser } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressStr, setSelectedAddressStr] = useState(null);

    // Sync normalized addresses when currentUser changes
    useEffect(() => {
        if (isAuthenticated && currentUser) {
            let changed = false;
            const normalizedAddresses = (currentUser.addresses || []).map(addr => {
                if (typeof addr === 'string') {
                    changed = true;
                    return {
                        name: currentUser.name,
                        mobile: currentUser.phone || currentUser.mobile || '9876543210',
                        pincode: '000000',
                        address: addr,
                        locality: '',
                        city: '',
                        state: '',
                        addressType: 'HOME',
                        id: generateUniqueId()
                    };
                }
                if (typeof addr === 'object' && !addr.id) {
                    changed = true;
                    return { ...addr, id: generateUniqueId() };
                }
                return addr;
            });

            if (changed) {
                // updateUser will trigger a re-render of AuthContext, which re-triggers this useEffect
                updateUser({ ...currentUser, addresses: normalizedAddresses });
            } else {
                setAddresses(normalizedAddresses);
            }
        } else {
            setAddresses([]);
        }
    }, [isAuthenticated, currentUser, updateUser]);

    // Handle initial selection and synchronization
    useEffect(() => {
        const loadSelectedAddress = () => {
            if (isAuthenticated) {
                const selected = localStorage.getItem('selectedDeliveryAddress');
                if (selected) {
                    setSelectedAddressStr(selected);
                } else if (currentUser && currentUser.addresses && currentUser.addresses.length > 0) {
                    const firstAddressStr = JSON.stringify(currentUser.addresses[0]);
                    localStorage.setItem('selectedDeliveryAddress', firstAddressStr);
                    setSelectedAddressStr(firstAddressStr);
                    window.dispatchEvent(new Event('deliveryAddressUpdated'));
                } else {
                    setSelectedAddressStr(null);
                }
            } else {
                setSelectedAddressStr(null);
            }
        };

        loadSelectedAddress();
        window.addEventListener('storage', loadSelectedAddress);
        window.addEventListener('deliveryAddressUpdated', loadSelectedAddress);

        return () => {
            window.removeEventListener('storage', loadSelectedAddress);
            window.removeEventListener('deliveryAddressUpdated', loadSelectedAddress);
        };
    }, [isAuthenticated, currentUser]);

    const selectAddress = (addr) => {
        const str = JSON.stringify(addr);
        setSelectedAddressStr(str);
        localStorage.setItem('selectedDeliveryAddress', str);
        
        if (currentUser && currentUser.email) {
            localStorage.setItem(`last_selected_address_${currentUser.email}`, str);
        }

        window.dispatchEvent(new Event('deliveryAddressUpdated'));
    };

    const addAddress = (newAddress) => {
        if (!currentUser) return;
        const addressWithId = { ...newAddress, id: generateUniqueId() };
        const updatedAddresses = [...addresses, addressWithId];
        
        updateUser({ ...currentUser, addresses: updatedAddresses });
        
        // select it automatically
        selectAddress(addressWithId);
        return addressWithId;
    };

    const editAddress = (updatedAddress) => {
        if (!currentUser) return;
        
        const updatedAddresses = addresses.map(addr => 
            addr.id === updatedAddress.id ? updatedAddress : addr
        );

        updateUser({ ...currentUser, addresses: updatedAddresses });
        
        // Update selected address string if it was selected
        if (selectedAddressStr) {
            try {
                const selected = JSON.parse(selectedAddressStr);
                if (selected.id === updatedAddress.id) {
                    selectAddress(updatedAddress);
                }
            } catch (e) {
                // Ignore
            }
        }
    };

    const deleteAddress = (idToDelete) => {
        if (!currentUser) return;
        const updatedAddresses = addresses.filter(addr => addr.id !== idToDelete);
        
        updateUser({ ...currentUser, addresses: updatedAddresses });

        // Handle deleted selection
        if (selectedAddressStr) {
            try {
                const selected = JSON.parse(selectedAddressStr);
                if (selected.id === idToDelete) {
                    if (updatedAddresses.length > 0) {
                        selectAddress(updatedAddresses[0]);
                    } else {
                        localStorage.removeItem('selectedDeliveryAddress');
                        setSelectedAddressStr(null);
                        window.dispatchEvent(new Event('deliveryAddressUpdated'));
                    }
                }
            } catch (e) {
                // Ignore
            }
        }
    };

    // Derived values
    const selectedAddress = React.useMemo(() => {
        if (!selectedAddressStr) return null;
        try {
            return JSON.parse(selectedAddressStr);
        } catch (e) {
            return null;
        }
    }, [selectedAddressStr]);

    return (
        <AddressContext.Provider value={{
            addresses,
            selectedAddress,
            selectedAddressStr,
            addAddress,
            editAddress,
            deleteAddress,
            selectAddress,
            isAuthenticated,
            currentUser
        }}>
            {children}
        </AddressContext.Provider>
    );
};
