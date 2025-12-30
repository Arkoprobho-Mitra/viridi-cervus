import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.styles.css';
import MegaMenu from './MegaMenu';
import { AccountDropdown, WishlistDropdown, CartDropdown } from './NavbarDropdowns';

const Navbar = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
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
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <div className='item-containers'>
            <div className='account' onMouseEnter={() => handleItemEnter('account')}>
              Account
              {activeItem === 'account' && <AccountDropdown />}
            </div>
            <div className='wishlist' onMouseEnter={() => handleItemEnter('wishlist')}>
              Wishlist
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