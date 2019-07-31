import { connect } from 'react-redux';
import { toggleColumnVisibility } from '../Actions/BagSettingsActions';
import BagSettings from '../components/BagSettings';

function mapStateToProps(state) {
  const {
    columns, bagSettings,
  } = state;

  const { id, hiddenColumns } = bagSettings;

  return {
    columns,
    hiddenColumns,
    id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleVisibleColumnChange(id, column, checked) {
      dispatch(toggleColumnVisibility(id, column, checked));
    },
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    handleVisibleColumnChange: (event) => {
      dispatchProps.toggleVisibleColumnChange(stateProps.id, event.target.id, event.target.checked);
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(BagSettings);
