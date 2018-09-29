import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './Store';
import { LOAD_DISPLAY_OPTIONS } from './Constants';
import { loadDisplayOptions } from './Actions/DisplayOptionsActions';
import seedDatabase from './Utils/dbSeed';


seedDatabase().then(() => {
  store.dispatch(loadDisplayOptions(LOAD_DISPLAY_OPTIONS));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
