import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setQuery,
  clearResults,
  clearQuery,  
  fetchSearchResults,
  setFilter,
} from "../redux/searchSlice";

const Search = ({ onMovieClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { query, results, status, filter } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    return () => { 
      dispatch(clearQuery());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      dispatch(clearResults());
      return;
    }

    const delay = setTimeout(() => {
      dispatch(fetchSearchResults(query.trim()));
    }, 400);

    return () => clearTimeout(delay);
  }, [query, dispatch]);

  // Apply filter
  const filteredResults = results.filter((item) => {
    if (filter === "all")
      return item.media_type === "movie" || item.media_type === "tv";

    return item.media_type === filter;
  });

  return (
    <div className="search-page">
      <div className="search-top">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ←
        </button>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search movies, TV shows"
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
      />

      <div className="search-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => dispatch(setFilter("all"))}
        >
          All
        </button>
        <button
          className={filter === "movie" ? "active" : ""}
          onClick={() => dispatch(setFilter("movie"))}
        >
          Movies
        </button>
        <button
          className={filter === "tv" ? "active" : ""}
          onClick={() => dispatch(setFilter("tv"))}
        >
          TV Shows
        </button>
      </div>

      {status === "loading" && <p style={{ color: "white" }}>Searching...</p>}

      <div className="row_posters search-grid">
        {filteredResults.map((item) => {
          const imagePath = item.poster_path || item.profile_path;
          if (!imagePath) return null;

          return (
            <img
              key={`${item.id}-${item.media_type}`}
              className="row_poster row_posterLarge"
              src={`https://image.tmdb.org/t/p/w500${imagePath}`}
              alt={item.title || item.name}
              onClick={() => onMovieClick(item)}
              loading="lazy"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
