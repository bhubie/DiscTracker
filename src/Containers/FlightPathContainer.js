import { connect } from 'react-redux';
import FlightPath from '../components/FlightPath';

function mapStateToProps(state) {
  const { displayOptions, baggedDiscs } = state;
  const {
    gridColor, gridLineColor, id, hand,
  } = displayOptions[0];
  const throwingStyle = hand.value;

  return {
    baggedDiscs,
    throwingStyle,
    gridColor,
    gridLineColor,
    id,
  };
}

export default connect(mapStateToProps)(FlightPath);

