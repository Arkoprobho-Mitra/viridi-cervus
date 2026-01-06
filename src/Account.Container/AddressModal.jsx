import React, { useState, useEffect } from 'react';
import './Account.css';

const AddressModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        pincode: '',
        address: '',
        locality: '',
        city: '',
        state: '',
        addressType: 'HOME',
        customType: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                addressType: initialData.addressType || 'HOME',
                customType: initialData.customType || ''
            });
        } else {
            setFormData({
                name: '',
                mobile: '',
                pincode: '',
                address: '',
                locality: '',
                city: '',
                state: '',
                addressType: 'HOME',
                customType: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeSelect = (type) => {
        setFormData(prev => ({ ...prev, addressType: type }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.name || !formData.address || !formData.pincode || !formData.mobile) {
            alert("Please fill in all required fields.");
            return;
        }

        // Finalize type for specific 'Other' case
        const finalData = { ...formData };
        if (finalData.addressType === 'OTHER' && !finalData.customType.trim()) {
            finalData.customType = 'OTHER'; // Default if empty
        }

        onSave(finalData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{initialData ? 'Edit Address' : 'Add New Address'}</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label>Save Address As</label>
                        <div className="address-type-selector">
                            <button
                                type="button"
                                className={`type-btn ${formData.addressType === 'HOME' ? 'active' : ''}`}
                                onClick={() => handleTypeSelect('HOME')}
                            >
                                HOME
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${formData.addressType === 'OFFICE' ? 'active' : ''}`}
                                onClick={() => handleTypeSelect('OFFICE')}
                            >
                                OFFICE
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${formData.addressType === 'OTHER' ? 'active' : ''}`}
                                onClick={() => handleTypeSelect('OTHER')}
                            >
                                OTHER
                            </button>
                        </div>
                        {formData.addressType === 'OTHER' && (
                            <input
                                style={{ marginTop: '10px' }}
                                name="customType"
                                value={formData.customType}
                                onChange={handleChange}
                                placeholder="Type (e.g. Friend's House)"
                            />
                        )}
                    </div>

                    <div className="form-group">
                        <label>Name*</label>
                        <input name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Mobile*</label>
                        <input name="mobile" value={formData.mobile} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Pincode*</label>
                            <input name="pincode" value={formData.pincode} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>State*</label>
                            <input name="state" value={formData.state} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Address (House No, Building, Street, Area)*</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} rows="3" required />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Locality / Town*</label>
                            <input name="locality" value={formData.locality} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>City / District*</label>
                            <input name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>CANCEL</button>
                        <button type="submit" className="primary-btn" style={{ marginTop: 0 }}>SAVE</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressModal;
