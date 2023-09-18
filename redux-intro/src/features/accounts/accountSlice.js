const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    //o action name tem como padrão ser escrito primeiramente o dominio do estado e depois sua ação
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      //invés de lançar um error, como fazia no useReducer, o padrão é retorna o estado inicial
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //quando for dispatched essa action, o redux percebera que tem uma função e entendera que é o thunk
  //como mencionado no Readme, essa função do thunks esta entre o dispatch e reducer
  return async function (dispatch, getState) {
    //Loading
    dispatch({ type: "account/convertingCurrency" });

    //Chamada API
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmmount = data.rates.USD;

    //fazer o dispatch da action
    dispatch({ type: "account/deposit", payload: convertedAmmount });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
