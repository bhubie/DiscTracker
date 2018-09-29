import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './Store';
import { LOAD_DISPLAY_OPTIONS, LOAD_BAGS } from './Constants';
import { loadDisplayOptions } from './Actions/DisplayOptionsActions';
import { loadBags } from './Actions/BagActions';
import seedDatabase from './Utils/dbSeed';


seedDatabase().then(() => {
  store.dispatch(loadDisplayOptions(LOAD_DISPLAY_OPTIONS));
  store.dispatch(loadBags(LOAD_BAGS));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
