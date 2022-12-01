import {createSlice} from '@reduxjs/toolkit';
const defaultState = {
  loading: false,
  error: false,
  listCartItem: [],
  total: 0,
};
const slice = createSlice({
  name: 'cart',
  initialState: defaultState,
  reducers: {
    get: (state, action) => {
      state.loading = true;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.listCartItem = action.payload;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    add: (state, action) => {
      console.log(action);
      const existed_item = state.listCartItem.find(
        (e) => e.code === action.payload.code,
      );
      if (typeof existed_item === 'undefined') {
        state.listCartItem = [...state.listCartItem, action.payload];
        state.total = state.total + action.payload.price * action.payload.count;
        state.adderItem = true;
      } else {
        existed_item.count = action.payload.count + existed_item.count; // item da ton tai thi tang so luong
        state.listCartItem = state.listCartItem;
        state.total = state.total + existed_item.price * action.payload.count; // tong so tien tang = so tien da co + so tien tang
      }
    },
    remove: (state, action) => {
      const existed_item = state.listCartItem.find(
        (e) => e.id === action.payload,
      );
      state.total = state.total - existed_item.price * existed_item.count;
      state.listCartItem = state.listCartItem.filter(
        (e) => e.id !== action.payload,
      );
    },
    change_quantity: (state, action) => {
      const existed_item = state.listCartItem.find(
        (e) => e.code === action.payload.code,
      );
      const initialTotal = existed_item.count * existed_item.price; // sum price item inital
      existed_item.count = action.payload.count;
      const followingTotal = existed_item.count * existed_item.price; // sum price item after change count
      const temp = followingTotal - initialTotal;
      state.listCartItem = [...state.listCartItem];
      state.total = state.total + temp;
    },
  },
});
const cartReducer = slice.reducer;
export default cartReducer;
export const {
  get,
  getSuccess,
  getError,
  add,
  remove,
  change_quantity,
} = slice.actions;
