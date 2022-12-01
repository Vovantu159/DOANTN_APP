//Change font size text in application
import {createSlice} from '@reduxjs/toolkit';
const defaultState = {
  sizeScale: 1,
};
const slice = createSlice({
  name: 'changeFontSize',
  initialState: defaultState,
  reducers: {
    changeFontSize: (state, action) => {
      state.sizeScale =
        action.payload === 1 ? 1.3 : action.payload === -1 ? 0.8 : 1;
    },
  },
});
const fontSizeReducer = slice.reducer;
export default fontSizeReducer;
export const {changeFontSize} = slice.actions;
