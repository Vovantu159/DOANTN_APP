// Change language in application;
import {createSlice} from '@reduxjs/toolkit';
const defaultState = {
  language: 'vi',
};
const slice = createSlice({
  name: 'changeLanguage',
  initialState: defaultState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});
const languageReducer = slice.reducer;
export default languageReducer;
export const {changeLanguage} = slice.actions;
