import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/rootSaga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import fontSizeReducer from '../reducers/fontsizeSlice';
import languageReducer from '../reducers/languageSlice';
import cartReducer from '../reducers/cartSlice';
import handleNotifiReducer from '../reducers/handeNotifiSlice';

///
import authReducer from '../reducers/authenSlice';
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['fontSizeReducer', 'languageReducer', 'authReducer'],
  blacklist: ['handleNotifiReducer'],
};

const rootReducer = combineReducers({
  fontsSizeReducer: fontSizeReducer,
  languageReducer: languageReducer,
  cartReducer: cartReducer,
  authReducer: authReducer,
  handleNotifiReducer: handleNotifiReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export {persistor, store};
