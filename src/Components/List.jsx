import { useEffect, useRef, useState } from "react";
import { fetchData } from "../api/api";
import languagesText from "../api/Language";

const List = ({ titleKey, param, onMovieClick, lang }) => {
  const [list, setList] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    fetchData(param, lang).then(res =>
      setList(res.data.results)
    );
  }, [param, lang]);

  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -600, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({ left: 600, behavior: "smooth" });
  };

  return (
    <div className="list">
      <h2 className="title">
        {languagesText?.[lang]?.[titleKey] || ""}
      </h2>

      <div className="row-wrapper">
        <button className="arrow left" onClick={scrollLeft}>
          ❮
        </button>

        <div className="row_posters" ref={rowRef}>
          {list.map(item => (
            <img
              key={item.id}
              className="row_poster row_posterLarge"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              onClick={() => onMovieClick(item)}
            />
          ))}
        </div>

        <button className="arrow right" onClick={scrollRight}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default List;
