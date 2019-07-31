import { connect } from 'react-redux';
import { updateGridColor, updateGridLineColor, updateHand } from '../Actions/DisplayOptionsActions';
import DisplayOptions from '../components/DisplayOptions';

function mapStateToProps(state) {
  const { displayOptions } = state;
  const {
    gridColor, gridLineColor, id, hand,
  } = displayOptions[0];

  const throwingStyleValues = [{
    value: 'R',
    label: 'RHBH/LHFH',
  }, {
    value: 'L',
    label: 'LHBH/RHFH',
  }];

  return {
    gridColor,
    gridLineColor,
    throwingStyleValues,
    id,
    hand,
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
    toggleThrowingStyle(id, hand) {
      dispatch(updateHand(id, hand));
    },
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    handleThrowingStyleChange: (event) => {
      const clickedOption = {
        value: event.target.id,
        label: event.target.name,
      };
      dispatchProps.toggleThrowingStyle(stateProps.id, clickedOption);
    },
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DisplayOptions);
