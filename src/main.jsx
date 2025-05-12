import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Intro from "./views/Intro/Intro";
import Places from "./views/Places/Places";
import Explore from "./views/Explore/Explore";
import NavBar from "./common/NavBar/NavBar";
import { FavoriteBooksProvider } from "./hooks/useFavoriteBooks";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FavoriteBooksProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/intro" element={<Intro />} />
          <Route path="/places" element={<Places />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Router>
    </FavoriteBooksProvider>
  </StrictMode>
);
