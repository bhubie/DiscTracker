import { connect } from 'react-redux';
import { addBag, updateBag, toggleBagModal, bagNameOnChange, deleteBag } from '../Actions/BagActions';
import { loadBaggedDiscs } from '../Actions/DiscActions';
import BagSelector from '../components/BagSelector';

function mapStateToProps(state) {
  const {
    bags, showModal, mode, bagName, bagID, modalType,
  } = state;

  return {
    bags,
    showModal: showModal && modalType === 'BagCreator',
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
    handleDeleteBag(bagID) {
      dispatch(deleteBag(bagID));
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
    handleBagChange(bagID) {
      dispatch(loadBaggedDiscs(parseInt(bagID, 0)));
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
    handleDeleteBagClick: () => {
      const e = document.getElementById('bagSelectorElement');
      const id = e.options[e.selectedIndex].value;
      dispatchProps.handleDeleteBag(id);
    },
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(BagSelector);
