import {createSlice} from '@reduxjs/toolkit';
const defaultSate = {
  deepLink: '',
  data: null,
};
const slice = createSlice({
  name: 'handleNotification',
  initialState: defaultSate,
  reducers: {
    upDateLink: (state, action) => {
      console.log('set link', action.payload);
      state.deepLink = action.payload.link;
      state.data = action.payload.data;
    },
    removeLink: (state, action) => {
      console.log('remove link');
      state.deepLink = '';
      state.data = null;
    },
  },
});
const handleNotifiReducer = slice.reducer;
export default handleNotifiReducer;
export const {upDateLink, removeLink} = slice.actions;
