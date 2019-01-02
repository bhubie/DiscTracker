/* eslint-disable import/prefer-default-export */
import { TOGGLE_DISC_TYPE_INCLUSION } from '../Constants';

export function toggleDiscTypeFilter(discType, include) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_DISC_TYPE_INCLUSION,
      payload: {
        discType,
        include,
      },
    });
  };
}
