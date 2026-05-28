import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastOrderId: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLastOrderId(state, action) {
      state.lastOrderId = action.payload;
    },
    clearLastOrderId(state) {
      state.lastOrderId = null;
    },
  },
});

export const { setLastOrderId, clearLastOrderId } = orderSlice.actions;

export const getLastOrderId = (state) => state.order.lastOrderId;

export default orderSlice.reducer;

