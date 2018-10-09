import { connect } from 'react-redux';
import { updateHand } from '../Actions/DisplayOptionsActions';
import ThrowingStyle from '../components/ThrowingStyle';

function mapStateToProps(state) {
  const { displayOptions } = state;
  const { id, hand } = displayOptions[0];

  const throwingStyleValues = [{
    value: 'R',
    label: 'RHBH/LHFH',
  }, {
    value: 'L',
    label: 'LHBH/RHFH',
  }];

  return {
    hand,
    id,
    throwingStyleValues,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleUpdateHand(id, hand) {
      dispatch(updateHand(id, hand));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThrowingStyle);
