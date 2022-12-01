import {createSlice} from '@reduxjs/toolkit';
const defaultSate = {
  loading: false,
  error: false,
  deepLink: '',
  currentUser: {
    token: null,
    profile: null,
  },
};
const slice = createSlice({
  name: 'auth',
  initialState: defaultSate,
  reducers: {
    signIn: (state, action) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser.token = action.payload.token;
      state.currentUser.profile = action.payload.profile;
    },
    signInError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser.token = null;
      state.currentUser.profile = null;
    },
    signUp: (state, action) => {
      state.loading = true;
    },
    signUpSuccess: (state, action) => {
      state.loading = false;
      state.currentUser.token = action.payload.data.accessToken;
    },
    signUpError: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateInfo: (state, action) => {
      state.currentUser.profile = action.payload;
    },
  },
});
const authReducer = slice.reducer;
export default authReducer;
export const {
  signIn,
  signInSuccess,
  signInError,
  signOut,
  signUp,
  signUpError,
  signUpSuccess,
  updateInfo,
} = slice.actions;
