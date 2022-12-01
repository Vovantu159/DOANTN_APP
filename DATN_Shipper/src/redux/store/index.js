import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
//import root saga
import rootSaga from '../saga';
//import reducer
import authReducer from '../reducers/authenticationSlice';
import fontSizeReducer from '../reducers/fontsizeSlice';
import languageReducer from '../reducers/languageSlice';
import statusReducer from '../reducers/statusSlice';
import handleNotifiReducer from '../reducers/handeNotifiSlice';
import shippingReducer from '../reducers/shippingSlice';
//Config App
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'statusReducer'],
  blacklist: ['handleNotifiReducer'],
};
const rootReducer = combineReducers({
  auth: authReducer,
  fontsSizeReducer: fontSizeReducer,
  languageReducer: languageReducer,
  statusReducer: statusReducer,
  handleNotifiReducer: handleNotifiReducer,
  shippingReducer: shippingReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
export {persistor, store};
