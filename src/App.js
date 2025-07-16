import React from 'react';
import './App.css';

function App() {
  return (
    <div className='Navbar'>
      
      <div className='logo-container'>
        <img src="/image.container/logo.png" className='logo' alt='logo' />
      </div>
      <div className='nav-links'>
        <div className='categories'>
          <div className='men'  >Men</div>
          <div className='women'  >Women</div>
          <div className='kids'  >Kids</div>
          <div className='beauty'  >Beauty</div>
          <div className='accessories'  >Accessories</div>
          <div className='delivery-address'  >Delivery Address</div>
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

      </div>

    </div>
  );
}

export default App;
