// LEGACY VERSION - Traditional Redux (kept for reference)

// Initial state for the bank account
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// Account Reducer - calculates new state based on current state and action
export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
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

    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}

// ACTION CREATORS
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // THUNK: Return a function instead of an action object
  // Redux will call this function and pass in dispatch and getState
  return async function (dispatch, getState) {
    // Dispatch loading action
    dispatch({ type: "account/convertingCurrency" });

    // API call to convert currency
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // Dispatch the converted amount
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}

