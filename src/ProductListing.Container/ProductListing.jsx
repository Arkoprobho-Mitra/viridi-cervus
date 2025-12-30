
import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProductListing.css';
import Filters from './Filters';
import ProductCard from './ProductCard';
import { products } from './productsData';

const ProductListing = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Get params with defaults
    const gender = queryParams.get('gender') || 'Men';
    const category = queryParams.get('category') || 'Clothing';
    const subCategory = queryParams.get('subCategory') || 'All';

    // Capitalize helper
    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

    // Filter State
    const [selectedFilters, setSelectedFilters] = React.useState({
        brands: [],
        prices: [],
        priceRange: [0, 5000],
        colors: [],
        discount: null
    });

    const handleFilterChange = (section, value) => {
        if (section === 'discount') {
            setSelectedFilters(prev => ({
                ...prev,
                discount: prev.discount === value ? null : value
            }));
        } else if (section === 'priceRange') {
            setSelectedFilters(prev => ({ ...prev, priceRange: value }));
        } else {
            setSelectedFilters(prev => {
                const newSection = prev[section].includes(value)
                    ? prev[section].filter(item => item !== value)
                    : [...prev[section], value];
                return { ...prev, [section]: newSection };
            });
        }
    };

    const clearFilters = () => {
        setSelectedFilters({
            brands: [],
            prices: [],
            priceRange: [0, 5000],
            colors: [],
            discount: null
        });
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        // Brand Filter
        if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(product.brand)) {
            return false;
        }

        // Color Filter
        if (selectedFilters.colors.length > 0 && !selectedFilters.colors.includes(product.color)) {
            return false;
        }

        // Price Filter (Slider Range)
        const minPrice = selectedFilters.priceRange[0] === '' ? 0 : selectedFilters.priceRange[0];
        const maxPrice = selectedFilters.priceRange[1] === '' ? 5000 : selectedFilters.priceRange[1];

        if (product.price < minPrice || product.price > maxPrice) {
            return false;
        }

        // Price Filter (Simple logic: checks if price falls into any selected range)
        // Note: Assuming strict format 'Rs. min to Rs. max'
        if (selectedFilters.prices.length > 0) {
            const matchesPrice = selectedFilters.prices.some(range => {
                const parts = range.match(/Rs\.\s*(\d+)\s*to\s*Rs\.\s*(\d+)/);
                if (parts) {
                    const min = parseInt(parts[1]);
                    const max = parseInt(parts[2]);
                    return product.price >= min && product.price <= max;
                }
                return false;
            });
            if (!matchesPrice) return false;
        }

        // Discount Filter (Simple logic: checks if discount is >= selected)
        // Format: '10% and above'
        if (selectedFilters.discount) {
            const minDiscount = parseInt(selectedFilters.discount);
            if (product.discount < minDiscount) {
                return false;
            }
        }

        return true;
    });

    return (
        <div className="product-listing-container">
            {/* Sidebar */}
            <Filters
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
            />

            {/* Main Content */}
            <div className="product-grid-section">

                {/* Header Section */}
                <div className="listing-header">
                    <div className="breadcrumbs">
                        Home / {capitalize(gender)} / {category} / <strong>{subCategory}</strong>
                    </div>
                    <div className="page-title">
                        {capitalize(gender)} {subCategory} Collections <span className="item-count"> - {filteredProducts.length} items</span>
                    </div>

                    {/* Sort/Filter chips could go here (Bundles, Closure etc from screenshot), skipping for initial layout to focus on grid */}
                    <div style={{ marginTop: '15px', display: 'flex', gap: '15px', fontSize: '14px', color: '#282c3f' }}>
                        <span style={{ fontWeight: 700 }}>FILTERS</span>
                        {/* Static mocks for the top chips */}
                        <span>Bundles <span style={{ fontSize: '10px' }}>▼</span></span>
                        <span>Closure <span style={{ fontSize: '10px' }}>▼</span></span>
                        <span>Country of Origin <span style={{ fontSize: '10px' }}>▼</span></span>
                        <span>Fabrics <span style={{ fontSize: '10px' }}>▼</span></span>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', padding: '20px', textAlign: 'center' }}>
                            No products found with the selected filters.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProductListing;
