
import React from 'react';
import './ProductListing.css';
import { filterOptions } from './productsData';

const Filters = ({ selectedFilters = { brands: [], priceRange: [0, 5000], colors: [], discount: null }, onFilterChange, onClearFilters }) => {

    const [minInput, setMinInput] = React.useState(selectedFilters.priceRange[0]);
    const [maxInput, setMaxInput] = React.useState(selectedFilters.priceRange[1]);

    React.useEffect(() => {
        setMinInput(selectedFilters.priceRange[0]);
        setMaxInput(selectedFilters.priceRange[1]);
    }, [selectedFilters.priceRange]);

    const handleMinBlur = () => {
        let val = minInput === '' ? 0 : Number(minInput);
        const currentMax = selectedFilters.priceRange[1] === '' ? 5000 : selectedFilters.priceRange[1];
        // Clamp: 0 <= val <= currentMax
        val = Math.max(0, Math.min(val, currentMax));

        // Update both local and parent
        if (val !== minInput) setMinInput(val);
        onFilterChange('priceRange', [val, selectedFilters.priceRange[1]]);
    };

    const handleMaxBlur = () => {
        let val = maxInput === '' ? 5000 : Number(maxInput);
        const currentMin = selectedFilters.priceRange[0] === '' ? 0 : selectedFilters.priceRange[0];
        // Clamp: currentMin <= val <= 5000
        val = Math.min(5000, Math.max(val, currentMin));

        if (val !== maxInput) setMaxInput(val);
        onFilterChange('priceRange', [selectedFilters.priceRange[0], val]);
    };

    const handleKeyDown = (e, handler) => {
        if (e.key === 'Enter') {
            handler();
        }
    };

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
                </div>
                <div className="price-inputs-container">
                    <div className="price-field">
                        <span>Rs.</span>
                        <input
                            type="number"
                            value={minInput}
                            placeholder="0"
                            onChange={(e) => setMinInput(e.target.value)}
                            onBlur={handleMinBlur}
                            onKeyDown={(e) => handleKeyDown(e, handleMinBlur)}
                            className="price-input"
                        />
                    </div>
                    <span className="price-separator">-</span>
                    <div className="price-field">
                        <span>Rs.</span>
                        <input
                            type="number"
                            value={maxInput}
                            placeholder={selectedFilters.priceRange[0]}
                            onChange={(e) => setMaxInput(e.target.value)}
                            onBlur={handleMaxBlur}
                            onKeyDown={(e) => handleKeyDown(e, handleMaxBlur)}
                            className="price-input"
                        />
                    </div>
                </div>
                <div className="range-slider-container">
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        value={selectedFilters.priceRange[0] === '' ? 0 : selectedFilters.priceRange[0]}
                        onChange={(e) => {
                            const val = Math.min(Number(e.target.value), selectedFilters.priceRange[1] === '' ? 5000 : selectedFilters.priceRange[1]);
                            onFilterChange('priceRange', [val, selectedFilters.priceRange[1]]);
                        }}
                        className="thumb thumb-left"
                        style={{ zIndex: (selectedFilters.priceRange[0] === '' ? 0 : selectedFilters.priceRange[0]) > 4000 && '5' }}
                    />
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        value={selectedFilters.priceRange[1] === '' ? 5000 : selectedFilters.priceRange[1]}
                        onChange={(e) => {
                            const val = Math.max(Number(e.target.value), selectedFilters.priceRange[0] === '' ? 0 : selectedFilters.priceRange[0]);
                            onFilterChange('priceRange', [selectedFilters.priceRange[0], val]);
                        }}
                        className="thumb thumb-right"
                    />
                    <div className="slider">
                        <div className="slider__track" />
                        <div
                            className="slider__range"
                            style={{
                                left: `${((selectedFilters.priceRange[0] === '' ? 0 : selectedFilters.priceRange[0]) / 5000) * 100}%`,
                                width: `${(((selectedFilters.priceRange[1] === '' ? 5000 : selectedFilters.priceRange[1]) - (selectedFilters.priceRange[0] === '' ? 0 : selectedFilters.priceRange[0])) / 5000) * 100}%`
                            }}
                        />
                    </div>
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
