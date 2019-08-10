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
  showModal: false,
  modalType: undefined,
  baggedDiscs: [],
  selectableDiscs: [],
  discFilterOptions: {
    includedDiscTypes: [
      'Distance Driver',
      'Fairway Driver',
      'Mid-Range',
      'Putt & Approach',
    ],
  },
  columns: [
    { name: 'Name', caption: 'Name' },
    { name: 'Manufacturer', caption: 'Manufacturer' },
    { name: 'Disc Color', caption: 'Disc Color' },
    { name: 'Wear', caption: 'Wear' },
    { name: 'Enabled', caption: 'Enabled' },
    { name: 'Remove', caption: 'Remove' },
  ],
  bagSettings: {
    hiddenColumns: [],
  },
};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk)),
);

export default store;
