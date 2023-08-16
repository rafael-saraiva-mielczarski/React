import { useEffect, useRef } from "react";
import { useKey } from "../../hooks/useKey";

export default function SearchBar({ query, setQuery, onChange }) {
  //useRef é um hook muito usado para selecionar elementos da DOM, por exemplo aqui, selecionado o barra de pesquisa, para que alguns efeitos ocorram nela, é possivel fazer essa seleção de somente usando JS, mas não é o recomendado pelo React.
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

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
