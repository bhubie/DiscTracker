import { connect } from 'react-redux';
import { updateGridColor, updateGridLineColor, updateHand } from '../Actions/DisplayOptionsActions';
import DisplayOptions from '../components/DisplayOptions';

function mapStateToProps(state) {
  const { displayOptions } = state;
  const { gridColor, gridLineColor, id } = displayOptions[0];
  
  return {
    gridColor,
    gridLineColor,
    id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleUpdateHand(id, hand) {
      dispatch(updateHand(id, hand));
    },
    handleUpdateGridColor(id, gridColor) {
      dispatch(updateGridColor(id, gridColor));
    },
    handleUpdateGridLineColor(id, gridLineColor) {
      dispatch(updateGridLineColor(id, gridLineColor));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayOptions);
