import axios from 'axios';
const URL = "https://api.themoviedb.org/3"
const API_KEY = "df2bf13f7d3e63d7e60557693d7845da";

const endpoints = {
    originals: "/discover/tv",
    trending: "/trending/all/week",
    now_playing: "/movie/now_playing",
    popular: "/movie/popular",
    top_rated: "/movie/top_rated", 
    upcoming: "/movie/upcoming",
};

const langMap = {
  en: "en-US",
  hi: "hi-IN",
  te: "te-IN",
  ta: "ta-IN",
};

export const fetchData = (param,lang="en") => {             //param  is a prop
    return axios.get(`${URL}${endpoints[param]}?api_key=${API_KEY}&language=${langMap[lang]}`)
}
