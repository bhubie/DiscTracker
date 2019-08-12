import { ADD_BAG, UPDATE_BAG, LOAD_BAGS, TOGGLE_BAG_MODAL, BAG_NAME_ON_CHANGE, DELETE_BAG, TOGGLE_BAG_SETTINGS_MODAL, TOGGLE_COLUMN_VISIBILITY } from '../Constants';
import BagRepository from '../Repositories/Bag';
import db from '../db.ts';

const bagRepository = new BagRepository(db);

export function loadBags() {
  return dispatch => bagRepository.getAll()
    .then((bags) => {
      dispatch({
        type: LOAD_BAGS,
        payload: {
          bags,
          selectedBagID: bags[0].id,
          selectedBagName: bags[0].name,
        },
      });
      return Promise.resolve();
    });
}

export function addBag(name) {
  const bagToAdd = { name };
  return (dispatch) => {
    bagRepository.add(bagToAdd)
      .then((bag) => {
        dispatch({
          type: ADD_BAG,
          payload: bag,
        });
      });
  };
}

export function deleteBag(id) {
  return (dispatch) => {
    bagRepository.deleteBag(id)
      .then(() => {
        dispatch({
          type: DELETE_BAG,
          payload: id,
        });
      });
  };
}

export function updateBag(id, name) {
  return (dispatch) => {
    bagRepository
      .updateName(id, name)
      .then((bagName) => {
        // console.log('updated bag name is')
        // console.log(bagName)
        dispatch({
          type: UPDATE_BAG,
          payload: {
            bagName,
            id,
          },
        });
      });
  };
}

export function bagNameOnChange(name) {
  return (dispatch) => {
    dispatch({
      type: BAG_NAME_ON_CHANGE,
      payload: name,
    });
  };
}

export function toggleColumnVisibility(column, checked) {
  console.log(column, checked);
  if (!checked) {
    return (dispatch) => {
      bagRepository.addHiddenColumn(column)
        .then(() => {
          dispatch({
            type: TOGGLE_COLUMN_VISIBILITY,
            payload: column,
          });
        });
    };
  }

  return (dispatch) => {
    bagRepository.deleteHiddenColumn(column)
      .then(() => {
        dispatch({
          type: TOGGLE_COLUMN_VISIBILITY,
          payload: column,
        });
      });
  };
}

export function toggleBagSettingsModal() {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_BAG_SETTINGS_MODAL,
      payload: {},
    });
  };
}

export function toggleBagModal(mode, id, name) {
  if (mode === 'new') {
    return (dispatch) => {
      dispatch({
        type: TOGGLE_BAG_MODAL,
        payload: { mode },
      });
    };
  }
  return (dispatch) => {
    dispatch({
      type: TOGGLE_BAG_MODAL,
      payload: {
        mode,
        id,
        name,
      },
    });
  };
}

