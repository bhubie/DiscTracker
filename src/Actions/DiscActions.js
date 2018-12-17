import { LOAD_BAGGED_DISCS, ADD_DISC, FETCH_DISCS_BEGIN, FETCH_DISCS_SUCCESS, FETCH_DISCS_FAILURE, UPDATE_DISC_ENABLED, UPDATE_DISC_COLOR, DELETE_DISC, } from '../Constants';
import DiscsRepository from '../Repositories/Discs';
import db from '../db';

const discsRepository = new DiscsRepository(db);

export function loadBaggedDiscs(bagID) {
  return (dispatch) => {
    discsRepository.getBaggedDiscs(bagID)
      .then((discs) => {
        dispatch({
          type: LOAD_BAGGED_DISCS,
          payload: {
            discs,
            bagID,
          },
        });
      });
  };
}

export function addDiscToBag(bagID, disc) {
  return (dispatch) => {
    discsRepository.addDisc(Object.assign({}, disc, { bagID }))
      .then((addedDisc) => {
        dispatch({
          type: ADD_DISC,
          payload: addedDisc,
        });
      });
  };
}

export function updateEnabled(discID, enabled) {
  return (dispatch) => {
    discsRepository.updateDiscEnabled(parseInt(discID, 0), enabled)
      .then((updatedDisc) => {
        dispatch({
          type: UPDATE_DISC_ENABLED,
          payload: updatedDisc,
        });
      });
  };
}

export function updateDiscColor(discID, color) {
  return (dispatch) => {
    discsRepository.updateDiscColor(parseInt(discID, 0), color)
      .then((updatedDisc) => {
        dispatch({
          type: UPDATE_DISC_COLOR,
          payload: updatedDisc,
        });
      });
  };
}

export function deleteDisc(discID) {
  return (dispatch) => {
    discsRepository.deleteDisc(parseInt(discID, 0))
      .then(() => {
        dispatch({
          type: DELETE_DISC,
          payload: discID,
        });
      });
  };
}

export function fetchDiscs() {
  return (dispatch) => {
    const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

    dispatch({
      type: FETCH_DISCS_BEGIN,
    });

    return fetch(apiUrl, { mode: 'cors' })
      .then(res => res.json())
      .then((j) => {
        dispatch({
          type: FETCH_DISCS_SUCCESS,
          payload: j.discs,
        });
      })
      .catch(error => dispatch({
        type: FETCH_DISCS_FAILURE,
        payload: error,
      }));
  };
}
