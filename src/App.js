
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

import MyAccount from './Account.Container/MyAccount.jsx';
import Orders from './Account.Container/Orders.jsx';
import GiftCards from './Account.Container/GiftCards.jsx';
import ContactUs from './Account.Container/ContactUs.jsx';
import ViridiCredit from './Account.Container/ViridiCredit.jsx';
import Coupons from './Account.Container/Coupons.jsx';
import SavedCards from './Account.Container/SavedCards.jsx';
import SavedAddresses from './Account.Container/SavedAddresses.jsx';
import CheckoutPage from './Checkout.Container/CheckoutPage.jsx';
import PaymentPage from './Checkout.Container/PaymentPage.jsx';

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

          <Route path="/account" element={<><MyAccount /><Footer /></>} />
          <Route path="/orders" element={<><Orders /><Footer /></>} />
          <Route path="/gift-cards" element={<><GiftCards /><Footer /></>} />
          <Route path="/contact-us" element={<><ContactUs /><Footer /></>} />
          <Route path="/viridi-credit" element={<><ViridiCredit /><Footer /></>} />
          <Route path="/coupons" element={<><Coupons /><Footer /></>} />
          <Route path="/saved-cards" element={<><SavedCards /><Footer /></>} />
          <Route path="/saved-addresses" element={<><SavedAddresses /><Footer /></>} />
          <Route path="/checkout" element={<><CheckoutPage /><Footer /></>} />
          <Route path="/payment" element={<><PaymentPage /><Footer /></>} />

          <Route path="/*" element={<LegalRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
