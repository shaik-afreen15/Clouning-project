import { useEffect, useRef, useState } from "react";
import { fetchData } from "../api/api";
import languagesText from "../api/Language";

const List = ({ titleKey, param, onMovieClick, lang }) => {
  const [list, setList] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetchData(param, lang);
        const results = Array.isArray(res?.data?.results)
          ? res.data.results
          : [];

        if (mounted) setList(results);
      } catch (err) {
        console.error(err);
        setList([]);
      }
    };

    load();

    return () => (mounted = false);
  }, [param, lang]);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -600, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 600, behavior: "smooth" });
  };

  return (
    <div className="list">
      <h2 className="title">
        {languagesText?.[lang]?.[titleKey] || ""}
      </h2>

      <div className="row-wrapper">
        <button className="arrow left" onClick={scrollLeft}>❮</button>

        <div className="row_posters" ref={rowRef}>
          {list.map(
            (item) =>
              item.poster_path && (
                <img
                  key={item.id}
                  className="row_poster row_posterLarge"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  onClick={() => onMovieClick(item)}
                  loading="lazy"
                />
              )
          )}
        </div>

        <button className="arrow right" onClick={scrollRight}>❯</button>
      </div>
    </div>
  );
};

export default List;
