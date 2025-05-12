import React from "react";
import { Link } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { BiSolidBible } from "react-icons/bi";
import { useFavoriteBooks } from "../../hooks/useFavoriteBooks";
import "./NavBar.css";

const NavBar = () => {
  const width = useWindowWidth();
  let navigate = useNavigate();
  const { favoriteBooks } = useFavoriteBooks();

  return (
    <nav className="custom-navbar">
      {width < 640 ? (
        <div className="mobile-container">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/intro")}>
                Introduction
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/places")}>
                Places
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/explore")}>
                Favorites
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <ul>
          <li>
            <Link to="/intro">
              <BiSolidBible />
            </Link>
          </li>
          <li>
            <Link to="/intro">Intro</Link>
          </li>
          <li>
            <Link to="/places">Places</Link>
          </li>
          <li>
            <Link to="/explore">Favorites </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
