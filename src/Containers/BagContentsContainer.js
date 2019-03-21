import { connect } from 'react-redux';
import { updateEnabled, updateDiscColor, updateWear, deleteDisc } from '../Actions/DiscActions';
import BagContents from '../components/BagContents';

function mapStateToProps(state) {
  const { baggedDiscs, bagSettings, columns } = state;
  const { hiddenColumns } = bagSettings;

  const visibleColumns = columns.filter(column => !hiddenColumns.includes(column.name) && column.name !== 'Manufacturer');

  return {
    baggedDiscs,
    columns: visibleColumns,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleUpdateDiscSelected(e) {
      dispatch(updateEnabled(e.target.parentElement
        .parentElement.parentElement.id, e.target.checked));
    },
    handleUpdateDiscWear(e) {
      dispatch(updateWear(e.target.parentElement
        .parentElement.parentElement.id, e.target.options[e.target.selectedIndex].value));
    },
    handleUpdateDiscColor(discID, color) {
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
