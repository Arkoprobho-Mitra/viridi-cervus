
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ProductListing.css';
import Filters from './Filters';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { products } from './productsData';

const ProductListing = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Get params with defaults
    const gender = queryParams.get('gender') || (queryParams.get('search') ? null : 'Men'); // Default to Men only if no search
    const category = queryParams.get('category'); // Removed default 'Clothing' to allow search to work broadly
    const subCategory = queryParams.get('subCategory');
    const search = queryParams.get('search');

    // Capitalize helper
    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

    // Filter State
    const [selectedFilters, setSelectedFilters] = React.useState({
        brands: [],
        categories: [],
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
        } else if (Array.isArray(value)) {
            // Handle bulk update (e.g. from Modal)
            setSelectedFilters(prev => ({ ...prev, [section]: value }));
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
            categories: [],
            prices: [],
            priceRange: [0, 5000],
            colors: [],
            discount: null
        });
    };

    // Pagination State
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 50; // Updated to 50 items per page

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 1. Context Filtering (Base products based on URL params - Gender, Category, SubCategory, Search)
    const contextProducts = products.filter(product => {
        if (gender && product.group.toLowerCase() !== gender.toLowerCase()) return false;
        if (category && category !== 'Clothing' && product.category !== category) return false;
        if (subCategory && subCategory !== 'All' && product.subCategory !== subCategory) return false;

        if (search) {
            const lowerSearch = search.toLowerCase();
            const matches =
                product.title.toLowerCase().includes(lowerSearch) ||
                product.brand.toLowerCase().includes(lowerSearch) ||
                product.category.toLowerCase().includes(lowerSearch) ||
                product.subCategory.toLowerCase().includes(lowerSearch) ||
                product.group.toLowerCase().includes(lowerSearch);
            if (!matches) return false;
        }

        return true;
    });

    // 2. Derive Dynamic Filter Options
    const availableBrands = React.useMemo(() => [...new Set(contextProducts.map(p => p.brand))].sort(), [contextProducts]);
    const availableCategories = React.useMemo(() => [...new Set(contextProducts.map(p => p.subCategory))].sort(), [contextProducts]);

    const availableColors = React.useMemo(() => {
        const counts = {};
        contextProducts.forEach(p => {
            counts[p.color] = (counts[p.color] || 0) + 1;
        });

        const standardColors = {
            'Black': '#000000', 'Grey': '#808080', 'Blue': '#0000FF', 'Navy Blue': '#000080',
            'Green': '#008000', 'Brown': '#A52A2A', 'Beige': '#F5F5DC', 'White': '#FFFFFF',
            'Red': '#FF0000', 'Olive': '#808000', 'Yellow': '#FFFF00', 'Pink': '#FFC0CB',
            'Purple': '#800080', 'Maroon': '#800000', 'Biege': '#F5F5DC',
            'Teal': '#008080', 'Rust': '#B7410E', 'Orange': '#FFA500'
        };

        return Object.keys(counts).map(name => ({
            name,
            count: counts[name],
            hex: standardColors[name] || '#cccccc'
        }));
    }, [contextProducts]);

    const dynamicOptions = {
        brands: availableBrands,
        categories: (subCategory && subCategory !== 'All') ? [] : availableCategories,
        colors: availableColors,
        prices: ['Rs. 300 to Rs. 5000'],
        discountRange: [
            '10% and above', '20% and above', '30% and above', '40% and above',
            '50% and above', '60% and above', '70% and above', '80% and above'
        ]
    };

    // 3. Final Filtering (Sidebar Filters)
    const filteredProducts = contextProducts.filter(product => {
        // Brand Filter
        if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(product.brand)) {
            return false;
        }

        // Category Filter (Sidebar)
        if (selectedFilters.categories.length > 0 && !selectedFilters.categories.includes(product.subCategory)) {
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

        // Discount Filter
        if (selectedFilters.discount) {
            const minDiscount = parseInt(selectedFilters.discount);
            if (product.discount < minDiscount) {
                return false;
            }
        }

        return true;
    });

    // Reset page on filter change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedFilters]);

    // Reset filters on navigation (context change)
    React.useEffect(() => {
        setSelectedFilters({
            brands: [],
            categories: [],
            prices: [],
            priceRange: [0, 5000],
            colors: [],
            discount: null
        });
        setCurrentPage(1);
    }, [gender, category, subCategory, search]);

    // Calculate Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="product-listing-container">
            {/* Sidebar */}
            <Filters
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                availableOptions={dynamicOptions}
            />

            {/* Main Content */}
            <div className="product-grid-section">

                {/* Header Section */}
                <div className="listing-header">
                    <div className="breadcrumbs">
                        <Link to="/" className="breadcrumb-link">Home</Link>
                        {gender && (
                            <>
                                {' / '}
                                {(category && category !== 'Clothing') || (subCategory && subCategory !== 'All') ? (
                                    <Link to={`/products?gender=${gender}`} className="breadcrumb-link">{capitalize(gender)}</Link>
                                ) : (
                                    <strong>{capitalize(gender)}</strong>
                                )}
                            </>
                        )}
                        {category && category !== 'Clothing' && (
                            <>
                                {' / '}
                                {subCategory && subCategory !== 'All' ? (
                                    <Link to={`/products?gender=${gender}&category=${encodeURIComponent(category)}`} className="breadcrumb-link">{category}</Link>
                                ) : (
                                    <strong>{category}</strong>
                                )}
                            </>
                        )}
                        {subCategory && subCategory !== 'All' && (
                            <>
                                {' / '}
                                <strong>{subCategory}</strong>
                            </>
                        )}
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
                    {displayedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', padding: '20px', textAlign: 'center' }}>
                            No products found with the selected filters.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

            </div>
        </div>
    );
};

export default ProductListing;
