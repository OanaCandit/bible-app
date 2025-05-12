import React, { useEffect, useState, useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./BookSlider.css";

const BookSlider = ({ onBookClick, onAddFavorite, favoriteBooks = [] }) => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/books",
          {
            method: "GET",
            headers: { "api-key": "89fa0ff7d87df53a6c18f7848ab19ebc" },
          }
        );
        const result = await response.json();
        setBooks(result.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    let isDown = false,
      startX,
      scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      slider.scrollLeft = scrollLeft - (x - startX) * 2;
    };

    const stopDragging = () => {
      isDown = false;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("mouseup", stopDragging);
    slider.addEventListener("mouseleave", stopDragging);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
    };
  }, []);

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
    onBookClick(bookId);
  };

  const isFavorite = (bookId) => {
    return favoriteBooks.some((book) => book.id === bookId);
  };

  return (
    <div className="slider-container" ref={sliderRef}>
      {books.map((book) => (
        <div
          key={book.id}
          className={`slider-item ${
            book.id === selectedBookId ? "selected" : ""
          }`}
          onClick={() => handleBookClick(book.id)}
        >
          <p>{book.name}</p>
          <div
            className="favorite-icon"
            onClick={(e) => {
              e.stopPropagation();
              onAddFavorite(book);
            }}
          >
            {isFavorite(book.id) ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookSlider;
