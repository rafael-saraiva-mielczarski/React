import { useState } from "react";
import Box from "./layout/Box";
import Header from "./components/Header/Header";
import NumResults from "./components/Header/NumResults";
import SearchBar from "./components/Header/SearchBar";
import MoviesList from "./components/MoviesList";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedSummary from "./components/WatchedSummary";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SelectedMovieDetails from "./components/SelectedMovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectId] = useState(null);
  //Chamando o custom hook, aqui destruturamos o retorno do hook para servir ao que precisamos usar no JSX.
  const { movies, isLoading, error } = useMovies(query);
  //Chamando o segundo custom hook, destruturando o retorno para o caso de uso que serve aqui
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Header>
        <SearchBar
          query={query}
          setQuery={setQuery}
          onChange={(e) => setQuery(e.target.value)}
        />
        <NumResults movies={movies} />
      </Header>
      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
