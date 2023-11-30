import { OMDB_KEY } from "../config/api-keys";
import { useEffect, useState } from "react";

export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMoviesController = new AbortController();
  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`,
        { signal: fetchMoviesController.signal },
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setMovies(data.Search);
      setError(null);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    callback?.();
    if (query.length < 3) {
      setMovies([]);
      setError(null);
      setIsLoading(false);
      return;
    }
    fetchMovies();
    return () => {
      fetchMoviesController.abort();
      setIsLoading(true);
    };
  }, [query]);
  return { movies, isLoading, error };
};
