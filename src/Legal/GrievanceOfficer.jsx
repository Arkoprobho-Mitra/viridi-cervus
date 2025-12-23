import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LegalPages.css';

const GrievanceOfficer = () => {
    const navigate = useNavigate();

    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Grievance Officer</h1>
                <p className="last-updated">In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:</p>

                <div className="legal-sections">
                    <section>
                        <h2>Contact Details</h2>
                        <p><strong>Name:</strong> Mr. Arkom Mitra</p>
                        <p><strong>Designation:</strong> Senior Manager - Customer Experience</p>
                        <p><strong>Address:</strong> Viridi Cervus Pvt. Ltd., 123 Fashion Street, Tech Park, Bangalore, Karnataka - 560001</p>
                        <p><strong>Phone:</strong> +91 987 654 3210</p>
                        <p><strong>Email:</strong> grievance.officer@viridicervus.com</p>
                        <p><strong>Time:</strong> Mon - Sat (9:00 - 18:00)</p>
                    </section>

                    <section>
                        <h2>Grievance Redressal</h2>
                        <p>If you have any questions or grievances regarding our products or services, you can reach out to our Grievance Officer. We are committed to resolving your concerns promptly and effectively.</p>
                    </section>

                    <button className="continue-btn" onClick={() => window.close()}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default GrievanceOfficer;
