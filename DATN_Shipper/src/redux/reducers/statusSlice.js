import {createSlice} from '@reduxjs/toolkit';
const defaultState = {
  online: false,
};
const slice = createSlice({
  name: 'status',
  initialState: defaultState,
  reducers: {
    changeStatus: (state, action) => {
      state.online = action.payload;
    },
  },
});
const statusReducer = slice.reducer;
export default statusReducer;
export const {changeStatus} = slice.actions;
