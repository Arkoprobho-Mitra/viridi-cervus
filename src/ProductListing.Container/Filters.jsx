
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
                <div className="filter-title">Filters <span onClick={onClearFilters} className="clear-all-btn">CLEAR ALL</span></div>
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
                <div className="filter-title">
                    Price
                    <span style={{ fontSize: '12px', fontWeight: 'normal', float: 'right', color: '#666' }}>
                        Rs. {selectedFilters.priceRange[0]} - Rs. {selectedFilters.priceRange[1]}
                    </span>
                </div>
                <div className="range-slider-container">
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        value={selectedFilters.priceRange[0]}
                        onChange={(e) => {
                            const val = Math.min(Number(e.target.value), selectedFilters.priceRange[1] - 100);
                            onFilterChange('priceRange', [val, selectedFilters.priceRange[1]]);
                        }}
                        className="thumb thumb-left"
                        style={{ zIndex: selectedFilters.priceRange[0] > 4000 && '5' }}
                    />
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        value={selectedFilters.priceRange[1]}
                        onChange={(e) => {
                            const val = Math.max(Number(e.target.value), selectedFilters.priceRange[0] + 100);
                            onFilterChange('priceRange', [selectedFilters.priceRange[0], val]);
                        }}
                        className="thumb thumb-right"
                    />
                    <div className="slider">
                        <div className="slider__track" />
                        <div
                            className="slider__range"
                            style={{
                                left: `${(selectedFilters.priceRange[0] / 5000) * 100}%`,
                                width: `${((selectedFilters.priceRange[1] - selectedFilters.priceRange[0]) / 5000) * 100}%`
                            }}
                        />
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
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
