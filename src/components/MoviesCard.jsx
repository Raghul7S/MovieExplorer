import React, { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

import "../css/MovieCard.css";

const MoviesCard = ({ movie, isFavoritesScreen }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const favorite = isFavorite(movie.id);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const openModal = () => {
    if (!isFavoritesScreen) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="movie-card" onClick={openModal}>
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              ♥
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              &times;
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="modal-poster"
            />
            <div className="movie-details">
              <div className="movie-title-date">
                <h2>{movie.title}</h2>
                <p className="modal-release-date">
                  Release Date: {movie.release_date}
                </p>
              </div>
              <div className="rating-cont">
                <h4>⭐{movie.vote_average}</h4>
                <h4>Reviews: {movie.vote_count}</h4>
              </div>
            </div>
            <p className="modal-overview">{movie.overview}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MoviesCard;
