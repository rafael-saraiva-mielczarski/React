//deprecated, tem uma forma mais moderna
import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

//Diferença de um useReducer normal e um reducer com Redux é que normalmente se passa o state como o estado Inicial setado no código
function reducer(state = initialState, action) {
  switch (action.type) {
    //o action name tem como padrão ser escrito primeiramente o dominio do estado e depois sua ação
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      //invés de lançar um error, como fazia no useReducer, o padrão é retorna o estado inicial
      return state;
  }
}

//criando o store é só chamar o metodo createStore e passar o reducer que quiser dentro
const store = createStore(reducer);

//chamamos o dispatch diretamente do store
// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a bike" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

//Action Creater function, é uma convenção usada pelos devs quando estiverem usando o Redux. O Redux funcionaria normalmente sem essas funções.

// store.dispatch({ type: "account/deposit", payload: 500 });

//invés disso ⬆️, fazemos o ⬇️

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
store.dispatch(deposit(500));
console.log(store.getState());

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(500, "Buy a Bike"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
