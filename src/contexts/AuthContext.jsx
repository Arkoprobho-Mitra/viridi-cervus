import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const loadUser = () => {
        const isAuth = !!localStorage.getItem('isAuthenticated');
        setIsAuthenticated(isAuth);
        
        if (isAuth) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            setCurrentUser(user);
        } else {
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        loadUser();

        // Listen for standard storage and custom userUpdated events
        window.addEventListener('storage', loadUser);
        window.addEventListener('userUpdated', loadUser);

        return () => {
            window.removeEventListener('storage', loadUser);
            window.removeEventListener('userUpdated', loadUser);
        };
    }, []);

    const login = (userData) => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setIsAuthenticated(true);
        setCurrentUser(userData);
        window.dispatchEvent(new Event('userUpdated'));
    };

    const logout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('selectedDeliveryAddress');
        setIsAuthenticated(false);
        setCurrentUser(null);
        window.dispatchEvent(new Event('userUpdated'));
        window.location.href = '/'; // Global refresh optionally
    };

    const updateUser = (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        window.dispatchEvent(new Event('userUpdated'));
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            currentUser,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};
