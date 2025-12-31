import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.styles.css';
import MegaMenu from './MegaMenu';
import { AccountDropdown, WishlistDropdown, CartDropdown } from './NavbarDropdowns';

import { products } from '../ProductListing.Container/productsData';

const Navbar = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
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
    setActiveItem(null);
  };

  const handleItemEnter = (item) => {
    setActiveItem(item);
    setActiveCategory(null); // Close mega menu when hovering items
  };

  const handleItemLeave = () => {
    setActiveItem(null);
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
            <div className='delivery-address'>Delivery Address</div>
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
              {/* Show User Name if logged in, else Profile */}
              {localStorage.getItem('currentUser')
                ? JSON.parse(localStorage.getItem('currentUser')).name.split(' ')[0]
                : 'Profile'
              }
              {activeItem === 'account' && <AccountDropdown />}
            </div>
            <div className='wishlist' onMouseEnter={() => handleItemEnter('wishlist')}>
              <Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                Wishlist
              </Link>
              {activeItem === 'wishlist' && <WishlistDropdown />}
            </div>
            <div className='cart' onMouseEnter={() => handleItemEnter('cart')}>
              Cart
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