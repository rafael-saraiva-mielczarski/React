import { useEffect, useState } from "react";
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

const tempMovieData = [
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

const tempWatchedData = [
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
const KEY = "f2ca383d";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectId] = useState(null);

  //   useEffect(() => {
  // como o dependency array esta vazio, só renderiza uma vez quando o componente é inicializado
  //     console.log("Depois do render inicial");
  //   }, []);

  //   useEffect(() => {
  // como não tem o dependency array, renderiza toda vez que algo acontecer
  //     console.log("Depois de todo render");
  //   });

  //   useEffect(() => {
  // como o depedency array esta sincronizado com um estado, vai renderizar toda vez que o estado for alterado
  //     console.log("Render quando o query mudar");
  //   }, [query]);

  // trabalhe durante o render, relacionado com o DOM
  //   console.log("Durante o render");

  //useEffect é um hook para selecionar quando um effect tem que ocorrer, só seta o Movies quando o componente é iniciliazado
  useEffect(() => {
    //como o useEffeect vai rodar no mount da instância do componente, é recomendado usar o async await para que não fique travado o app esperando uma resposta da Api

    async function fetchMovies() {
      // como o estado de query foi adicionado no dependency array o effect esta sincronizado com esse estado, ou seja, toda vez que o estado de query mudar, o effect sera rodado novamente
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not Found");

        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
  }, [query]);

  function handleSelectMovie(id) {
    setSelectId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectId(null);
  }

  return (
    <>
      <Header>
        <SearchBar query={query} onChange={(e) => setQuery(e.target.value)} />
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
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
