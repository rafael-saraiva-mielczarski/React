import { useEffect, useRef } from "react";

export default function SearchBar({ query, setQuery, onChange }) {
    //useRef é um hook muito usado para selecionar elementos da DOM, por exemplo aqui, selecionado o barra de pesquisa, para que alguns efeitos ocorram nela, é possivel fazer essa seleção de somente usando JS, mas não é o recomendado pelo React.
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={onChange}
      ref={inputEl}
    />
  );
}
