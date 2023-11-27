import { WatchedMovie } from "./WatchedMovie";

export const WatchMoviesList = ({ watched, onRemoveFromWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbId}
          movie={movie}
          onRemoveFromWatched={onRemoveFromWatched}
        />
      ))}
    </ul>
  );
};
