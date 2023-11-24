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
import { StarRating } from "./components/ui/StarRating/StarRating";
import { OMDB_KEY } from "./config/api-keys";

export const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=star wars`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.Search);
      });
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <StarRating maxRating={5} color="yellow" size={3} defaultRating={3} />
      <Main>
        <Box>
          <MoviesList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
