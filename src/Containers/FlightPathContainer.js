import { connect } from 'react-redux';
import FlightPath from '../components/FlightPath';

function mapStateToProps(state) {
  const { displayOptions } = state;
  const { gridColor, gridLineColor, id, hand } = displayOptions[0];
  const throwingStyle = hand.value;

  const discs = [];
    
  return {
      discs, 
      throwingStyle,
    gridColor,
    gridLineColor,
    id,
  };
}

export default connect(
  mapStateToProps
)(FlightPath);

