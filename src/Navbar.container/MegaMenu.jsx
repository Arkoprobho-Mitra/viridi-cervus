import React from 'react';
import { Link } from 'react-router-dom';
import { navbarData } from './navbarData';
import './MegaMenu.css';

const MegaMenu = ({ category, visible }) => {
    if (!visible || !category) return null;

    const lowerCaseCategory = category.toLowerCase();
    const data = navbarData[lowerCaseCategory];

    if (!data) return null;

    return (
        <div className="mega-menu-container">
            <div className="mega-menu-content">
                {data.map((column, index) => (
                    <div key={index} className="mega-menu-column">
                        <h4 className="column-heading">{column.heading}</h4>
                        <ul className="column-list">
                            {column.items.map((item, idx) => (
                                <li key={idx} className="column-item">
                                    <Link
                                        to={`/products?gender=${encodeURIComponent(category)}&category=${encodeURIComponent(column.heading)}&subCategory=${encodeURIComponent(item)}`}
                                        className="menu-link"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MegaMenu;
