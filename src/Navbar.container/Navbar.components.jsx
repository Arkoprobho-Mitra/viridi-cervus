import React, { useState } from 'react';
import './Navbar.styles.css';
import MegaMenu from './MegaMenu';

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleMouseEnter = (category) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <div className='Navbar' onMouseLeave={handleMouseLeave}>

      <div className='logo-container'>
        <img src="/image.container/logo.png" className='logo' alt='Viridi Cervus Logo' />
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
          <input type='text' className='search-box' placeholder='Search...' />
        </div>
        <div className='item-containers'>
          <div className='account'>Account</div>
          <div className='orders'>Orders</div>
          <div className='wishlist'>Wishlist</div>
          <div className='cart'>Cart</div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu category={activeCategory} visible={!!activeCategory} />

      </div>
    </div>
  );
}

export default Navbar;