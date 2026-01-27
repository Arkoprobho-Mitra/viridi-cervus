
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
    // Default to 'Men' ONLY if no gender, no category, and no search is provided (Landing on /products directly)
    const category = queryParams.get('category');
    const search = queryParams.get('search');
    const subCategory = queryParams.get('subCategory');
    const gender = queryParams.get('gender') || (category || search ? null : 'Men');
    const brandParam = queryParams.get('brand');

    // Capitalize helper
    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

    // Filter State
    const [selectedFilters, setSelectedFilters] = React.useState({
        brands: brandParam ? [brandParam] : [],
        categories: [],
        prices: [],
        priceRange: [0, 5000],
        colors: [],
        discount: null,
        kidsGender: []
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
            discount: null,
            kidsGender: []
        });
    };

    // Pagination State
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 50; // Updated to 50 items per page

    // Sorting State
    const [sortBy, setSortBy] = React.useState('recommended');
    const [isSortOpen, setSortOpen] = React.useState(false);
    const sortTimeoutRef = React.useRef(null);

    const handleSortLeave = () => {
        sortTimeoutRef.current = setTimeout(() => {
            setSortOpen(false);
        }, 200);
    };

    const handleSortEnter = () => {
        if (sortTimeoutRef.current) {
            clearTimeout(sortTimeoutRef.current);
        }
    };

    React.useEffect(() => {
        return () => {
            if (sortTimeoutRef.current) {
                clearTimeout(sortTimeoutRef.current);
            }
        };
    }, []);

    // Sorting Logic
    const sortItems = (items, sortType) => {
        const sorted = [...items];
        if (sortType === 'discount') {
            sorted.sort((a, b) => b.discount - a.discount);
        } else if (sortType === 'priceLow') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortType === 'priceHigh') {
            sorted.sort((a, b) => b.price - a.price);
        }
        // 'recommended' is default order
        return sorted;
    };

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
            const query = search.toLowerCase().trim();
            const searchTerms = query.split(/\s+/);

            const productText = `${product.title} ${product.brand} ${product.category} ${product.subCategory} ${product.group}`.toLowerCase();

            // Check if ALL search terms are present as word beginnings
            const matches = searchTerms.every(term => {
                try {
                    // \b matches word boundary, preventing 'men' from matching 'women'
                    const regex = new RegExp(`\\b${term}`, 'i');
                    return regex.test(productText);
                } catch (e) {
                    // Fallback to simple includes if regex creation fails (e.g., invalid regex pattern)
                    return productText.includes(term);
                }
            });
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
        ],
        kidsGender: (gender && gender.toLowerCase() === 'kids' && !category && !subCategory) ? ['Boys', 'Girls', 'Unisex'] : []
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

        // Kids Gender Filter (using new kidsCategory field)
        if (selectedFilters.kidsGender.length > 0) {
            // Check if product has the field (for safety) and matches
            if (product.kidsCategory && !selectedFilters.kidsGender.includes(product.kidsCategory)) {
                return false;
            }
            // If product doesn't have kidsCategory (e.g. not a Kids item or script missed it), 
            // deciding whether to hide or show. 
            // If it's a "Kids" item it *should* have it.
            // If it doesn't, let's look at the robust check to be safe?
            // "Levis Flats" -> script set "Girls".
            // So plain strict check is good.
            if (!product.kidsCategory) return false;
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
    // Reset filters on navigation (context change)
    React.useEffect(() => {
        setSelectedFilters({
            brands: brandParam ? [brandParam] : [],
            categories: [],
            prices: [],
            priceRange: [0, 5000],
            colors: [],
            discount: null,
            kidsGender: []
        });
        setCurrentPage(1);
    }, [gender, category, subCategory, search, brandParam]);

    // 4. Sorting
    const sortedProducts = React.useMemo(() => {
        return sortItems(filteredProducts, sortBy);
    }, [filteredProducts, sortBy]);

    // Calculate Pagination
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const displayedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getSortLabel = (type) => {
        switch (type) {
            case 'discount': return 'Better Discount';
            case 'priceLow': return 'Price: Low to High';
            case 'priceHigh': return 'Price: High to Low';
            default: return 'Recommended';
        }
    };

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
                                {(subCategory && subCategory !== 'All') ? (
                                    <Link to={`/products?${gender ? `gender=${gender}&` : ''}category=${encodeURIComponent(category)}`} className="breadcrumb-link">{category}</Link>
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

                    <div className="listing-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
                        <div className="page-title">
                            {gender ? `${capitalize(gender)} ` : ''}{category || ''} {subCategory ? subCategory : ''} Collections <span className="item-count"> - {sortedProducts.length} items</span>
                        </div>

                        {/* Custom Sort Dropdown */}
                        <div className="sort-container">
                            <span className="sort-label">Sort by : </span>
                            <div
                                className={`custom-sort-dropdown ${isSortOpen ? 'open' : ''}`}
                                onClick={() => setSortOpen(!isSortOpen)}
                                onMouseLeave={handleSortLeave}
                                onMouseEnter={handleSortEnter}
                            >
                                <span className="selected-sort">{getSortLabel(sortBy)}</span>
                                <span className="sort-chevron"></span>

                                <ul className="sort-options-list">
                                    <li
                                        className={sortBy === 'recommended' ? 'active' : ''}
                                        onClick={(e) => { e.stopPropagation(); setSortBy('recommended'); handleSortLeave(); }}
                                    >
                                        Recommended
                                    </li>
                                    <li
                                        className={sortBy === 'discount' ? 'active' : ''}
                                        onClick={(e) => { e.stopPropagation(); setSortBy('discount'); handleSortLeave(); }}
                                    >
                                        Better Discount
                                    </li>
                                    <li
                                        className={sortBy === 'priceLow' ? 'active' : ''}
                                        onClick={(e) => { e.stopPropagation(); setSortBy('priceLow'); handleSortLeave(); }}
                                    >
                                        Price: Low to High
                                    </li>
                                    <li
                                        className={sortBy === 'priceHigh' ? 'active' : ''}
                                        onClick={(e) => { e.stopPropagation(); setSortBy('priceHigh'); handleSortLeave(); }}
                                    >
                                        Price: High to Low
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="product-grid">
                    {displayedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {sortedProducts.length === 0 && (
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
