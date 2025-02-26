import React from "react";

import { useMovieContext } from "../contexts/MovieContext";
import MoviesCard from "../components/MoviesCard";

import "../css/Favorites.css";

const Favorites = () => {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MoviesCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding favorite movies and they will appear here</p>
    </div>
  );
};

export default Favorites;
