import React from 'react';

const MovieModal = ({ movie, closeModal }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* Close Button */}
        <button className="close-btn" onClick={closeModal}>✕</button>

        {/* Banner */}
        <img
          className="modal-banner"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || movie.name}
         />

        {/* Content */}
        <div className="modal-content">
          <h1>{movie.title || movie.name}</h1>
          <p>{movie.overview}</p>

          <button className="btn-play">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
