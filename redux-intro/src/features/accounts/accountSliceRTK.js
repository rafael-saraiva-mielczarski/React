//a ideia de slices se tornou padrão para o toolkit
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// o Slice gerencia tudo, o nome do reducer, o estado inicial e os reducers
const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  //perceba que os reducers terão o mesmo nome que antigamente account/deposit
  reducers: {
    //mutação de estados, por trás ele tem a mesma lógica que no redux normal, mas escrevemos assim para ser algo mais conveniente
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    //essas funções já criadas aceitam somente um argumento, para mudar isso se usa a função prepare()
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state, action) {
      //a ordem dos fatores altera o resultado
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

//deestruturar as actions do slice para exportar
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

//o Redux Toolkit já vem com o setup do Thunk feito, existe também a func createAsyncThunk.

//É possivel criar função com o thunk fora do reducer, porem ela precisa ter o mesmo nome que a action que esta dentro do reducer, senão o Redux não entenderá que é o Thunk
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmmount = data.rates.USD;

    dispatch({ type: "account/deposit", payload: convertedAmmount });
  };
}

//exportar o reducer
export default accountSlice.reducer;
