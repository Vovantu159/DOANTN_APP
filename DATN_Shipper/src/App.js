import React, {useEffect, useState} from 'react';
import RootNavigation from './navigation/rootnavigation';
//config Redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/store';
import {ModalPortal} from 'react-native-modals';
import {Provider as PaperProvider} from 'react-native-paper';
console.disableYellowBox = true;
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <RootNavigation />
          <ModalPortal />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
