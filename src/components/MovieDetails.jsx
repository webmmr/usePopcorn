/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";

const API_KEY = "1a955c05";

const MovieDetails = ({
  selectedMovie,
  onCloseMovieDetail,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isAlreadyRated = watched
    .map((watch) => watch.imdbID)
    .includes(selectedMovie);

  const alreadyRated = watched.find(
    (movie) => movie.imdbID === selectedMovie
  )?.userRating;

  const {
    Title: title,
    Awards: awards,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovieDetail();
        console.log("closing");
      }
    }

    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovieDetail]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedMovie,
      poster,
      title,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      year,
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovieDetail();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovie}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedMovie]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovieDetail}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isAlreadyRated ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to Watched
                    </button>
                  )}
                </>
              ) : (
                <p>You have already rated this movie {alreadyRated} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring : {actors}</p>
            <p>Directed by : {director}</p>
            {awards !== "N/A" ? <p>{awards}</p> : ""}
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
