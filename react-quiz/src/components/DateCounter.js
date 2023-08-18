import { useReducer } from "react";

//o useReducer é um hook que sempre recebe dois parametros, uma função reducer e um estado inicial, normalmente sendo um objeto. Essa função Reducer tem que ser criada no top level e ela é quem comanda o Hook, ela recebe dois parametros, o state e a action, o state é estado inicial que é passado no hook, já o actino pode ser o que quiser, é a logica do hook. Necessariamente se tem um action.type, para especificar o que será feito e um retorno que contem esse resultado, podendo retornar o state e alguma soma ou somente o action.payload.
//para chamar essa função se usa o dispatch dentro de alguma outra função dentro do componente. O Dispatch recebe dois argumentos, o type, o qual identifica qual ação tem que ser feita, e o payload, que pode ser algum número ou algum setter, caso seja um número, não é necessário passar o action.payload no dispatch, pode ser escrito no retorno da reducer, caso seja algo que a reducer não tem acesso, ai sim temos que passar o action.payload.

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };

    case "inc":
      return { ...state, count: state.count + state.step };

    case "setCount":
      return { ...state, count: action.payload };

    case "setStep":
      return { ...state, step: action.payload };

    case "reset":
      return initialState;

    default:
      throw new Error("Unknown action");
  }
  //   if (action.type === "inc") return state + 1;
  //   if (action.type === "dec") return state - 1;
  //   if (action.type === "setCount") return action.payload;
}

export default function DateCounter() {
  //   const [count, setCount] = useState(0);
  //   const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "inc" });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset" });
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
