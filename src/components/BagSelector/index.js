import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import { ButtonPrimary } from '../Buttons';
import Modal from '../Modal';


const BagSelector = ({
  bags, handleBagChange, handleNewBagClick, handleDeleteBagClick, showBagModal,
  mode, handleEditBagClick, handleSaveBag, handleCloseModal, bagName, bagID,
  handleEditBagOnChange,
}) => {
  const modalTitle = mode === 'New' ? 'New Bag' : 'Edit Bag';
  const bagInput = mode === 'New' ? undefined : bagName;
  const modalButtons = [
    <button
      onClick={handleCloseModal}
      className="button"
    >Cancel
    </button>,
    <button
      className="button is-success"
      onClick={handleSaveBag}
    > Save
    </button>,
  ];

  return (
    <div id="bagSelector" className="columns is-desktop">
      <div className="column">
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
      </div>
      <div className="buttons column" >
        <ButtonPrimary onClick={handleNewBagClick} size="small">
          New Bag
        </ButtonPrimary>
        <ButtonPrimary onClick={handleDeleteBagClick} size="small">
          Delete Bag
        </ButtonPrimary>
        <ButtonPrimary onClick={handleEditBagClick} size="small">
          Edit Bag Name
        </ButtonPrimary>
      </div>
      <Modal
        title={modalTitle}
        modal={false}
        open={showBagModal}
        onRequestClose={handleCloseModal}
        actions={modalButtons}
      >
        <input
          type="text"
          className="input"
          id="bagNameTextField"
          onChange={handleEditBagOnChange}
          value={bagInput}
          placeholder="Bag Name"
        />
      </Modal>
    </div>
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

