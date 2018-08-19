import { Div } from 'glamorous';
import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import Button from '../Button';


const BagSelector = ({
  values, handleBagChange, handleNewBag, handleDeleteBag, handleEditBag,
}) => (
  <Div id="bagSelector">
    <Select
      options={values}
      onChange={handleBagChange}
      showLoadingIndicator
      loadingMessage="Loading Bags..."
    />
    <Button onClick={handleNewBag}>
        New Bag
    </Button>
    <Button onClick={handleDeleteBag}>
        Delete Bag
    </Button>
    <Button onClick={handleEditBag}>
        Edit
    </Button>
  </Div>
);

BagSelector.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleBagChange: PropTypes.func.isRequired,
  handleDeleteBag: PropTypes.func.isRequired,
  handleNewBag: PropTypes.func.isRequired,
  handleEditBag: PropTypes.func.isRequired,
};

export default BagSelector;

