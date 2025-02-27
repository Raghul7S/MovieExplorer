import React from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";

import "../css/NavBar.css";

const NavBar = () => {
  const { favorites } = useMovieContext();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/MovieExplorer">FilmWorld</Link>
      </div>
      <div className="navbar-links">
        <Link to="/MovieExplorer" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
          {favorites.length > 0 && (
            <span className="favorite-badge">{favorites.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
