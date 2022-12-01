import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/store/store';
import RootNavigation from './navigation/rootnavigation';
import {ModalPortal} from 'react-native-modals';
console.disableYellowBox = true;
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RootNavigation />
        <ModalPortal />
      </PersistGate>
    </Provider>
  );
}
