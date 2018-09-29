import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../Reducers';

const initialState = {
  bags: [],
  displayOptions: [{
    hand: {
      value: 'L',
    },
    gridColor: {
      r: '37',
      g: '37',
      b: '38',
      a: '1',
    },
    gridLineColor: {
      r: '255',
      g: '255',
      b: '255',
      a: '1',
    },
  }],
  colorPicker: {
    displayColorPicker: false,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk)),
);

export default store;
