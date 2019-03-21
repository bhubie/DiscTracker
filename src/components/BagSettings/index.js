import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';

const BagSettings = ({ columns, hiddenColumns, handleVisibleColumnChange }) => {
  const columnElements = columns
    .filter(column => column.name !== 'Name' && column.name !== 'Manufacturer')
    .map((column) => {
      const isColumnChecked = hiddenColumns.includes(column.name) === false;

      return (<Checkbox
        id={column.name}
        key={column.name}
        label={column.name}
        name={column.caption}
        checked={isColumnChecked}
        onChange={handleVisibleColumnChange}
      />);
    });

  return (
    <div id="bagSettings">
      <div id="selected-columns-container">
        <div className="title is-5">Visible Columns:</div>
        {columnElements}
      </div>
    </div>
  );
};

BagSettings.propTypes = {
  hiddenColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleVisibleColumnChange: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  })).isRequired,
};

export default BagSettings;

