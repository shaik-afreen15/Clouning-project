import { useEffect, useRef, useState } from "react";
import { fetchData } from "../api/api";
import languagesText from "../api/Language";
import {
  getRecentlyWatched,
  deleteRecentlyWatched,
} from "../Components/Recently";

const List = ({ titleKey, param, onMovieClick, lang }) => {
  const [list, setList] = useState([]);
  const [recent, setRecent] = useState([]);
  const [showRecentArrows, setShowRecentArrows] = useState(false);

  const rowRef = useRef(null);
  const recentRef = useRef(null);

  // Fetch API movies
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

  // Load recently watched ONLY on originals row
  useEffect(() => {
    if (param === "originals") {
      setRecent(getRecentlyWatched());

      const handler = () => setRecent(getRecentlyWatched());
      window.addEventListener("recently-updated", handler);

      return () => window.removeEventListener("recently-updated", handler);
    }
  }, [param]);

  // Show arrows only when recently row overflows
  useEffect(() => {
    if (param === "originals" && recentRef.current) {
      const el = recentRef.current;

      const checkOverflow = () => {
        setShowRecentArrows(el.scrollWidth > el.clientWidth);
      };

      checkOverflow();
      window.addEventListener("resize", checkOverflow);

      return () => window.removeEventListener("resize", checkOverflow);
    }
  }, [recent, param]);

  const handleDelete = (id) => {
    deleteRecentlyWatched(id);
    setRecent(getRecentlyWatched());
  };

  const scrollLeft = (ref) => {
    ref.current?.scrollBy({ left: -600, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current?.scrollBy({ left: 600, behavior: "smooth" });
  };

  return (
    <div className="list">

      {/* RECENTLY WATCHED ONLY ABOVE ORIGINALS */}
      {param === "originals" && recent.length > 0 && (
        <>
          <h2 className="title">Recently Watched</h2>

          <div className="row-wrapper">
            {showRecentArrows && (
              <button className="arrow left" onClick={() => scrollLeft(recentRef)}>
                ❮
              </button>
            )}

            <div className="row_posters" ref={recentRef}>
              {recent.map((item) => (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginRight: "10px",
                  }}
                >
                  <img
                    className="row_poster row_posterLarge"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    onClick={() => onMovieClick(item)}
                  />

                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "6px",
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "22px",
                      height: "22px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {showRecentArrows && (
              <button className="arrow right" onClick={() => scrollRight(recentRef)}>
                ❯
              </button>
            )}
          </div>
        </>
      )}

      {/* NORMAL CATEGORY ROW */}
      <h2 className="title">
        {languagesText?.[lang]?.[titleKey] || ""}
      </h2>

      <div className="row-wrapper">
        <button className="arrow left" onClick={() => scrollLeft(rowRef)}>❮</button>

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

        <button className="arrow right" onClick={() => scrollRight(rowRef)}>❯</button>
      </div>
    </div>
  );
};

export default List;
