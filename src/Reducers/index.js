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
} from '../Constants';

export default function (state, { type, payload }) {
  switch (type) {
    case LOAD_BAGS:
      return {
        ...state,
        bags: payload,
      };
    case ADD_BAG:
      return {
        ...state,
        bags: [...state.bags, payload],
        showBagModal: false,
      };
    case UPDATE_BAG: {
      const bagToUpdate = state.bags.find(bag => bag.id === parseInt(payload.id, 0));
      //console.log('updated bag is');
      //console.log(bagToUpdate);
      //console.log(payload);
      return {
        ...state,
        bags: [
          ...state.bags.filter(bag => bag.id !== parseInt(payload.id, 0)),
          Object.assign({}, bagToUpdate, { name: payload.bagName }),
        ],
        showBagModal: false,
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
    default: return state;
  }
}
