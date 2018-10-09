import { connect } from 'react-redux';
import { addDiscToBag } from '../Actions/DiscActions';
import DiscSelector from '../components/DiscSelector';

function mapStateToProps(state) {
  const { selectedBagID, selectableDiscs } = state;

  return {
    selectedBagID,
    selectableDiscs,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    handleAddDiscToBag(bagID, disc) {
      dispatch(addDiscToBag(bagID, disc));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscSelector);
