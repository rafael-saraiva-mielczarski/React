//deprecated, tem uma forma mais moderna
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customersSlice";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

//Para usar as diferentes funções reducer que criamos, é necessário criar varias stores, mas não é bem assim que funciona com Redux.
// No Redux, chamamos a função combineReducers, que recebe um objeto, esse objeto serãos os stores criados, o objeto vai receber o nome que queremos dar para cada store e seu reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//criando o store é só chamar o metodo createStore e passar o reducer que quiser dentro
//passando o Thunk middleware para o store, assim ficara configurado
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
