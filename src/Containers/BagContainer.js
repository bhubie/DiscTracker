import { connect } from 'react-redux';
import { addBag, updateBag, toggleBagModal } from '../Actions/BagActions';
import Bag from '../components/Bag';

function mapStateToProps(state) {
  const { bags, showBagModal } = state;
  return {
    bags,
    showBagModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddBag(name) {
      dispatch(addBag(name));
    },
    handleUpdateBag(id, name) {
      dispatch(updateBag(id, name));
    },
    handleOpenBagDialog() {
      // console.log('new bag clicked');
      dispatch(toggleBagModal());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bag);
