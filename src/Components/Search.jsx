import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "df2bf13f7d3e63d7e60557693d7845da";

const Search = ({ onMovieClick }) => {
    const navigate = useNavigate()
    const [query, setQuery] = useState("");        
    const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {     
      setResults([]);
      return;     
    }

    const fetchSearch = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
      );
      setResults(res.data.results);
    };

    fetchSearch();
  }, [query]);

  return (
    <div className="search-page">
        <div className="search-top">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ←
        </button>
        </div>
      {/* SEARCH INPUT */}
      <input
        className="search-input"
        type="text"
        placeholder="Search movies, TV shows"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* SEARCH RESULTS */}
      <div className="row_posters">
        {results.map(
          (item) =>
            item.poster_path && (
              <img
                key={item.id}
                className="row_poster row_posterLarge"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                onClick={() => onMovieClick(item)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Search;
