import { connect } from 'react-redux';
import { toggleBagSettingsModal } from '../Actions/BagActions';
import Bag from '../components/Bag';

function mapStateToProps(state) {
  const { showModal, modalType } = state;

  return {
    showModal: showModal && modalType === 'BagSettings',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleBagSettingsClick() {
      dispatch(toggleBagSettingsModal());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bag);
