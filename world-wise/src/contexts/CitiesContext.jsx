import { useContext } from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";

//Criando o Context
const CitiesContext = createContext();

const URL = "http://localhost:8000";

//Passando o children como prop e adicionando toda a lógica relacionada com a busca de dados de cidades na API
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);


  //Função para pegar o id da cidade, fornencendo ela no provider possibilita que ela seja chamada onde fizer sentido
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  //Retornando o CitiesContext.Provider e os values que queremos que a aplicação tenha acesso, dentro passamos o children pois essa func/componente vai englobar todo o App component
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

//criando o hook para fornecer os dados para os componentes filhos e centralizar essa lógica aqui, evitando a escrita de código desnecessário
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside Context Provider ");
  return context;
}

export { CitiesProvider, useCities };