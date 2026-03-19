import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

export const CardContext = createContext();

export const useCards = () => useContext(CardContext);

export const CardProvider = ({ children }) => {
    const { isAuthenticated, currentUser, updateUser } = useAuth();
    const [cards, setCards] = useState([]);

    // Sync normalized cards when currentUser changes
    useEffect(() => {
        if (isAuthenticated && currentUser) {
            setCards(currentUser.savedCards || []);
        } else {
            setCards([]);
        }
    }, [isAuthenticated, currentUser]);

    const addCard = (newCard) => {
        if (!currentUser) return;
        const updatedCards = [...cards, newCard];
        updateUser({ ...currentUser, savedCards: updatedCards });
    };

    const deleteCard = (cardIdToDelete) => {
        if (!currentUser) return;
        const updatedCards = cards.filter(card => card.id !== cardIdToDelete);
        updateUser({ ...currentUser, savedCards: updatedCards });
    };

    return (
        <CardContext.Provider value={{
            cards,
            addCard,
            deleteCard,
            isAuthenticated,
            currentUser
        }}>
            {children}
        </CardContext.Provider>
    );
};
