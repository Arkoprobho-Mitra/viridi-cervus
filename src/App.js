
import Navbar from './Navbar.container/Navbar.components.jsx';

import './App.css';
import ItemSponsored from './Header.Slideshow.container/Item.sponsored.jsx';
import Category from './Category.container/Category.jsx';
import ItemHistory from 'E:/Shopping website/website/viridi-cervus/src/History.Slideshow.container/ItemHistory.jsx';
import PromotionalDeals from './Promotional.Slideshow.container/PromotionalDeals.jsx';
import Footer from './Footer.container/Footer.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Signin.Container/Signup.Login.jsx';

import LegalRoutes from './Legal/LegalRoutes.jsx';
import ProductListing from './ProductListing.Container/ProductListing.jsx';
import ProductPage from './ProductPage.Container/Product.Page.jsx';
import Wishlist from './Wishlist.Container/Wishlist.jsx';
import CartPage from './Cart.Container/CartPage.jsx';

import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <ItemSponsored />
              <PromotionalDeals />
              <ItemHistory />
              <Category />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={
            <>
              <ProductListing />
              <Footer />
            </>
          } />
          <Route path="/product/:id" element={
            <>
              <ProductPage />
              <Footer />
            </>
          } />
          <Route path="/wishlist" element={
            <>
              <Wishlist />
              <Footer />
            </>
          } />
          <Route path="/cart" element={
            <>
              <CartPage />
              <Footer />
            </>
          } />
          <Route path="/*" element={<LegalRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
