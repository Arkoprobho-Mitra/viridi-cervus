
import Navbar from './Navbar.container/Navbar.components.jsx';

import './App.css';
import ItemSponsored from './Header.Slideshow.container/Item.sponsored.jsx';
import Category from './Category.container/Category.jsx';
import ItemHistory from 'E:/Shopping website/website/viridi-cervus/src/History.Slideshow.container/ItemHistory.jsx';
import Footer from './Footer.container/Footer.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Signin.Container/Signup.Login.jsx';

import TermsOfUse from './Legal/TermsOfUse.jsx';
import PrivacyPolicy from './Legal/PrivacyPolicy.jsx';
import ContactUs from './Legal/ContactUs.jsx';
import FAQ from './Legal/FAQ.jsx';
import TermsAndConditions from './Legal/TermsAndConditions.jsx';
import TrackOrders from './Legal/TrackOrders.jsx';
import ShippingPolicy from './Legal/ShippingPolicy.jsx';
import CancellationPolicy from './Legal/CancellationPolicy.jsx';
import ReturnsPolicy from './Legal/ReturnsPolicy.jsx';
import GrievanceOfficer from './Legal/GrievanceOfficer.jsx';

function App() {
  return (
    <Router>
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
          <Route path="/terms" element={<><TermsOfUse /><Footer /></>} />
          <Route path="/privacy" element={<><PrivacyPolicy /><Footer /></>} />
          <Route path="/contact" element={<><ContactUs /><Footer /></>} />
          <Route path="/faq" element={<><FAQ /><Footer /></>} />
          <Route path="/terms-and-conditions" element={<><TermsAndConditions /><Footer /></>} />
          <Route path="/track-orders" element={<><TrackOrders /><Footer /></>} />
          <Route path="/shipping" element={<><ShippingPolicy /><Footer /></>} />
          <Route path="/cancellation" element={<><CancellationPolicy /><Footer /></>} />
          <Route path="/returns" element={<><ReturnsPolicy /><Footer /></>} />
          <Route path="/grievance" element={<><GrievanceOfficer /><Footer /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
