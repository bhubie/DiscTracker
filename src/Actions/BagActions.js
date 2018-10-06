import { ADD_BAG, UPDATE_BAG, LOAD_BAGS, TOGGLE_BAG_MODAL, BAG_NAME_ON_CHANGE, DELETE_BAG } from '../Constants';
import BagRepository from '../Repositories/Bag';
import db from '../db';

const bagRepository = new BagRepository(db);

export function loadBags() {
  return (dispatch) => {
    bagRepository.getAll()
      .then((bags) => {
        dispatch({
          type: LOAD_BAGS,
          payload: bags,
        });
      });
  };
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

