import React, { useState } from "react";

const Favorites = ({ favoriteBooks, onRemoveFavorite }) => {
  return (
    <div className="favorites-container">
      <h2>Favorite Books</h2>
      <ul>
        {favoriteBooks.map((book) => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => onRemoveFavorite(book.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
