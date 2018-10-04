import { connect } from 'react-redux';
import { addBag, updateBag, toggleBagModal, bagNameOnChange } from '../Actions/BagActions';
import BagSelector from '../components/BagSelector';

function mapStateToProps(state) {
  const {
    bags, showBagModal, mode, bagName, bagID,
  } = state;

  return {
    bags,
    showBagModal,
    mode,
    bagName,
    bagID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddBag(name) {
      dispatch(addBag(name));
    },
    handleUpdateBag(bagID, bagName) {
      dispatch(updateBag(bagID, bagName));
    },
    handleEditBagOnChange(event) {
      dispatch(bagNameOnChange(event.target.value));
    },
    handleNewBagClick() {
      dispatch(toggleBagModal('New'));
    },
    handleEditBagClick() {
      const e = document.getElementById('bagSelectorElement');
      const id = e.options[e.selectedIndex].value;
      const name = e.options[e.selectedIndex].text;
      dispatch(toggleBagModal('Edit', id, name));
    },
    handleCloseModal() {
      dispatch(toggleBagModal('Edit'));
    },
  };
}


function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    handleSaveBag: () => {
      if (stateProps.bagID === undefined) {
        dispatchProps.handleAddBag(stateProps.bagName);
      } else {
        dispatchProps.handleUpdateBag(stateProps.bagID, stateProps.bagName);
      }
    },
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(BagSelector);
