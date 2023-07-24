/* eslint-disable react/prop-types */
const WatchList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating.toFixed(2)}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating.toFixed(2)}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
          <button
            className="btn-delete"
            onClick={() => onDeleteWatched(movie.imdbID)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default WatchList;
