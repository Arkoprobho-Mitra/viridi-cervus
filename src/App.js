
import Navbar from './Navbar.container/Navbar.components.jsx';

import './App.css';
import ItemSponsored from './Header.Slideshow.container/Item.sponsored.jsx';
import Category from './Category.container/Category.jsx';
import ItemHistory from 'E:/Shopping website/website/viridi-cervus/src/History.Slideshow.container/ItemHistory.jsx';
import Footer from './Footer.container/Footer.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Signin.Container/Signup.Login.jsx';

import LegalRoutes from './Legal/LegalRoutes.jsx';
import ProductListing from './ProductListing.Container/ProductListing.jsx';
import ProductPage from './ProductPage.Container/Product.Page.jsx';

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
          <Route path="/*" element={<LegalRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
