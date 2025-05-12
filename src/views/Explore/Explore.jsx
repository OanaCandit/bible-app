// Import necessary React hooks and components
import React, { useState } from "react";
import { useFavoriteBooks } from "../../hooks/useFavoriteBooks";
import parse, { domToReact } from "html-react-parser";
import Modal from "react-modal";

// Define the Explore component
const Explore = ({ onBookClick }) => {
  // Use the custom hook to access favorite books and the function to add/remove favorite books
  const { favoriteBooks, addFavoriteBook } = useFavoriteBooks();
  // State to manage the selected book, chapters, and modal visibility
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle the "Read" button click
  const handleReadClick = async (bookId) => {
    try {
      // Fetch book details from the API
      const bookResponse = await fetch(
        `https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/books/${bookId}`,
        {
          method: "GET",
          headers: { "api-key": "89fa0ff7d87df53a6c18f7848ab19ebc" },
        }
      );
      const book = await bookResponse.json();
      setSelectedBook(book.data);

      // Fetch chapters of the book from the API
      const chaptersResponse = await fetch(
        `https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/books/${bookId}/chapters`,
        {
          method: "GET",
          headers: { "api-key": "89fa0ff7d87df53a6c18f7848ab19ebc" },
        }
      );
      const chaptersData = await chaptersResponse.json();
      const chapterIds = chaptersData.data.map((chapter) => chapter.id);

      // Fetch content of each chapter
      const chapterTextPromises = chapterIds.map((chapterId) =>
        fetch(
          `https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/chapters/${chapterId}`,
          {
            method: "GET",
            headers: { "api-key": "89fa0ff7d87df53a6c18f7848ab19ebc" },
          }
        ).then((response) => response.json())
      );

      // Wait for all chapter content to be fetched
      const chaptersResults = await Promise.all(chapterTextPromises);
      const allChapters = chaptersResults.map((result) => result.data);
      setChapters(allChapters);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching book details or chapters:", error);
    }
  };

  // Function to format the content of chapters
  const formatContent = (content) => {
    return parse(content, {
      replace: (domNode) => {
        if (domNode.attribs && domNode.attribs.class === "v") {
          return <span>{domNode.children[0].data}. </span>;
        }
        if (domNode.name === "p") {
          return (
            <p style={{ whiteSpace: "pre-wrap" }}>
              {domToReact(domNode.children)}
            </p>
          );
        }
      },
    });
  };

  console.log("Favorite Books in Explore:", favoriteBooks);

  // Render the component
  return (
    <div className="container mt-5 pt-5">
      <h2>Favorite Books</h2>
      <ul className="list-group">
        {favoriteBooks.length > 0 ? (
          favoriteBooks.map((book) => (
            <li
              key={book.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span onClick={() => onBookClick(book.id)}>{book.name}</span>
              <div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => addFavoriteBook(book)}
                >
                  Unheart
                </button>
                <button
                  className="btn btn-sm ms-2"
                  style={{
                    backgroundColor: "rgb(218, 126, 126)",
                    color: "#fff",
                  }}
                  onClick={() => handleReadClick(book.id)}
                >
                  Read
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item text-center text-muted">
            No favorite books added yet.
          </li>
        )}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Book Content"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            overflow: "auto",
          },
        }}
      >
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={() => setIsModalOpen(false)}
        ></button>
        {selectedBook && (
          <div className="book-details">
            <h3>{selectedBook.name}</h3>
            <p>{selectedBook.description}</p>
            <h4>Chapters:</h4>
            <ul className="list-group">
              {chapters.map((chapter) => (
                <li key={chapter.id} className="list-group-item">
                  <h5>{chapter.title}</h5>
                  <div>{formatContent(chapter.content)}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};
