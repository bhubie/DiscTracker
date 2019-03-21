import { TOGGLE_COLUMN_VISIBILITY, LOAD_BAG_SETTINGS } from '../Constants';
import BagSettingsRepository from '../Repositories/BagSettings';
import db from '../db';

const bagSettingsRepository = new BagSettingsRepository(db);

// eslint-disable-next-line import/prefer-default-export
export function toggleColumnVisibility(id, column, checked) {
  if (!checked) {
    return (dispatch) => {
      bagSettingsRepository.addHiddenColumn(id, column)
        .then(() => {
          dispatch({
            type: TOGGLE_COLUMN_VISIBILITY,
            payload: column,
          });
        });
    };
  }

  return (dispatch) => {
    bagSettingsRepository.deleteHiddenColumn(id, column)
      .then(() => {
        dispatch({
          type: TOGGLE_COLUMN_VISIBILITY,
          payload: column,
        });
      });
  };
}

export function loadBagSettings() {
  return dispatch => bagSettingsRepository.getAll()
    .then((settings) => {
      dispatch({
        type: LOAD_BAG_SETTINGS,
        payload: settings[0],
      });
      return Promise.resolve();
    });
}
