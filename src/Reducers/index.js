import {
  LOAD_BAGS,
  ADD_BAG,
  UPDATE_BAG,
  LOAD_DISPLAY_OPTIONS,
  ADD_DISPLAY_OPTION,
  UPDATE_GRID_COLOR,
  UPDATE_GRIDLINE_COLOR,
  UPDATE_HAND,
} from '../Constants';

export default function (state, { type, payload }) {
  switch (type) {
    case LOAD_BAGS: return { bags: payload };
    case ADD_BAG: return { bags: [...state.bags, payload] };
    case UPDATE_BAG: {
      const bagToUpdate = state.bags.find(bag => bag.id === payload.id);
      return {
        bags: [
          ...state.bags.filter(bag => bag.id !== payload.id),
          Object.assign({}, bagToUpdate, { name: payload.name }),
        ],
      };
    }
    case LOAD_DISPLAY_OPTIONS: return { displayOptions: payload };
    case ADD_DISPLAY_OPTION: return { displayOptions: [...state.displayOptions, payload] };
    case UPDATE_GRID_COLOR: {
      const gridColorToUpdate = state.displayOptions.find(displayOptions => displayOptions.id === payload.id);
      return {
        displayOptions: [
          ...state.displayOptions.filter(displayOptions => displayOptions.id !== payload.id),
          Object.assign({}, gridColorToUpdate, { gridColor: payload.gridColor }),
        ],
      };
    }
    case UPDATE_GRIDLINE_COLOR: {
      const gridLineColorToUpdate = state.displayOptions.find(displayOptions => displayOptions.id === payload.id);
      return {
        displayOptions: [
          ...state.displayOptions.filter(displayOptions => displayOptions.id !== payload.id),
          Object.assign({}, gridLineColorToUpdate, { gridLineColor: payload.gridLineColor }),
        ],
      };
    }
    case UPDATE_HAND: {
      const handToUpdate = state.displayOptions.find(displayOptions => displayOptions.id === payload.id);
      return {
        displayOptions: [
          ...state.displayOptions.filter(displayOptions => displayOptions.id !== payload.id),
          Object.assign({}, handToUpdate, { hand: payload.hand }),
        ],
      };
    }
    default: return state;
  }
}
