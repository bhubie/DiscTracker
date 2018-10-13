import { Div } from 'glamorous';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import { ButtonPrimary } from '../Buttons';


const BagSelector = ({
  bags, handleBagChange, handleNewBagClick, handleDeleteBagClick, showBagModal,
  mode, handleEditBagClick, handleSaveBag, handleCloseModal, bagName, bagID,
  handleEditBagOnChange,
}) => {
  const modalTitle = mode === 'New' ? 'New Bag' : 'Edit Bag';
  const bagInput = mode === 'New' ? undefined : bagName;
  const modalButtons = [
    <FlatButton
      label="Cancel"
      primary
      onClick={handleCloseModal}
    />,
    <FlatButton
      label="Save"
      primary
      onClick={handleSaveBag}
    />,
  ];

  return (
    <Div id="bagSelector">
      <Select
        options={bags}
        onChange={handleBagChange}
        showLoadingIndicator
        loadingMessage="Loading Bags..."
        selectLabel="name"
        selectValue="id"
        placeHolder="test"
        showPlaceHolder={false}
        id="bagSelectorElement"
      />
      <div className="buttons">
        <ButtonPrimary onClick={handleNewBagClick}>
          New Bag
        </ButtonPrimary>
        <ButtonPrimary onClick={handleDeleteBagClick}>
          Delete Bag
        </ButtonPrimary>
        <ButtonPrimary onClick={handleEditBagClick}>
          Edit Bag Name
        </ButtonPrimary>
      </div>
      <Dialog
        title={modalTitle}
        modal={false}
        open={showBagModal}
        onRequestClose={handleCloseModal}
        actions={modalButtons}
      >
        <TextField
          defaultValue={bagInput}
          floatingLabelText="Bag Name"
          id="bagNameTextField"
          onChange={handleEditBagOnChange}
        />
      </Dialog>
    </Div>
  );
};

BagSelector.propTypes = {
  bags: PropTypes.arrayOf(PropTypes.object).isRequired,
  mode: PropTypes.string.isRequired,
  handleBagChange: PropTypes.func.isRequired,
  handleDeleteBagClick: PropTypes.func.isRequired,
  handleNewBagClick: PropTypes.func.isRequired,
  showBagModal: PropTypes.bool.isRequired,
  handleEditBagClick: PropTypes.func.isRequired,
  handleSaveBag: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default BagSelector;

