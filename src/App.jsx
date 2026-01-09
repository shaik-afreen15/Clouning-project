import React, { Fragment, useState, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

/* LAZY COMPONENTS */
const Header = lazy(() => import("./Components/Header"));
const HomeBanner = lazy(() => import("./Components/HomeBanner"));
const Login = lazy(() => import("./Components/Login"));
const Banner = lazy(() => import("./Components/Banner"));
const List = lazy(() => import("./Components/List"));
const MovieModal = lazy(() => import("./Components/MovieModal"));
const Search = lazy(() => import("./Components/Search"));

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [lang, setLang] = useState("en");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header lang={lang} setLang={setLang} />
            <HomeBanner lang={lang} />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <Header lang={lang} setLang={setLang} />
            <Login lang={lang} />
          </>
        }
      />
      
        <Route
          path="/register"
          element={
            <>
              <Header lang={lang} setLang={setLang} />
              <Login lang={lang} />
            </>
          }
        />
        
      <Route
        path="/dashboard"
        element={
          <>
            <Header lang={lang} setLang={setLang} />
            <Banner lang={lang} />

         <List titleKey="originals" param="originals" lang={lang} onMovieClick={setSelectedMovie} />
         <List titleKey="trending" param="trending" lang={lang} onMovieClick={setSelectedMovie} />
         <List titleKey="nowPlaying" param="now_playing" lang={lang} onMovieClick={setSelectedMovie} />
         <List titleKey="popular" param="popular" lang={lang} onMovieClick={setSelectedMovie} />
         <List titleKey="topRated" param="top_rated" lang={lang} onMovieClick={setSelectedMovie} />
         <List titleKey="upcoming" param="upcoming" lang={lang} onMovieClick={setSelectedMovie} />

   

            {selectedMovie && (
              <MovieModal movie={selectedMovie} closeModal={() => setSelectedMovie(null)} />
            )}
          </>
        }
      />

      <Route
        path="/search"
        element={
          <>
            <Search onMovieClick={setSelectedMovie} />
            {selectedMovie && (
              <MovieModal movie={selectedMovie} closeModal={() => setSelectedMovie(null)} />
            )}
          </>
        }
      />
    </Routes>
  );
};

export default App;
