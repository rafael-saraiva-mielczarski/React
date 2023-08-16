import { useState, useEffect } from "react";

//esse hook serve para pegar e setar os valores de certo item com o local storage, usando value e setValue o hook fica muito mais reutilizavel em diversos lugares da aplicação, pedindo só que quando chamado sejam especificados esses valores de acordo com seu uso.

export function useLocalStorageState(initialState, key) {
  //Lazy initial State
  //passar uma funcão no valor do useState é possivel, porém não pode passar nenhum argumento dentro dela, aqui pegamos os filmes salvos no local storage.
  //Como esse valor só sera importante quando entrarmos na página, ele é apropiado para receber esse tipo de função, visto que ele acaba não sendo afetado em nenhuma re-renderização.

  const [value, setValue] = useState(() => {
    const storedMovies = localStorage.getItem(key);
    return storedMovies ? JSON.parse(storedMovies) : initialState;
  });

  //adicionando filmes ao LS, para persistir os dados
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
