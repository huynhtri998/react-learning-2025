import { createSlice } from "@reduxjs/toolkit";

// Initial state for the bank account
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

// THUNK ACTION CREATOR - deposit with currency conversion
// Using manual thunk instead of createAsyncThunk (simpler approach)
// This works seamlessly with Redux Toolkit - thunks are built-in!
export function deposit(amount, currency) {
  if (currency === "USD")
    return { type: "account/deposit", payload: amount };

  // THUNK: Return a function instead of an action object
  return async function (dispatch) {
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


