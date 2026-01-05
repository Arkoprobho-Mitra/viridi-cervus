
import React from 'react';
import './ProductListing.css';
import FilterModal from './FilterModal.jsx';

const Filters = ({ selectedFilters = { brands: [], priceRange: [0, 5000], colors: [], discount: null }, onFilterChange, onClearFilters, availableOptions = { brands: [], colors: [], prices: [], discountRange: [] } }) => {

    const [minInput, setMinInput] = React.useState(selectedFilters.priceRange[0]);
    const [maxInput, setMaxInput] = React.useState(selectedFilters.priceRange[1]);
    const [showBrandModal, setShowBrandModal] = React.useState(false);
    const [showCategoryModal, setShowCategoryModal] = React.useState(false);

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

    // Sticky Sidebar Logic
    const sidebarRef = React.useRef(null);
    const sliderRef = React.useRef(null);
    const [stickyOffset, setStickyOffset] = React.useState(20);

    React.useEffect(() => {
        const calculateOffset = () => {
            if (sidebarRef.current) {
                const sidebarHeight = sidebarRef.current.offsetHeight;
                const viewHeight = window.innerHeight;

                // Assuming a fixed header height ~80px. 
                // If sidebar fits: stick to top (e.g. 85px).
                // If NOT fits: stick to bottom.
                // top = viewHeight - sidebarHeight - 20 (padding).

                if (sidebarHeight + 100 > viewHeight) { // 100 buffer for header
                    const offset = viewHeight - sidebarHeight - 20;
                    setStickyOffset(offset);
                } else {
                    setStickyOffset(85); // Header + padding
                }
            }
        };

        calculateOffset();
        window.addEventListener('resize', calculateOffset);

        const observer = new ResizeObserver(calculateOffset);
        if (sidebarRef.current) observer.observe(sidebarRef.current);

        return () => {
            window.removeEventListener('resize', calculateOffset);
            observer.disconnect();
        };
    }, [selectedFilters]);

    const handleSliderClick = (e) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const sliderWidth = rect.width;

        // Calculate percentage of width clicked (0 to 1)
        const percent = Math.max(0, Math.min(1, clickX / sliderWidth));

        // Convert to price value (0 to 5000)
        const value = Math.round(percent * 5000);

        const currentMin = selectedFilters.priceRange[0] === '' ? 0 : selectedFilters.priceRange[0];
        const currentMax = selectedFilters.priceRange[1] === '' ? 5000 : selectedFilters.priceRange[1];

        // Determine which handle is closer
        const distToMin = Math.abs(currentMin - value);
        const distToMax = Math.abs(currentMax - value);

        if (distToMin < distToMax) {
            // Update Min (ensure it doesn't cross Max)
            const newVal = Math.min(value, currentMax);
            setMinInput(newVal);
            onFilterChange('priceRange', [newVal, currentMax]);
        } else {
            // Update Max (ensure it doesn't cross Min)
            const newVal = Math.max(value, currentMin);
            setMaxInput(newVal);
            onFilterChange('priceRange', [currentMin, newVal]);
        }
    };

    return (
        <div
            className="filters-sidebar"
            ref={sidebarRef}
            style={{ position: 'sticky', top: `${stickyOffset}px`, alignSelf: 'flex-start' }}
        >
            <div className="filter-section">
                <div className="filter-title">Filters <span onClick={onClearFilters} className="clear-all-btn">CLEAR ALL</span></div>
            </div>

            {/* Gender Filter for Kids */}
            {availableOptions.kidsGender && availableOptions.kidsGender.length > 0 && (
                <div className="filter-section">
                    <div className="filter-title">Gender</div>
                    {availableOptions.kidsGender.map(option => (
                        <label key={option} className="filter-option">
                            <input
                                type="checkbox"
                                id={`gender-${option}`}
                                checked={selectedFilters.kidsGender && selectedFilters.kidsGender.includes(option)}
                                onChange={() => onFilterChange('kidsGender', option)}
                                style={{ marginRight: '8px' }}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}

            {availableOptions.categories && availableOptions.categories.length > 0 && (
                <div className="filter-section">
                    <div className="filter-title">Categories</div>
                    {availableOptions.categories.slice(0, 10).map((cat, index) => (
                        <label key={index} className="filter-option">
                            <input
                                type="checkbox"
                                checked={isSelected('categories', cat)}
                                onChange={() => onFilterChange('categories', cat)}
                            />
                            {cat}
                        </label>
                    ))}
                    {availableOptions.categories.length > 10 && (
                        <div
                            className="more-brands-btn"
                            onClick={() => setShowCategoryModal(true)}
                            style={{ color: 'forestgreen', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', paddingLeft: '5px' }}
                        >
                            + {availableOptions.categories.length - 10} more
                        </div>
                    )}
                </div>
            )}

            {showCategoryModal && (
                <FilterModal
                    title="Select Categories"
                    options={availableOptions.categories}
                    selectedOptions={selectedFilters.categories}
                    onApply={(newSelection) => {
                        onFilterChange('categories', newSelection);
                    }}
                    onClose={() => setShowCategoryModal(false)}
                />
            )}

            {/* Brand Section */}
            <div className="filter-section">
                <div className="filter-title">
                    Brand
                </div>
                {availableOptions.brands.slice(0, 10).map((brand, index) => (
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
                {availableOptions.brands.length > 10 && (
                    <div
                        className="more-brands-btn"
                        onClick={() => setShowBrandModal(true)}
                        style={{ color: 'forestgreen', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', paddingLeft: '5px' }}
                    >
                        + {availableOptions.brands.length - 10} more
                    </div>
                )}
            </div>

            {showBrandModal && (
                <FilterModal
                    title="Select Brands"
                    options={availableOptions.brands}
                    selectedOptions={selectedFilters.brands}
                    onApply={(newSelection) => {
                        onFilterChange('brands', newSelection);
                    }}
                    onClose={() => setShowBrandModal(false)}
                />
            )}

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
                    <div
                        className="slider"
                        ref={sliderRef}
                        onClick={handleSliderClick}
                        style={{ cursor: 'pointer' }}
                    >
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
                {availableOptions.colors.map((color, index) => (
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
                {availableOptions.discountRange.map((range, index) => (
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
