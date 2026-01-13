import React from "react";
import { saveRecentlyWatched } from "./Recently";

const MovieModal = ({ movie, closeModal }) => {
  if (!movie) return null;

  const playVideo = () => {
    saveRecentlyWatched(movie); 
    alert(`Now playing: ${movie.title || movie.name}`);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={closeModal}>✕</button>

        <img
          className="modal-banner"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || movie.name}
        />

        <div className="modal-content">
          <h1>{movie.title || movie.name}</h1>
          <p>{movie.overview}</p>

          <button className="btn-play" onClick={playVideo}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
