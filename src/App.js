import { useState } from "react";
import { NavBar } from "./components/layout/navbar/NavBar";
import { Main } from "./components/layout/main/Main";
import { Logo } from "./components/layout/navbar/Logo";
import { Search } from "./components/layout/navbar/Search";
import { NumResults } from "./components/layout/navbar/NumResults";
import { MoviesList } from "./components/layout/main/MoviesList";
import { Box } from "./components/layout/main/Box";
import { WatchedSummary } from "./components/layout/main/WatchedSummary";
import { WatchMoviesList } from "./components/layout/main/WatchMoviesList";
import { Loader } from "./components/ui/Loader/Loader";
import { ErrorMessage } from "./components/ui/Error/ErrorMessage";
import { MovieDetails } from "./components/layout/main/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleSelectMovie = (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  const handleAddToWatched = (movie) => {
    setWatched((prevWatched) => [...prevWatched, movie]);
  };

  const handleRemoveFromWatched = (id) => {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbId !== id),
    );
  };

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
              watched={watched}
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              onAddToWatched={handleAddToWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchMoviesList
                watched={watched}
                onRemoveFromWatched={handleRemoveFromWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
