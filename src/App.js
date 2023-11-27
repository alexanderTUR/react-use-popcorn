import { useEffect, useState } from "react";
import { NavBar } from "./components/layout/navbar/NavBar";
import { Main } from "./components/layout/main/Main";
import { Logo } from "./components/layout/navbar/Logo";
import { Search } from "./components/layout/navbar/Search";
import { NumResults } from "./components/layout/navbar/NumResults";
import { MoviesList } from "./components/layout/main/MoviesList";
import { Box } from "./components/layout/main/Box";
import { WatchedSummary } from "./components/layout/main/WatchedSummary";
import { WatchMoviesList } from "./components/layout/main/WatchMoviesList";
import { OMDB_KEY } from "./config/api-keys";
import { Loader } from "./components/ui/Loader/Loader";
import { ErrorMessage } from "./components/ui/Error/ErrorMessage";
import { MovieDetails } from "./components/layout/main/MovieDetails";

export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedMovieId(null);
  };

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`,
      ).catch(() => {
        throw new Error("Failed to fetch movies");
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setMovies(data.Search);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
