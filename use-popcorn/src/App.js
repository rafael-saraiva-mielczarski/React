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

const KEY = "f2ca383d";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectId] = useState(null);

  //Lazy initial State
  //passar uma funcão no valor do useState é possivel, porém não pode passar nenhum argumento dentro dela, aqui pegamos os filmes salvos no local storage.
  //Como esse valor só sera importante quando entrarmos na página, ele é apropiado para receber esse tipo de função, visto que ele acaba não sendo afetado em nenhuma re-renderização.
  const [watched, setWatched] = useState(() => {
    const storedMovies = localStorage.getItem("watched");
    return JSON.parse(storedMovies);
  });

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

  // ===================================== useEffect ==============================================
  // explicações e exemplos

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

    const controller = new AbortController();

    async function fetchMovies() {
      // como o estado de query foi adicionado no dependency array o effect esta sincronizado com esse estado, ou seja, toda vez que o estado de query mudar, o effect sera rodado novamente
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not Found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        console.log(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  //adicionando filmes ao LS, para persistir os dados
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

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
