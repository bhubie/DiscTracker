import { connect } from 'react-redux';
import { addDiscToBag } from '../Actions/DiscActions';
import { toggleDiscTypeFilter } from '../Actions/DiscSelectorActions';
import getVisibleDiscs from '../Selectors';

import DiscSelector from '../components/DiscSelector';

function mapStateToProps(state) {
  const { selectedBagID, discFilterOptions } = state;
  const { includedDiscTypes } = discFilterOptions;

  return {
    selectedBagID,
    selectableDiscs: getVisibleDiscs(state),
    includedDiscTypes,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    handleAddDiscToBag(bagID, disc) {
      dispatch(addDiscToBag(bagID, disc));
    },
    handleDiscFilterCheckboxChange(event) {
      // console.log(event.target.name);
      dispatch(toggleDiscTypeFilter(event.target.name, event.target.checked));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscSelector);
