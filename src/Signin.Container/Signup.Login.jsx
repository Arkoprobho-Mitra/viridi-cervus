import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">
                    <img src="/image.container/logo1.png" alt="Viridi Cervus Logo" />
                </div>
                <h2>Welcome Back</h2>
                <p className="login-subtitle">Login to your account</p>

                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email or Mobile Number</label>
                        <input type="text" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <div className="form-actions">
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>
                    <button type="submit" className="login-btn-primary">LOGIN</button>
                </form>

                <div className="divider">
                    <span>OR CONTINUE WITH</span>
                </div>

                <div className="social-login">
                    <button className="social-btn google">
                        <img src="./login.image.container/search.png" alt="Google" />
                    </button>
                    <button className="social-btn meta">
                        <img src="./login.image.container/meta.png" alt="Meta" />
                    </button>
                    <button className="social-btn X">
                        <img src="./login.image.container/twitter.png" alt="X" />
                    </button>
                </div>

                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
