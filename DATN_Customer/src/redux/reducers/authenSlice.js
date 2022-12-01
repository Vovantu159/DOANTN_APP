import {createSlice} from '@reduxjs/toolkit';
const defaultSate = {
  loading: false,
  error: false,
  currentUser: {
    accessToken: '',
    name: null,
    phoneNumber: '',
    address: '',
    avatar: '',
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
      state.currentUser.accessToken = action.payload.data.accessToken;
    },
    signInError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser.accessToken = '';
      state.currentUser.name = null;
      state.currentUser.phoneNumber = '';
      state.currentUser.address = '';
      state.currentUser.avatar = '';
    },
    register: (state, action) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.currentUser.accessToken = action.payload.data.accessToken;
    },
    registerError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfile: (state, action) => {
      if (action.payload?.address) {
        state.currentUser.address = action.payload?.address;
      }
      if (action.payload?.avatar) {
        state.currentUser.avatar = action.payload?.avatar;
      }
      if (action.payload?.name) {
        state.currentUser.name = action.payload?.name;
      }
      if (action.payload?.phoneNumber) {
        state.currentUser.phoneNumber = action.payload?.phoneNumber;
      }
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
  register,
  registerError,
  registerSuccess,
  updateProfile,
} = slice.actions;
