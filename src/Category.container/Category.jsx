import React from 'react';
import './Category.css';

// Placeholder images (Image generation service unavailable)
const categories = [
    { id: 1, label: 'Ethnic Wear', discount: '50-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Ethnic+Wear' },
    { id: 2, label: 'Casual Wear', discount: '40-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Casual+Wear' },
    { id: 3, label: 'Activewear', discount: '30-70% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Activewear' },
    { id: 4, label: 'Watches', discount: 'UP TO 80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Watches' },
    { id: 5, label: 'Western Wear', discount: '40-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Western+Wear' },
    { id: 6, label: 'Sports Wear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Sports+Wear' },
    { id: 7, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 8, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 9, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 10, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 11, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 12, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 13, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 14, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 15, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 16, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 17, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 18, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 19, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
    { id: 20, label: 'Footwear', discount: '30-80% OFF', image: 'https://placehold.co/430x660/3e1c08/FFF?text=Footwear' },
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
