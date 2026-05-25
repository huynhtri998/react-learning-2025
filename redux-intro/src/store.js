import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Create the Redux store with the root reducer
const store = createStore(rootReducer);

export default store;

