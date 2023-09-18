//Store com REDUX TOOLKIT (Forma moderna)
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customersSlice";
import { configureStore } from "@reduxjs/toolkit";

//Muito mais simples, somente chamar o metodo configureStore e passar os reducers da aplicação
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
