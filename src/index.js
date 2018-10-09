import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import AppContainer from './Containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import store from './Store';
import { loadDisplayOptions } from './Actions/DisplayOptionsActions';
import { loadBags } from './Actions/BagActions';
import { loadBaggedDiscs } from './Actions/DiscActions';
import seedDatabase from './Utils/dbSeed';


seedDatabase().then(() => {
  store.dispatch(loadDisplayOptions());
  store.dispatch(loadBags())
    .then(() => {
      store.dispatch(loadBaggedDiscs(store.getState().selectedBagID));
    });
});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
