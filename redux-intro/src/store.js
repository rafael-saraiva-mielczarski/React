//deprecated, tem uma forma mais moderna
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

//Diferença de um useReducer normal e um reducer com Redux é que normalmente se passa o state como o estado Inicial setado no código
function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

//Para usar as diferentes funções reducer que criamos, é necessário criar varias stores, mas não é bem assim que funciona com Redux.
// No Redux, chamamos a função combineReducers, que recebe um objeto, esse objeto serãos os stores criados, o objeto vai receber o nome que queremos dar para cada store e seu reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//criando o store é só chamar o metodo createStore e passar o reducer que quiser dentro
const store = createStore(rootReducer);
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

// Customer Action Functions

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Rafael", "121212"));
console.log(store.getState());

store.dispatch(updateName("Rafael Saraiva"));
console.log(store.getState());
