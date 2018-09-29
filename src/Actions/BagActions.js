import { ADD_BAG, UPDATE_BAG, LOAD_BAGS } from '../Constants';
import BagRepository from '../Repositories/Bag';
import db from '../db';

const bagRepository = new BagRepository(db);

export function loadBags() {
  console.log('load bags called');
  return (dispatch) => {
    bagRepository.getAll()
      .then((bags) => {
        console.log('bags are');
        console.log(bags)
        dispatch({
          type: LOAD_BAGS,
          payload: bags,
        });
      });
  };
}

export function addBag(name) {
  return (dispatch) => {
    bagRepository.addBag(name)
      .then((bag) => {
        dispatch({
          type: ADD_BAG,
          payload: bag,
        });
      });
  };
}

export function updateBag(id, name) {
  return (dispatch) => {
    bagRepository
      .updateName(id, name)
      .then((bagName) => {
        dispatch({
          type: UPDATE_BAG,
          payload: bagName,
        });
      });
  };
}
