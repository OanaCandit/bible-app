import React, { createContext, useContext, useState } from "react";

// Create a context for favorite books
const FavoriteBooksContext = createContext();

// Custom hook to use the FavoriteBooksContext
export const useFavoriteBooks = () => {
  return useContext(FavoriteBooksContext);
};

// Provider component to manage favorite books state and provide context value
export const FavoriteBooksProvider = ({ children }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  // Function to add or remove a book from the favorites list
  const addFavoriteBook = (book) => {
    setFavoriteBooks((prevFavorites) => {
      // Check if the book is already in the favorites list
      const updatedFavorites = prevFavorites.some(
        (favBook) => favBook.id === book.id
      )
        ? prevFavorites.filter((favBook) => favBook.id !== book.id)
        : [...prevFavorites, book];
      console.log("Updated Favorites:", updatedFavorites);
      return updatedFavorites;
    });
  };

  return (
    <FavoriteBooksContext.Provider value={{ favoriteBooks, addFavoriteBook }}>
      {children}
    </FavoriteBooksContext.Provider>
  );
};

export default useFavoriteBooks;
