import React from 'react';
import { Link } from 'react-router-dom';
import './Category.css';

// Placeholder images (Image generation service unavailable)
const categories = [
    { id: 1, label: 'Ethnic Wear', discount: '50-80% OFF', image: require('./images/9764.jpg'), link: '/products?gender=Men&category=Indian%20%26%20Festive%20Wear' },
    { id: 2, label: 'Casual Wear', discount: '40-80% OFF', image: require('./images/1181.jpg'), link: '/products?gender=Men&category=Topwear' },
    { id: 3, label: 'Active Wear', discount: '30-70% OFF', image: require('./images/2150490263.jpg'), link: '/products?gender=Men&subCategory=Track%20Pants%20%26%20Joggers' },
    { id: 4, label: 'Watches', discount: 'UP TO 80% OFF', image: require('./images/watches.jpg'), link: '/products?gender=Accessories&category=Watches' },
    { id: 5, label: 'Coats & Blazers', discount: '40-80% OFF', image: require('./images/5856.jpg'), link: '/products?gender=Men&subCategory=Blazers%20%26%20Coats' },
    { id: 6, label: 'Inners & Sleepwear', discount: '30-80% OFF', image: require('./images/10344.jpg'), link: '/products?gender=Men&category=Innerwear%20%26%20Sleepwear' },
    { id: 7, label: 'Footwear', discount: '30-80% OFF', image: require('./images/6005.jpg'), link: '/products?gender=Men&category=Footwear' },
    { id: 8, label: 'T-Shirts', discount: '30-80% OFF', image: require('./images/2149659069.jpg'), link: '/products?gender=Men&subCategory=T-Shirts' },
    { id: 9, label: 'Shirts', discount: '30-80% OFF', image: require('./images/2150828593.jpg'), link: '/products?gender=Men&subCategory=Casual%20Shirts' },
    { id: 10, label: 'Jeans', discount: '30-80% OFF', image: require('./images/16.jpg'), link: '/products?gender=Men&subCategory=Jeans' },
    { id: 11, label: 'Jackets', discount: '30-80% OFF', image: require('./images/519.jpg'), link: '/products?gender=Men&subCategory=Jackets' },
    { id: 12, label: 'Sarees', discount: '30-80% OFF', image: require('./images/2149400866.jpg'), link: '/products?gender=Women&subCategory=Sarees' },
    { id: 13, label: 'Kurtas', discount: '30-80% OFF', image: require('./images/2148261281.jpg'), link: '/products?gender=Men&subCategory=Kurtas%20%26%20Kurta%20Sets' },
    { id: 14, label: 'Sweaters & Knitwear', discount: '30-80% OFF', image: require('./images/2147735994.jpg'), link: '/products?gender=Men&subCategory=Sweaters' },
    { id: 15, label: 'Office Wear', discount: '30-80% OFF', image: require('./images/2150.jpg'), link: '/products?gender=Men&subCategory=Formal%20Shirts' },
    { id: 16, label: 'Bags & Sunglasses', discount: '30-80% OFF', image: require('./images/2767.jpg'), link: '/products?gender=Accessories' },
    { id: 17, label: 'Wallets & Belts', discount: '30-80% OFF', image: require('./images/9446.jpg'), link: '/products?gender=Accessories&category=Belts,%20Scarves%20%26%20More' },
    { id: 18, label: 'Dresses', discount: '30-80% OFF', image: require('./images/3813.jpg'), link: '/products?gender=Women&subCategory=Dresses' },
    { id: 19, label: 'Makeup', discount: '30-80% OFF', image: require('./images/2148916351.jpg'), link: '/products?gender=Beauty&category=Makeup' },
    { id: 20, label: 'Kids & Baby', discount: '30-80% OFF', image: require('./images/13641.jpg'), link: '/products?gender=Kids' },
    { id: 21, label: 'Home & Living', discount: '30-80% OFF', image: require('./images/2151883537.jpg'), link: '/products' },
    { id: 22, label: 'Caps & Hats', discount: '30-80% OFF', image: require('./images/15090.jpg'), link: '/products?gender=Accessories&subCategory=Caps%20%26%20Hats' },
    { id: 23, label: 'Jewellery', discount: '30-80% OFF', image: require('./images/2149400911.jpg'), link: '/products?gender=Accessories&category=Jewellery' },
    { id: 24, label: 'Fragrances', discount: '30-80% OFF', image: require('./images/2422.jpg'), link: '/products?gender=Beauty&category=Fragrances' },
];

const Category = () => {
    return (
        <div className="category-section">
            <h2 className="category-header">SHOP BY CATEGORY</h2>
            <div className="category-grid">
                {categories.map((cat) => (
                    <Link
                        to={cat.link}
                        key={cat.id}
                        className="category-card"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div className="image-container">
                            <img src={cat.image} alt={cat.label} />
                        </div>
                        <div className="category-info">
                            <h3>{cat.label}</h3>
                            <div className="discount">{cat.discount}</div>
                            <div className="shop-now">Shop Now</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Category;
