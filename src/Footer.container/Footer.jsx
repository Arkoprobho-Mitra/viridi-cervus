import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>ONLINE SHOPPING</h4>
                    <ul>
                        <li><Link to="/products?gender=Men">Men</Link></li>
                        <li><Link to="/products?gender=Women">Women</Link></li>
                        <li><Link to="/products?gender=Kids">Kids</Link></li>
                        <li><Link to="/products?gender=Beauty">Beauty</Link></li>
                        <li><Link to="/products?gender=Accessories">Accessories</Link></li>
                        <li><Link to="/giftcards">Gift Cards</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>CUSTOMER POLICIES</h4>
                    <ul>
                        <li><Link to="/contact" target="_blank" rel="noopener noreferrer">Contact Us</Link></li>
                        <li><Link to="/faq" target="_blank" rel="noopener noreferrer">FAQ</Link></li>
                        <li><Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer">T&C</Link></li>
                        <li><Link to="/terms" target="_blank" rel="noopener noreferrer">Terms Of Use</Link></li>
                        <li><Link to="/track-orders" target="_blank" rel="noopener noreferrer">Track Orders</Link></li>
                        <li><Link to="/shipping" target="_blank" rel="noopener noreferrer">Shipping</Link></li>
                        <li><Link to="/cancellation" target="_blank" rel="noopener noreferrer">Cancellation</Link></li>
                        <li><Link to="/returns" target="_blank" rel="noopener noreferrer">Returns</Link></li>
                        <li><Link to="/privacy" target="_blank" rel="noopener noreferrer">Privacy policy</Link></li>
                        <li><Link to="/grievance" target="_blank" rel="noopener noreferrer">Grievance Officer</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>EXPERIENCE VIRIDI APP ON MOBILE</h4>
                    <div className="app-links">
                        {/* Placeholder for App Store Buttons. In a real scenario, you'd use images.
                             Using styled buttons with text for now to mimic the layout. */}
                        <div className="store-badge-container">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="store-badge" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="store-badge" />
                        </div>
                    </div>

                    <h4 className="keep-in-touch-header">KEEP IN TOUCH</h4>
                    <div className="social-links">
                        {/* Using text specific icons would require an icon library. Using simple text/placeholders for now. */}
                        <span className="social-icon">Facebook</span>
                        <span className="social-icon">Twitter</span>
                        <span className="social-icon">Youtube</span>
                        <span className="social-icon">Instagram</span>
                    </div>
                </div>
                <div className="footer-section useful-links">
                    <h4>USEFUL LINKS</h4>
                    <ul>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/sitemap">Site Map</Link></li>
                        <li><Link to="/corporate-info">Corporate Information</Link></li>
                        <li><Link to="/whitehat">Whitehat</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="popular-searches">
                    <h4>POPULAR SEARCHES</h4>
                    <p>
                        Makeup | Dresses For Girls | T-Shirts | Sandals | Headphones | Babydolls | Blazers For Men | Handbags | Ladies Watches | Bags | Sport Shoes | Reebok Shoes | Puma Shoes | Boxers | Wallets | Tops | Earrings | Fastrack Watches | Kurtis | Nike | Smart Watches | Titan Watches | Designer Blouse | Gowns | Rings | Cricket Shoes | Forever 21 | Eye Makeup | Photo Frames | Punjabi Suits | Bikini | Lipstick | Saree | Watches | Dresses | Lehenga | Nike Shoes | Goggles | Bras | Suit | Chinos | Shoes | Adidas Shoes | Woodland Shoes | Jewellery | Designers Sarees
                    </p>
                </div>

                <div className="footer-copyright">
                    <div className="footer-logo">
                        <img src="/image.container/logo1.png" alt="Viridi Cervus Logo" />
                        <span>Viridi Cervus</span>
                    </div>
                    <p className="copyright-text">© 2025 www.viridicervus.com. All rights reserved.</p>
                    <p className="company-info">A Viridi Cervus Company</p>
                </div>

                <div className="seo-text">
                    <h4>VIRIDI CERVUS: THE PREMIER ONLINE FASHION DESTINATION</h4>
                    <p>
                        Viridi Cervus is your one-stop destination for all things fashion and lifestyle. Being host to a wide array of merchandise including clothing, footwear, accessories, jewelry, personal care products and more, it is time to redefine your style statement with our treasure-trove of trendy items. Our online store brings you the latest in designer products straight out of fashion houses. You can shop online at Viridi Cervus from the comfort of your home and get your favorites delivered right to your doorstep.
                    </p>

                    <h4>SHOP ONLINE AT VIRIDI CERVUS WITH COMPLETE CONVENIENCE</h4>
                    <p>
                        Another reason why Viridi Cervus is the best of all online stores is the complete convenience that it offers. You can view your favorite brands with price options for different products in one place. A user-friendly interface will guide you through your selection process. Comprehensive size charts, product information and high-resolution images help you make the best buying decisions. You also have the freedom to choose your payment options, be it card or cash-on-delivery. The 30-day returns policy gives you more power as a buyer. Additionally, the try-and-buy option for select products takes customer-friendliness to the next level. Enjoy the hassle-free experience as you shop comfortably from your home or your workplace. You can also shop for your friends, family and loved-ones and avail our gift services for special occasions.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
