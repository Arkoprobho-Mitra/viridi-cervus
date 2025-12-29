
import React from 'react';
import './ProductListing.css';
import { filterOptions } from './productsData';

const Filters = ({ selectedFilters = { brands: [], prices: [], colors: [], discount: null }, onFilterChange, onClearFilters }) => {

    // Helper to safely check if selected
    const isSelected = (section, value) => {
        if (section === 'discount') return selectedFilters.discount === value;
        return selectedFilters[section]?.includes(value);
    };

    return (
        <div className="filters-sidebar">
            <div className="filter-section">
                <div className="filter-title">Filters <span onClick={onClearFilters} style={{ color: '#ff3f6c', cursor: 'pointer', fontSize: '12px' }}>CLEAR ALL</span></div>
            </div>

            <div className="filter-section">
                <div className="filter-title">Brand</div>
                {filterOptions.brands.map((brand, index) => (
                    <label key={index} className="filter-option">
                        <input
                            type="checkbox"
                            checked={isSelected('brands', brand)}
                            onChange={() => onFilterChange('brands', brand)}
                        />
                        {brand}
                        <span className="filter-count">({Math.floor(Math.random() * 1000) + 100})</span>
                    </label>
                ))}
            </div>

            <div className="filter-section">
                <div className="filter-title">Price</div>
                {filterOptions.prices.map((price, index) => (
                    <label key={index} className="filter-option">
                        <input
                            type="checkbox"
                            checked={isSelected('prices', price)}
                            onChange={() => onFilterChange('prices', price)}
                        />
                        {price}
                    </label>
                ))}
            </div>

            <div className="filter-section">
                <div className="filter-title">Color</div>
                {filterOptions.colors.map((color, index) => (
                    <label key={index} className="filter-option">
                        <input
                            type="checkbox"
                            checked={isSelected('colors', color.name)}
                            onChange={() => onFilterChange('colors', color.name)}
                            style={{ marginRight: '8px' }}
                        />
                        <span className="color-circle" style={{ backgroundColor: color.hex }}></span>
                        {color.name}
                        <span className="filter-count">({color.count})</span>
                    </label>
                ))}
            </div>

            <div className="filter-section">
                <div className="filter-title">Discount Range</div>
                {filterOptions.discountRange.map((range, index) => (
                    <label key={index} className="filter-option">
                        <input
                            type="radio"
                            name="discount"
                            checked={isSelected('discount', range)}
                            onClick={() => onFilterChange('discount', range)}
                            onChange={() => { }}
                        />
                        {range}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filters;
