import { ADD_DISPLAY_OPTION, UPDATE_GRID_COLOR, UPDATE_GRIDLINE_COLOR, UPDATE_HAND, LOAD_DISPLAY_OPTIONS } from '../Constants';
import DisplayOptionsRepository from '../Repositories/DisplayOptions';
import db from '../db';

const displayOptionsRepository = new DisplayOptionsRepository(db);

export function loadDisplayOptions() {
  // console.log('load display optiosn called');
  return (dispatch) => {
    displayOptionsRepository.getAll()
      .then((displayOptions) => {
        // console.log(displayOptions);
        dispatch({
          type: LOAD_DISPLAY_OPTIONS,
          payload: displayOptions,
        });
      });
  };
}

export function addDisplayOptions(displayOption) {
  return (dispatch) => {
    displayOptionsRepository.add(displayOption)
      .then((option) => {
        dispatch({
          type: ADD_DISPLAY_OPTION,
          payload: option,
        });
      });
  };
}

export function updateHand(id, hand) {
  return (dispatch) => {
    displayOptionsRepository
      .updateHand(id, hand)
      .then((updatedHand) => {
        // console.log('updated ahnd from display options actions')
        // console.log(updatedHand);
        dispatch({
          type: UPDATE_HAND,
          payload: updatedHand,
        });
      });
  };
}

export function updateGridColor(id, gridColor) {
  // console.log('action udpate grid color was callled!');
  // console.log(id);
  // console.log(gridColor);
  return (dispatch) => {
    displayOptionsRepository
      .updateGridColor(id, gridColor)
      .then((updatedGridColor) => {
        // console.log(updatedGridColor);
        dispatch({
          type: UPDATE_GRID_COLOR,
          payload: updatedGridColor,
        });
      });
  };
}

export function updateGridLineColor(id, gridLineColor) {
  return (dispatch) => {
    displayOptionsRepository
      .updateGridLineColor(id, gridLineColor)
      .then((updatedGridLineColor) => {
        dispatch({
          type: UPDATE_GRIDLINE_COLOR,
          payload: updatedGridLineColor,
        });
      });
  };
}
