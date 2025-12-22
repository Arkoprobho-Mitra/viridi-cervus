import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.Login.css';
import googleIcon from './login.image.container/search.png';
import metaIcon from './login.image.container/meta.png';
import xIcon from './login.image.container/twitter.png';
import loginVideo from './login.image.container/loginscreenvideo.mp4';

const Login = () => {
    return (
        <div className="login-container" >
            <div className="login-split-container">
                <div className="login-banner-side">
                    <div className="banner-content">
                        <video
                            src={loginVideo}
                            autoPlay
                            preload="auto"
                            loop
                            muted
                            playsInline
                            className="background-video"
                        />
                    </div>
                </div>

                <div className="login-form-side">
                    <div className="login-card">
                        <div className="login-logo">
                            <Link to="/">
                                <img src="/image.container/logo1.png" alt="Viridi Cervus Logo" />
                            </Link>
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
                            <span>Or Login In Using</span>
                        </div>

                        <div className="social-login">
                            <button className="social-btn meta">
                                <img src={metaIcon} alt="Meta" />
                            </button>
                            <button className="social-btn X">
                                <img src={xIcon} alt="X" />
                            </button>
                            <button className="social-btn google">
                                <img src={googleIcon} alt="Google" />
                            </button>
                        </div>

                        <p className="signup-link">
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
