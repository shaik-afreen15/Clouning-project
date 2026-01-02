import {Routes, Route} from 'react-router-dom'
import React, { Fragment } from 'react'
import { useState } from 'react';
import './App.scss';

import Header from './Components/Header';
import HomeBanner from './Components/HomeBanner';
import Login from './Components/Login';
import Banner from './Components/Banner';
import List from './Components/List';
import MovieModal from './Components/MovieModal';
import Search from './Components/Search';

// import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

const App = () => {
    
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [lang, setLang] = useState("en")

  return (
        <Fragment>
            <Routes> 
               <Route path="/" element={
                <Fragment>
                    <Header lang={lang} setLang={setLang}/>
                    <HomeBanner lang={lang} />
                </Fragment>
               }></Route>
               <Route path="/login" element={
                   <Fragment>
                       <Header lang={lang} setLang={setLang}/>
                       <Login lang ={lang}/>          
                       {/* <Login page={true}/> -----> here we are using props i.e page is here prop,(using props bcoz we are routing by using props this is the one of the method for re using the components) */}
                   </Fragment>
                }></Route>
                 <Route path="/register" element={
                   <Fragment>
                       <Header lang={lang} setLang={setLang}/>
                       <Login lang={lang}/>
                   </Fragment>
                }></Route>
                <Route path="/dashboard" element={
                <Fragment>
                    <Header lang={lang} setLang={setLang} />
                    <Banner lang={lang}/>

                    <List titleKey="originals" param="originals" lang={lang} onMovieClick={setSelectedMovie}/>
                    <List titleKey="trending" param="trending" lang={lang} onMovieClick={setSelectedMovie}/>
                    <List titleKey="nowPlaying" param="now_playing" lang={lang} onMovieClick={setSelectedMovie}/>
                    <List titleKey="popular" param="popular" lang={lang} onMovieClick={setSelectedMovie}/>
                    <List titleKey="topRated" param="top_rated" lang={lang} onMovieClick={setSelectedMovie}/>
                    <List titleKey="upcoming" param="upcoming" lang={lang} onMovieClick={setSelectedMovie}/>

                    {selectedMovie && (
                        <MovieModal movie={selectedMovie} closeModal={() =>setSelectedMovie(null)}/>
                    )}
                </Fragment>
               }></Route>
                <Route path="/search" element={
                    <Fragment>
                        {/* <Header lang={lang} setLang={setLang} /> */}
                        <Search onMovieClick={setSelectedMovie}/>
                        {selectedMovie && (
                            <MovieModal  movie={selectedMovie}
                            closeModal={() =>{setSelectedMovie(null)}}
                            />
                        )}
                    </Fragment>
                }></Route>
            </Routes>
            
        </Fragment>
  )
}

export default App