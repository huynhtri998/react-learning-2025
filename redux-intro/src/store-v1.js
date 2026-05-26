// LEGACY VERSION - Using traditional Redux (kept for reference)
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Create the Redux store with the root reducer and thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

