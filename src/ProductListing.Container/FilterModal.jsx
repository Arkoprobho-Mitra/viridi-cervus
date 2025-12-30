import React, { useState, useEffect } from 'react';
import './FilterModal.css';

const FilterModal = ({ title, options, selectedOptions, onApply, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [tempSelected, setTempSelected] = useState([...selectedOptions]);

    // Update tempSelected when selectedOptions changes (e.g. if updated externally)
    useEffect(() => {
        setTempSelected([...selectedOptions]);
    }, [selectedOptions]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const toggleOption = (option) => {
        setTempSelected(prev =>
            prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option]
        );
    };

    const handleApply = () => {
        onApply(tempSelected);
        onClose();
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="filter-modal-overlay" onClick={onClose}>
            <div className="filter-modal-content" onClick={e => e.stopPropagation()}>

                <div className="filter-modal-header">
                    <span className="filter-modal-title">{title}</span>
                    <button className="filter-modal-close" onClick={onClose}>×</button>
                </div>

                <div className="filter-search-container">
                    <input
                        type="text"
                        placeholder="Search Categories"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="filter-search-input"
                    />
                </div>

                <div className="filter-modal-body">
                    <div className="filter-options-grid">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <label key={index} className="modal-option-item">
                                    <input
                                        type="checkbox"
                                        checked={tempSelected.includes(option)}
                                        onChange={() => toggleOption(option)}
                                        className="modal-checkbox"
                                    />
                                    <span className="modal-option-text">{option}</span>
                                    <span className="modal-option-count">({Math.floor(Math.random() * 500) + 10})</span>
                                </label>
                            ))
                        ) : (
                            <div className="no-results">No matches found</div>
                        )}
                    </div>
                </div>

                <div className="filter-modal-footer">
                    <button className="apply-btn" onClick={handleApply}>APPLY</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
