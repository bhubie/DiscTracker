/* eslint-disable max-len */
import {
  LOAD_BAGS,
  ADD_BAG,
  UPDATE_BAG,
  LOAD_DISPLAY_OPTIONS,
  ADD_DISPLAY_OPTION,
  UPDATE_GRID_COLOR,
  UPDATE_GRIDLINE_COLOR,
  UPDATE_HAND,
  TOGGLE_BAG_MODAL,
  BAG_NAME_ON_CHANGE,
  DELETE_BAG,
  LOAD_BAGGED_DISCS,
  ADD_DISC,
  FETCH_DISCS_SUCCESS,
  UPDATE_DISC_ENABLED,
  UPDATE_DISC_COLOR,
  DELETE_DISC,
  TOGGLE_DISC_TYPE_INCLUSION,
} from '../Constants';

export default function (state, { type, payload }) {
  switch (type) {
    case LOAD_BAGS:
      return {
        ...state,
        bags: payload.bags,
        selectedBagName: payload.selectedBagName,
        selectedBagID: payload.selectedBagID,
      };
    case ADD_BAG:
      return {
        ...state,
        bags: [...state.bags, payload],
        showBagModal: false,
      };
    case UPDATE_BAG: {
      const bagToUpdate = state.bags.find(bag => bag.id === parseInt(payload.id, 0));
      return {
        ...state,
        bags: [
          ...state.bags.filter(bag => bag.id !== parseInt(payload.id, 0)),
          Object.assign({}, bagToUpdate, { name: payload.bagName }),
        ],
        showBagModal: false,
      };
    }
    case DELETE_BAG: {
      return {
        ...state,
        bags: [
          ...state.bags.filter(bag => bag.id !== parseInt(payload, 0)),
        ],
      };
    }
    case LOAD_BAGGED_DISCS: {
      return {
        ...state,
        baggedDiscs: payload.discs,
        selectedBagID: payload.bagID,
      };
    }
    case ADD_DISC: {
      return {
        ...state,
        baggedDiscs: [...state.baggedDiscs, payload],
      };
    }
    case UPDATE_DISC_ENABLED: {
      const discToUpdate = state.baggedDiscs.find(discs => discs.id === payload.id);
      return {
        ...state,
        baggedDiscs: [
          ...state.baggedDiscs.filter(discs => discs.id !== payload.id),
          Object.assign({}, discToUpdate, { selected: payload.selected }),
        ],
      };
    }
    case DELETE_DISC: {
      return {
        ...state,
        baggedDiscs: [
          ...state.baggedDiscs.filter(disc => disc.id !== parseInt(payload, 0)),
        ],
      };
    }
    case UPDATE_DISC_COLOR: {
      const discToUpdate = state.baggedDiscs.find(discs => discs.id === payload.id);
      return {
        ...state,
        baggedDiscs: [
          ...state.baggedDiscs.filter(discs => discs.id !== payload.id),
          Object.assign({}, discToUpdate, { color: payload.color }),
        ],
      };
    }
    case LOAD_DISPLAY_OPTIONS:
      return {
        ...state,
        displayOptions: payload,
      };
    case ADD_DISPLAY_OPTION:
      return {
        ...state,
        displayOptions: [...state.displayOptions, payload],
      };
    case UPDATE_GRID_COLOR: {
      const gridColorToUpdate = state.displayOptions.find(displayOptions => displayOptions.id === payload.id);
      return {
        ...state,
        displayOptions: [
          ...state.displayOptions.filter(displayOptions => displayOptions.id !== payload.id),
          Object.assign({}, gridColorToUpdate, { gridColor: payload.gridColor }),
        ],
      };
    }
    case UPDATE_GRIDLINE_COLOR: {
      const gridLineColorToUpdate = state.displayOptions.find(displayOptions => displayOptions.id === payload.id);
      return {
        ...state,
        displayOptions: [
          ...state.displayOptions.filter(displayOptions => displayOptions.id !== payload.id),
          Object.assign({}, gridLineColorToUpdate, { gridLineColor: payload.gridLineColor }),
        ],
      };
    }
    case UPDATE_HAND: {
      const handToUpdate = state.displayOptions.find(displayOptions => displayOptions.id === payload.id);
      return {
        ...state,
        displayOptions: [
          ...state.displayOptions.filter(displayOptions => displayOptions.id !== payload.id),
          Object.assign({}, handToUpdate, { hand: payload.hand }),
        ],
      };
    }
    case TOGGLE_BAG_MODAL: {
      return {
        ...state,
        showBagModal: !state.showBagModal,
        mode: payload.mode,
        bagName: payload.name,
        bagID: payload.id,
      };
    }
    case BAG_NAME_ON_CHANGE: {
      return {
        ...state,
        bagName: payload,
      };
    }
    case FETCH_DISCS_SUCCESS: {
      return {
        ...state,
        selectableDiscs: payload,
      };
    }
    case TOGGLE_DISC_TYPE_INCLUSION: {
      const newIncludedDiscTypes = payload.include ?
        [...state.discFilterOptions.includedDiscTypes, payload.discType] :
        [...state.discFilterOptions.includedDiscTypes.filter(discType => discType !== payload.discType)];

      return {
        ...state,
        discFilterOptions: {
          ...state.discFilterOptions,
          includedDiscTypes: newIncludedDiscTypes,
        },
      };
    }
    default: return state;
  }
}
