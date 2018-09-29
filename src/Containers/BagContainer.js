import { connect } from 'react-redux';
import { addBag, updateBag } from '../Actions/BagActions';
import Bag from '../components/Bag';

function mapStateToProps(state) {
  const { bags } = state;
  console.log('bags are');
  console.log(bags);

  return {
    bags,
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bag);
