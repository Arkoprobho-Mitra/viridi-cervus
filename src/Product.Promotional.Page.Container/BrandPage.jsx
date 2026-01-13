
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../ProductListing.Container/productsData';
import { BrandTemplates } from './BrandTemplates';
import './BrandPage.css';

const BrandPage = () => {
    const { brandName } = useParams();
    const decodedBrandName = decodeURIComponent(brandName);

    // Filter products for this brand
    const brandProducts = products.filter(
        p => p.brand.toLowerCase() === decodedBrandName.toLowerCase()
    );

    if (brandProducts.length === 0) {
        return (
            <div className="brand-page-container" style={{ padding: '40px', textAlign: 'center' }}>
                <h2>No products found for {decodedBrandName}</h2>
                <Link to="/products" style={{ textDecoration: 'none', color: 'blue', marginTop: '20px', display: 'inline-block' }}>
                    Continue Shopping
                </Link>
            </div>
        );
    }

    // Get Template ID from the first product (assuming all products of a brand share the template)
    // Default to 1 if undefined
    const templateId = brandProducts[0].brandTemplateId || 1;

    // Select the component
    const TemplateComponent = BrandTemplates[templateId] || BrandTemplates[1];

    return (
        <React.Fragment>
            <TemplateComponent brandName={decodedBrandName} products={brandProducts} />
        </React.Fragment>
    );
};

export default BrandPage;
