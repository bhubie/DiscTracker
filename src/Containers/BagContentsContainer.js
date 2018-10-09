import { connect } from 'react-redux';
import { updateEnabled, updateDiscColor, deleteDisc } from '../Actions/DiscActions';
import BagContents from '../components/BagContents';

function mapStateToProps(state) {
  const { baggedDiscs } = state;
  console.log(baggedDiscs);
  return {
    baggedDiscs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleUpdateDiscSelected(e) {
      dispatch(updateEnabled(e.target.parentElement.parentElement.parentElement.id, e.target.checked));
    },
    handleUpdateDiscColor(discID, color) {
      // console.log(discID)
      // console.log(color)
      dispatch(updateDiscColor(discID, color));
    },
    handleDeleteDisc(e) {
      dispatch(deleteDisc(e.target.parentElement.parentElement.parentElement.parentElement.id));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BagContents);
