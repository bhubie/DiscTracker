/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import ColorPicker from '../../ColorPicker/index';
import ToggleSwitch from '../../ToggleSwitch';
import IconDelete from '../../Icons/IconDelete';

const Disc = ({
  name, selected, handleDeleteDisc,
  handleUpdateDiscSelected, discID, handleUpdateDiscColor, discColor,
}) => (
  <tr id={discID} className="tableRowStyle">
    <td className="styleTableCell">
      {name}
    </td>
    <td className="styleTableCell">
      <div className="center-contents">
        <ColorPicker
          itemID={discID}
          handleColorChange={handleUpdateDiscColor}
          selectedColor={discColor}
        />
      </div>
    </td>
    <td className="styleTableCell">
      <ToggleSwitch
        id={`enabledSwitch${discID}`}
        selected={selected}
        onToggle={handleUpdateDiscSelected}
        label=""
      />
    </td>
    <td className="styleTableCell">
      <div
        role="button"
        tabIndex={0}
        onClick={handleDeleteDisc}
        className="cursor-pointer"
      >
        <IconDelete className="delete-icon" id={`deleteDisc${discID}`} />
      </div>
    </td>
  </tr>
);

Disc.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  // weight: PropTypes.string.isRequired,
  handleDeleteDisc: PropTypes.func.isRequired,
  handleUpdateDiscSelected: PropTypes.func.isRequired,
  discID: PropTypes.number.isRequired,
  handleUpdateDiscColor: PropTypes.func.isRequired,
  discColor: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Disc;
