import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MapScreen from './src/screens/MapScreen';

const App: React.FC = () => (
  <Provider store={store}>
    <MapScreen />
  </Provider>
);

export default App;