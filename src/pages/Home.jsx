import React, { useState, useEffect } from "react";

import MoviesCard from "../components/MoviesCard";
import { searchMovies, getPopularMovies } from "../services/api";

import "../css/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPopularMovies = async () => {
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      if (!searchQuery.trim()) {
        await loadPopularMovies();
      } else {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
        setError(null);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => <MoviesCard movie={movie} key={movie.id} />)
          ) : (
            <h2 className="no-results">No results found</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
