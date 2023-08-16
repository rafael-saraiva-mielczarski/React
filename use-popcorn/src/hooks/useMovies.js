import { useState, useEffect } from "react";

const KEY = "f2ca383d";

//Os custom hooks servem para extrair um pedaço de lógica que pode ser reutilizado em varias locais da aplicação. Tem que começar com "use" para que o React entenda que é um hook. Serve como uma função que retorna algum tipo de dado, o qual será usado no componente que ira chama-lo.
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    //como o useEffeect vai rodar no mount da instância do componente, é recomendado usar o async await para que não fique travado o app esperando uma resposta da App

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
    // handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
