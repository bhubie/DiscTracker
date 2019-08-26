import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import './theme.scss';
import AppContainer from './Containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import store from './Stores';
import { loadBaggedDiscs } from './Actions/DiscActions';
import { loadBagSettings } from './Actions/BagSettingsActions';
import seedDatabase from './Utils/dbSeed';


seedDatabase().then(() => {
  // store.dispatch(loadBags())
  //   .then(() => {
  //     store.dispatch(loadBaggedDiscs(store.getState().selectedBagID));
  //   });
  store.dispatch(loadBaggedDiscs(1));
  store.dispatch(loadBagSettings());
});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
