
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ProductListing.css';
import Filters from './Filters';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { resolveCategory, resolveSubCategory, resolveKeyword } from '../utils/categoryMap';

const API_BASE    = process.env.REACT_APP_SPRING_BASE_URL  || 'http://localhost:8081';
const SEARCH_BASE = process.env.REACT_APP_SEARCH_BASE_URL  || 'http://localhost:8082';

const ProductListing = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // URL params
    const category    = queryParams.get('category');
    const search      = queryParams.get('search');        // legacy Navbar text search
    const subCategory = queryParams.get('subCategory');
    const gender      = queryParams.get('gender') || (category || search ? null : 'Men');
    const brandParam  = queryParams.get('brand');
    const q           = queryParams.get('q');             // semantic search query

    // ── Pagination state ──────────────────────────────────────────────────────
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 50;

    // ── Sort state ────────────────────────────────────────────────────────────
    const sortParam = queryParams.get('sort') || 'recommended';
    const [sortBy, setSortBy]       = React.useState(sortParam);
    const [isSortOpen, setSortOpen] = React.useState(false);
    const sortTimeoutRef = React.useRef(null);

    // ── Filter state ──────────────────────────────────────────────────────────
    const [selectedFilters, setSelectedFilters] = React.useState({
        brands:     brandParam ? [brandParam] : [],
        categories: [],
        prices:     [],
        priceRange: [0, 5000],
        colors:     [],
        discount:   null,
        kidsGender: []
    });

    const handleFilterChange = (section, value) => {
        if (section === 'discount') {
            setSelectedFilters(prev => ({ ...prev, discount: prev.discount === value ? null : value }));
        } else if (section === 'priceRange') {
            setSelectedFilters(prev => ({ ...prev, priceRange: value }));
        } else if (Array.isArray(value)) {
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
        setSelectedFilters({ brands: [], categories: [], prices: [], priceRange: [0, 5000], colors: [], discount: null, kidsGender: [] });
    };

    // ── API product state ─────────────────────────────────────────────────────
    const [apiProducts, setApiProducts] = React.useState([]);
    const [apiFacets, setApiFacets]     = React.useState(null);
    const [totalServerPages, setTotalServerPages] = React.useState(1);
    const [apiLoading, setApiLoading]   = React.useState(false);
    const [apiError, setApiError]       = React.useState(null);

    // ── Fetch: API (Spring Boot for browsing, Semantic Search for ?q) ─────────
    React.useEffect(() => {
        let cancelled = false;

        const fetchProducts = async () => {
            setApiLoading(true);
            setApiError(null);
            try {
                const params = new URLSearchParams();
                const implicitKeyword = resolveKeyword(subCategory);
                const queryTerm = q || search || implicitKeyword;
                if (queryTerm)   params.set(q ? 'q' : 'search', queryTerm);
                if (gender)      params.set('gender', gender);
                
                // --- Category mapping ---
                const resolvedCat = resolveCategory(category && category !== 'Clothing' ? category : null);
                const resolvedSub = resolveSubCategory(subCategory && subCategory !== 'All' ? subCategory : null);
                const activeCategories = [...(selectedFilters.categories || [])];

                if (activeCategories.length === 0) {
                    if (resolvedSub) activeCategories.push(...Array.from(resolvedSub));
                    else if (resolvedCat) activeCategories.push(...Array.from(resolvedCat));
                }

                if (activeCategories.length > 0) {
                    params.set('categories', activeCategories.join(','));
                }
                // ------------------------

                if (selectedFilters.brands?.length) params.set('brands', selectedFilters.brands.join(','));
                if (selectedFilters.colors?.length) params.set('colors', selectedFilters.colors.join(','));
                if (selectedFilters.priceRange[0] !== '' && selectedFilters.priceRange[0] !== 0) params.set('minPrice', selectedFilters.priceRange[0]);
                if (selectedFilters.priceRange[1] !== '' && selectedFilters.priceRange[1] !== 5000) params.set('maxPrice', selectedFilters.priceRange[1]);
                if (selectedFilters.discount) params.set('minDiscount', selectedFilters.discount);

                params.set('page', currentPage - 1);
                params.set('size', itemsPerPage);
                let sortDir = 'asc';
                if (sortBy === 'priceHigh') { params.set('sortBy', 'price'); sortDir = 'desc'; }
                else if (sortBy === 'priceLow') { params.set('sortBy', 'price'); sortDir = 'asc'; }
                else if (sortBy === 'discount') { params.set('sortBy', 'discount'); sortDir = 'desc'; }
                params.set('direction', sortDir);

                const url = q 
                    ? `${SEARCH_BASE}/api/products/search?${params}`
                    : `${API_BASE}/api/products?${params}`;

                const res = await fetch(url);
                if (!res.ok) throw new Error(`API returned HTTP ${res.status}`);
                const json = await res.json();
                
                if (!cancelled) {
                    if (q) {
                        setApiProducts(json || []);
                        setTotalServerPages(1);
                        setApiFacets(null);
                    } else {
                        const data = json.data || json;
                        setApiProducts(data.content || []);
                        setTotalServerPages(data.totalPages || 1);
                        setApiFacets(data.facets || null);
                    }
                }
            } catch (err) {
                if (!cancelled) setApiError(err.message);
            } finally {
                if (!cancelled) setApiLoading(false);
            }
        };

        fetchProducts();
        return () => { cancelled = true; };
    }, [q, search, gender, category, subCategory, selectedFilters, currentPage, sortBy]);

    // ── Capitalize helper ─────────────────────────────────────────────────────
    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

    // ── Filter sidebar ────────────────────────────────────────────────────────
    const [isFilterOpen, setIsFilterOpen] = React.useState(() => window.innerWidth > 900);

    const handleSortLeave = () => { sortTimeoutRef.current = setTimeout(() => setSortOpen(false), 200); };
    const handleSortEnter = () => { if (sortTimeoutRef.current) clearTimeout(sortTimeoutRef.current); };

    React.useEffect(() => () => { if (sortTimeoutRef.current) clearTimeout(sortTimeoutRef.current); }, []);

    const sortItems = (items, sortType) => {
        const sorted = [...items];
        if (sortType === 'discount')   sorted.sort((a, b) => b.discount - a.discount);
        if (sortType === 'priceLow')   sorted.sort((a, b) => a.price - b.price);
        if (sortType === 'priceHigh')  sorted.sort((a, b) => b.price - a.price);
        return sorted;
    };

    const handlePageChange = (page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    // Reset page on filter change
    React.useEffect(() => { setCurrentPage(1); }, [selectedFilters]);

    // Reset filters & sort on navigation
    React.useEffect(() => {
        setSelectedFilters({ brands: brandParam ? [brandParam] : [], categories: [], prices: [], priceRange: [0, 5000], colors: [], discount: null, kidsGender: [] });
        setCurrentPage(1);
        setSortBy(sortParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gender, category, subCategory, search, brandParam, sortParam]);

    // ── 1. Context products ───────────────────────────────────────────────────
    const contextProducts = apiProducts;

    // ── 2. Faceted filtering helper ───────────────────────────────────────────
    const filterProducts = (prods, filters) => {
        if (!q) return prods; // Backend already filtered for non-search
        return prods.filter(product => {
            if (filters.brands?.length > 0 && !filters.brands.includes(product.brand)) return false;
            if (filters.categories?.length > 0 && !filters.categories.includes(product.subCategory)) return false;
            if (filters.colors?.length > 0 && !filters.colors.includes(product.color)) return false;
            if (filters.kidsGender?.length > 0) {
                if (product.kidsCategory && !filters.kidsGender.includes(product.kidsCategory)) return false;
                if (!product.kidsCategory) return false;
            }
            const minPrice = filters.priceRange[0] === '' ? 0    : filters.priceRange[0];
            const maxPrice = filters.priceRange[1] === '' ? 5000 : filters.priceRange[1];
            if (product.price < minPrice || product.price > maxPrice) return false;
            if (filters.prices?.length > 0) {
                const matchesPrice = filters.prices.some(range => {
                    const parts = range.match(/Rs\.\s*(\d+)\s*to\s*Rs\.\s*(\d+)/);
                    if (parts) { const min = parseInt(parts[1]); const max = parseInt(parts[2]); return product.price >= min && product.price <= max; }
                    return false;
                });
                if (!matchesPrice) return false;
            }
            if (filters.discount) { if (product.discount < parseInt(filters.discount)) return false; }
            return true;
        });
    };

    // ── 3. Dynamic filter options (faceted) ───────────────────────────────────
    const availableBrands = React.useMemo(() => {
        if (apiFacets?.brands) return apiFacets.brands;
        const subset = filterProducts(contextProducts, { ...selectedFilters, brands: [] });
        const counts = {};
        subset.forEach(p => { counts[p.brand] = (counts[p.brand] || 0) + 1; });
        return Object.keys(counts).sort().map(brand => ({ name: brand, count: counts[brand] }));
    }, [apiFacets, contextProducts, selectedFilters]);

    const availableCategories = React.useMemo(() => {
        if (apiFacets?.categories) {
            // We just return string array
            if (Array.isArray(apiFacets.categories)) return apiFacets.categories;
        }
        const subset = filterProducts(contextProducts, { ...selectedFilters, categories: [] });
        return [...new Set(subset.map(p => p.subCategory))].sort();
    }, [apiFacets, contextProducts, selectedFilters]);

    const availableColors = React.useMemo(() => {
        const standardColors = { 'Black': '#000000', 'Grey': '#808080', 'Blue': '#0000FF', 'Navy Blue': '#000080', 'Green': '#008000', 'Brown': '#A52A2A', 'Beige': '#F5F5DC', 'White': '#FFFFFF', 'Red': '#FF0000', 'Olive': '#808000', 'Yellow': '#FFFF00', 'Pink': '#FFC0CB', 'Purple': '#800080', 'Maroon': '#800000', 'Biege': '#F5F5DC', 'Teal': '#008080', 'Rust': '#B7410E', 'Orange': '#FFA500' };
        if (apiFacets?.colors) {
            return apiFacets.colors.map(c => ({ name: c.name, count: c.count, hex: standardColors[c.name] || '#cccccc' }));
        }
        const subset = filterProducts(contextProducts, { ...selectedFilters, colors: [] });
        const counts = {};
        subset.forEach(p => { counts[p.color] = (counts[p.color] || 0) + 1; });
        return Object.keys(counts).map(name => ({ name, count: counts[name], hex: standardColors[name] || '#cccccc' }));
    }, [apiFacets, contextProducts, selectedFilters]);

    const dynamicOptions = {
        brands:       availableBrands,
        categories:   (subCategory && subCategory !== 'All') ? [] : availableCategories,
        colors:       availableColors,
        prices:       ['Rs. 300 to Rs. 5000'],
        discountRange: ['10% and above', '20% and above', '30% and above', '40% and above', '50% and above', '60% and above', '70% and above', '80% and above'],
        kidsGender:   (gender && gender.toLowerCase() === 'kids' && !category && !subCategory) ? ['Boys', 'Girls', 'Unisex'] : []
    };

    // ── 4. Final filtered + sorted + paginated results ────────────────────────
    const filteredProducts  = React.useMemo(() => filterProducts(contextProducts, selectedFilters), [contextProducts, selectedFilters]);
    const sortedProducts    = React.useMemo(() => q ? sortItems(filteredProducts, sortBy) : filteredProducts, [filteredProducts, sortBy, q]);
    const totalPages        = q ? Math.ceil(sortedProducts.length / itemsPerPage) : totalServerPages;
    const displayedProducts = q ? sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : sortedProducts;

    const getSortLabel = (type) => ({ discount: 'Better Discount', priceLow: 'Price: Low to High', priceHigh: 'Price: High to Low' }[type] || 'Recommended');

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className="product-listing-container">
            {/* Sidebar */}
            <div className={`filter-sidebar-wrapper ${isFilterOpen ? 'open' : 'closed'}`}>
                <Filters
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                    availableOptions={dynamicOptions}
                />
            </div>

            {/* Main content */}
            <div className="product-grid-section">

                {/* Header */}
                <div className="listing-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                        <button
                            className={`sandwich-btn ${isFilterOpen ? 'open' : ''}`}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            title={isFilterOpen ? 'Close Filters' : 'Open Filters'}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>

                        <div className="breadcrumbs" style={{ margin: 0 }}>
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
                    </div>

                    {/* "Searching for" label */}
                    {q && (
                        <div className="semantic-search-label">
                            Searching for: <strong>{q}</strong>
                            <span className="semantic-search-count"> — {sortedProducts.length} results</span>
                        </div>
                    )}

                    <div className="listing-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
                        <div className="page-title">
                            {gender ? `${capitalize(gender)} ` : ''}{category || ''} {subCategory || ''} Collections
                            <span className="item-count"> - {sortedProducts.length} items</span>
                        </div>

                        {/* Sort dropdown */}
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
                                    {[['recommended', 'Recommended'], ['discount', 'Better Discount'], ['priceLow', 'Price: Low to High'], ['priceHigh', 'Price: High to Low']].map(([val, label]) => (
                                        <li key={val} className={sortBy === val ? 'active' : ''} onClick={(e) => { e.stopPropagation(); setSortBy(val); handleSortLeave(); }}>
                                            {label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product grid */}
                <div className="product-grid">
                    {apiLoading && (
                        <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#666' }}>
                            {q ? `Searching for "${q}"…` : 'Loading products...'}
                        </div>
                    )}
                    {!apiLoading && apiError && (
                        <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#c00' }}>
                            Failed to load products: {apiError}
                        </div>
                    )}
                    {!apiLoading && !apiError && displayedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {!apiLoading && !apiError && sortedProducts.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', padding: '20px', textAlign: 'center' }}>
                            {q ? `No results for "${q}". Try a different search term.` : 'No products found with the selected filters.'}
                        </div>
                    )}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default ProductListing;
