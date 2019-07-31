import { createSelector } from 'reselect';

const getIncludedDiscTypes = state => state.discFilterOptions.includedDiscTypes;
const getDiscs = state => state.selectableDiscs;

const getVisibleDiscs = createSelector(
  [getIncludedDiscTypes, getDiscs],
  // eslint-disable-next-line arrow-body-style
  (includedDiscTypes, selectableDiscs) => {
    return selectableDiscs.filter(disc => includedDiscTypes.includes(disc.type));
  },
);

export default getVisibleDiscs;
