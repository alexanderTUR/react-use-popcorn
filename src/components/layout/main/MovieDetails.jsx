import { useEffect, useState } from "react";
import { OMDB_KEY } from "../../../config/api-keys";
import { StarRating } from "../../ui/StarRating/StarRating";
import { Loader } from "../../ui/Loader/Loader";
import { ErrorMessage } from "../../ui/Error/ErrorMessage";

export const MovieDetails = ({
  watched,
  selectedMovieId,
  onCloseMovie,
  onAddToWatched,
}) => {
  const [movieDetails, setMovieDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  const isWatched = watched.some((movie) => movie.imdbId === selectedMovieId);
  let watchedRating = watched.find(
    (movie) => movie.imdbId === selectedMovieId,
  )?.userRating;

  const handleAddToWatched = () => {
    const movie = {
      imdbId: selectedMovieId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    };
    onAddToWatched(movie);
    onCloseMovie();
  };

  const fetchMovieDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${selectedMovieId}`,
      ).catch(() => {
        throw new Error("Failed to fetch movie details");
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setMovieDetails(data);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [selectedMovieId]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of "${title}" movie`} />
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
            {!isWatched ? (
              <div className="rating">
                <StarRating
                  maxRating={10}
                  size={2}
                  color="yellow"
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAddToWatched}>
                    Add to Watched
                  </button>
                )}
              </div>
            ) : (
              <div className="rating">
                <p>You rate this movie with 🌟 {watchedRating}</p>
              </div>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Director: {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
