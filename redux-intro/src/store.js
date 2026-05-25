import { combineReducers, createStore } from "redux";

// Initial state for the bank account
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Initial state for the customer
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// Account Reducer - calculates new state based on current state and action
// Note: Using default parameter to set initialState as the initial value
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      // Only allow loan if there's no existing loan
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    // In Redux, we return the original state instead of throwing an error
    // when encountering an unknown action type
    default:
      return state;
  }
}

// Customer Reducer
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

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Create the Redux store with the root reducer
const store = createStore(rootReducer);

// ACTION CREATORS
// These are functions that return action objects
// Convention used in Redux to make dispatching actions easier and less error-prone

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

// Dispatch some actions to test the store using action creators
store.dispatch(createCustomer("Jonas Schmedtmann", "2984210"));
console.log(store.getState());

store.dispatch(deposit(250));
console.log(store.getState());

