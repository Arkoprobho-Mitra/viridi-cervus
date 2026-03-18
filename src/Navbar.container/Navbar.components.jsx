import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.styles.css';
import MegaMenu from './MegaMenu';
import { AccountDropdown, WishlistDropdown, CartDropdown, AddressDropdown } from './NavbarDropdowns';
import { useAddress } from '../contexts/AddressContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

import { products } from '../ProductListing.Container/productsData';

const Navbar = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [userName, setUserName] = useState('Profile');

  const { selectedAddress, isAuthenticated } = useAddress();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  let deliveryAddressLabel = 'Delivery Address';
  if (isAuthenticated && selectedAddress) {
    if (typeof selectedAddress === 'string') {
      deliveryAddressLabel = `Deliver to ${selectedAddress.substring(0, 15)}...`;
    } else {
      const location = selectedAddress.city || selectedAddress.locality || selectedAddress.address || 'Location';
      deliveryAddressLabel = `Deliver to ${location} - ${selectedAddress.pincode}`;
    }
  }

  useEffect(() => {
    const updateCounts = () => {
      const isAuth = localStorage.getItem('isAuthenticated');
      const currentUser = isAuth ? JSON.parse(localStorage.getItem('currentUser')) : null;

      // Update User Name
      if (isAuth && currentUser && currentUser.name) {
        setUserName(currentUser.name.split(' ')[0]);
      } else {
        setUserName('Profile');
      }
    };

    updateCounts();
    // Listen for events that change data
    window.addEventListener('userUpdated', updateCounts);
    window.addEventListener('storage', updateCounts);

    return () => {
      window.removeEventListener('userUpdated', updateCounts);
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setShowSuggestions(false);
      const query = searchQuery.trim();

      // Track Search History
      const auth = localStorage.getItem('isAuthenticated');
      const currentUser = auth ? JSON.parse(localStorage.getItem('currentUser')) : null;
      const searchKey = auth && currentUser ? `search_history_${currentUser.email}` : 'search_history_guest';

      const history = JSON.parse(localStorage.getItem(searchKey)) || [];
      const newHistory = [query, ...history.filter(term => term !== query)].slice(0, 10);
      localStorage.setItem(searchKey, JSON.stringify(newHistory));
      window.dispatchEvent(new Event('historyUpdated'));

      // Check if the query is a Brand
      const uniqueBrands = [...new Set(products.map(p => p.brand.toLowerCase()))];
      if (uniqueBrands.includes(query.toLowerCase())) {
        // Find the exact casing from products for better display in URL, though matching is lowercase
        const brandMatch = products.find(p => p.brand.toLowerCase() === query.toLowerCase()).brand;
        navigate(`/promotions/${encodeURIComponent(brandMatch)}`);
      } else {
        navigate(`/products?search=${encodeURIComponent(query)}`);
      }
    }
  };


  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.trim()) {
      const searchTerms = val.toLowerCase().trim().split(/\s+/);

      const filtered = products.filter(product => {
        // combine searchable fields
        const productText = `${product.title} ${product.brand} ${product.category} ${product.group || ''}`.toLowerCase();

        // Check if ALL search terms are present as word stats (prevent 'men' matching 'women')
        return searchTerms.every(term => {
          try {
            // \b matches word boundary, so 'men' matches 'men' or 'men-s' but not 'women'
            const regex = new RegExp(`\\b${term}`, 'i');
            return regex.test(productText);
          } catch (err) {
            // Fallback for special regex characters if needed, or simple include
            return productText.includes(term);
          }
        });
      }).slice(0, 8);

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false);
    navigate(`/product/${productId}`);
  };

  const handleMouseEnter = (category) => {
    setActiveCategory(category);
    setActiveItem(null); // Close item dropdowns when hovering categories
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
    if (!isAddressModalOpen) {
      setActiveItem(null);
    }
  };

  const handleItemEnter = (item) => {
    setActiveItem(item);
    setActiveCategory(null); // Close mega menu when hovering items
  };

  const handleItemLeave = () => {
    // Only close if modal is NOT open
    if (!isAddressModalOpen) {
      setActiveItem(null);
    }
  };

  return (
    <div className='Navbar' onMouseLeave={handleMouseLeave}>

      <div className='navbar-content'>
        <div className='logo-container'>
          <Link to="/">
            <img src="/image.container/logo1.png" className='logo' alt='Viridi Cervus Logo' />
          </Link>
        </div>
        <div className='nav-links'>
          <div className='categories'>
            <div className='men' onMouseEnter={() => handleMouseEnter('men')}>Men</div>
            <div className='women' onMouseEnter={() => handleMouseEnter('women')}>Women</div>
            <div className='kids' onMouseEnter={() => handleMouseEnter('kids')}>Kids</div>
            <div className='beauty' onMouseEnter={() => handleMouseEnter('beauty')}>Beauty</div>
            <div className='accessories' onMouseEnter={() => handleMouseEnter('accessories')}>Accessories</div>
            <div className='delivery-address' style={{ position: 'relative' }} onMouseEnter={() => handleItemEnter('address')}>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                {deliveryAddressLabel}
              </div>
              {(activeItem === 'address' || isAddressModalOpen) && (
                <AddressDropdown
                  isOpen={isAddressModalOpen}
                  setIsOpen={setIsAddressModalOpen}
                />
              )}
            </div>
          </div>
          <div className='search'>
            <input
              type='text'
              className='search-box'
              placeholder='Search...'
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearch}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className='search-suggestions'>
                {suggestions.map(product => (
                  <li
                    key={product.id}
                    className='suggestion-item'
                    onClick={() => handleSuggestionClick(product.id)}
                  >
                    <span className="suggestion-title">{product.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='item-containers'>
            <div className='account' onMouseEnter={() => handleItemEnter('account')}>
              {/* Show User Name based on state */}
              {userName}
              {activeItem === 'account' && <AccountDropdown />}
            </div>
            <div className='wishlist' onMouseEnter={() => handleItemEnter('wishlist')}>
              <Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}>
                Wishlist
                {wishlistCount > 0 && <span className="nav-count-badge">{wishlistCount}</span>}
              </Link>
              {activeItem === 'wishlist' && <WishlistDropdown />}
            </div>
            <div className='cart' onMouseEnter={() => handleItemEnter('cart')}>
              <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}>
                Cart
                {cartCount > 0 && <span className="nav-count-badge">{cartCount}</span>}
              </Link>
              {activeItem === 'cart' && <CartDropdown />}
            </div>
          </div>

          {/* Mega Menu Dropdown */}
          <MegaMenu category={activeCategory} visible={!!activeCategory} />

        </div>
      </div>
    </div>
  );
}

export default Navbar;