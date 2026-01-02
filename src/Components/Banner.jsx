import { useEffect, useState } from "react";
import { fetchData } from "../api/api";

const Banner = ({ lang }) => {
  const [movie, setMovie] = useState(null);

  const truncate = (text, n = 180) => {
  if (!text) return "";
  return text.length > n ? text.slice(0, n) + "..." : text;
};


  useEffect(() => {
    fetchData("originals", lang).then((res) => {
      const randomMovie =
        res.data.results[
          Math.floor(Math.random() * res.data.results.length)
        ];
      setMovie(randomMovie);
    });
  }, [lang]);

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          https://image.tmdb.org/t/p/original${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.name || movie?.title}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <p className="banner__description">
          {truncate(movie?.overview)}
        </p>
      </div>

      <div className="banner--fadeBottom" />
    </div>
  );
};

export default Banner;
