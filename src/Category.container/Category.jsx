import React from 'react';
import './Category.css';

// Placeholder images (Image generation service unavailable)
const categories = [
    { id: 1, label: 'Ethnic Wear', discount: '50-80% OFF', image: require('./images/9764.jpg') },
    { id: 2, label: 'Casual Wear', discount: '40-80% OFF', image: require('./images/1181.jpg') },
    { id: 3, label: 'Active Wear', discount: '30-70% OFF', image: require('./images/2150490263.jpg') },
    { id: 4, label: 'Watches', discount: 'UP TO 80% OFF', image: require('./images/watches.jpg') },
    { id: 5, label: 'Coats & Blazers', discount: '40-80% OFF', image: require('./images/5856.jpg') },
    { id: 6, label: 'Inners & Sleepwear', discount: '30-80% OFF', image: require('./images/10344.jpg') },
    { id: 7, label: 'Footwear', discount: '30-80% OFF', image: require('./images/6005.jpg') },
    { id: 8, label: 'T-Shirts', discount: '30-80% OFF', image: require('./images/2149659069.jpg') },
    { id: 9, label: 'Shirts', discount: '30-80% OFF', image: require('./images/2150828593.jpg') },
    { id: 10, label: 'Jeans', discount: '30-80% OFF', image: require('./images/16.jpg') },
    { id: 11, label: 'Jackets', discount: '30-80% OFF', image: require('./images/519.jpg') },
    { id: 12, label: 'Sarees', discount: '30-80% OFF', image: require('./images/2149400866.jpg') },
    { id: 13, label: 'Kurtas', discount: '30-80% OFF', image: require('./images/2148261281.jpg') },
    { id: 14, label: 'Sweaters & Knitwear', discount: '30-80% OFF', image: require('./images/2147735994.jpg') },
    { id: 15, label: 'Office Wear', discount: '30-80% OFF', image: require('./images/2150.jpg') },
    { id: 16, label: 'Bags & Sunglasses', discount: '30-80% OFF', image: require('./images/2767.jpg') },
    { id: 17, label: 'Wallets & Belts', discount: '30-80% OFF', image: require('./images/9446.jpg') },
    { id: 18, label: 'Dresses', discount: '30-80% OFF', image: require('./images/3813.jpg') },
    { id: 19, label: 'Makeup', discount: '30-80% OFF', image: require('./images/2148916351.jpg') },
    { id: 20, label: 'Kids & Baby', discount: '30-80% OFF', image: require('./images/13641.jpg') },
    { id: 21, label: 'Home & Living', discount: '30-80% OFF', image: require('./images/2151883537.jpg') },
    { id: 22, label: 'Caps & Hats', discount: '30-80% OFF', image: require('./images/15090.jpg') },
    { id: 23, label: 'Jewellery', discount: '30-80% OFF', image: require('./images/2149400911.jpg') },
    { id: 24, label: 'Fragrances', discount: '30-80% OFF', image: require('./images/2422.jpg') },
];

const Category = () => {
    return (
        <div className="category-section">
            <h2 className="category-header">SHOP BY CATEGORY</h2>
            <div className="category-grid">
                {categories.map((cat) => (
                    <div key={cat.id} className="category-card">
                        <div className="image-container">
                            <img src={cat.image} alt={cat.label} />
                        </div>
                        <div className="category-info">
                            <h3>{cat.label}</h3>
                            <div className="discount">{cat.discount}</div>
                            <div className="shop-now">Shop Now</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
