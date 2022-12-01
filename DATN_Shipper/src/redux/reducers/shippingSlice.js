import {createSlice} from '@reduxjs/toolkit';
const defaultState = {
  shipping: false,
  oderId: null,
};
const slice = createSlice({
  name: 'shipping',
  initialState: defaultState,
  reducers: {
    shippingStart: (state, action) => {
      console.log('Set shipping', action.payload);
      state.shipping = true;
      state.oderId = action.payload;
    },
    shippingStop: (state, action) => {
      console.log('Stop shipping', action.payload);
      state.shipping = false;
      state.oderId = null;
    },
  },
});
const shippingReducer = slice.reducer;
export default shippingReducer;
export const {shippingStart, shippingStop} = slice.actions;
