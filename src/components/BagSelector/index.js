import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import { ButtonPrimary } from '../Buttons';
import Modal from '../Modal';


const BagSelector = ({
  bags, handleBagChange, handleNewBagClick, handleDeleteBagClick, showModal,
  mode, handleEditBagClick, handleSaveBag, handleCloseModal, bagName,
  handleEditBagOnChange,
}) => {
  const modalTitle = mode === 'New' ? 'New Bag' : 'Edit Bag';

  let bagNameInputCSSClass;
  let isSaveButtonDisables = true;

  if (bagName !== undefined && bagName !== '') {
    bagNameInputCSSClass = 'input is-success';
    isSaveButtonDisables = false;
  } else {
    bagNameInputCSSClass = 'input is-danger';
  }

  const modalButtons = [
    <button
      onClick={handleCloseModal}
      className="button"
      key="positiveButton"
    >
      Cancel
    </button>,
    <button
      className="button is-success"
      onClick={handleSaveBag}
      disabled={isSaveButtonDisables}
      key="negativeButton"
    >
      Save
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
        <ButtonPrimary onClick={handleEditBagClick} size="small">
          Edit Bag Name
        </ButtonPrimary>
        <ButtonPrimary onClick={handleDeleteBagClick} size="small">
          Delete Bag
        </ButtonPrimary>
      </div>
      <Modal
        title={modalTitle}
        modal={false}
        open={showModal}
        onRequestClose={handleCloseModal}
        actions={modalButtons}
      >
        <input
          type="text"
          className={bagNameInputCSSClass}
          id="bagNameTextField"
          onChange={handleEditBagOnChange}
          value={bagName}
          placeholder="Bag Name"
        />
      </Modal>
    </div>
  );
};

BagSelector.propTypes = {
  bags: PropTypes.arrayOf(PropTypes.object).isRequired,
  bagName: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  handleBagChange: PropTypes.func.isRequired,
  handleEditBagOnChange: PropTypes.func.isRequired,
  handleDeleteBagClick: PropTypes.func.isRequired,
  handleNewBagClick: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleEditBagClick: PropTypes.func.isRequired,
  handleSaveBag: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default BagSelector;

