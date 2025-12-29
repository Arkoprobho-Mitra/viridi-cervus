import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from '../Footer.container/Footer.jsx';

import TermsOfUse from './TermsOfUse.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';
import ContactUs from './ContactUs.jsx';
import FAQ from './FAQ.jsx';
import TermsAndConditions from './TermsAndConditions.jsx';
import TrackOrders from './TrackOrders.jsx';
import ShippingPolicy from './ShippingPolicy.jsx';
import CancellationPolicy from './CancellationPolicy.jsx';
import ReturnsPolicy from './ReturnsPolicy.jsx';
import GrievanceOfficer from './GrievanceOfficer.jsx';

const LegalRoutes = () => {
    return (
        <Routes>
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
    );
};

export default LegalRoutes;
