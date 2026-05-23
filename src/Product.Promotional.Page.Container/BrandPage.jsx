
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BrandTemplates } from './BrandTemplates';
import './BrandPage.css';

const API_BASE = process.env.REACT_APP_SPRING_BASE_URL || 'http://localhost:8081';

const BrandPage = () => {
    const { brandName } = useParams();
    const decodedBrandName = decodeURIComponent(brandName);
    const [brandProducts, setBrandProducts] = useState(null); // null = loading

    useEffect(() => {
        fetch(`${API_BASE}/api/products?size=100&page=0&search=${encodeURIComponent(decodedBrandName)}`)
            .then(r => r.json())
            .then(json => {
                const items = json?.data?.content ?? json?.content ?? [];
                setBrandProducts(items);
            })
            .catch(() => setBrandProducts([]));
    }, [decodedBrandName]);

    if (brandProducts === null) {
        return <div className="brand-page-container" style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    }

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

    const templateId = brandProducts[0].brandTemplateId || 1;
    const TemplateComponent = BrandTemplates[templateId] || BrandTemplates[1];

    return (
        <React.Fragment>
            <TemplateComponent brandName={decodedBrandName} products={brandProducts} />
        </React.Fragment>
    );
};

export default BrandPage;
