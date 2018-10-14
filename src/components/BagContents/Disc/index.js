import React from 'react';
import PropTypes from 'prop-types';
import ColorPicker from '../../ColorPicker/index';
import AppTheme from '../../../AppTheme';
import ToggleSwitch from '../../ToggleSwitch';
import IconDelete from '../../Icons/IconDelete';

const colorPickerWrapperStyle = {
  margin: 'auto',
  width: '50%',
};

const styleDeleteButtom = {
  cursor: 'pointer',
};

const styleDeleteIcon = {
  color: AppTheme.palette.primary1Color,
  fill: 'currentColor',
  width: '28px',
  height: '28px',
};

const Disc = ({
  name, selected, weight, handleDeleteDisc,
  handleUpdateDiscSelected, discID, handleUpdateDiscColor, discColor,
}) => (
  <tr id={discID} className="tableRowStyle">
    <td className="styleTableCell">
      {name}
    </td>
    <td className="styleTableCell">
      <div style={colorPickerWrapperStyle}>
        <ColorPicker
          itemID={discID}
          handleColorChange={handleUpdateDiscColor}
          selectedColor={discColor}
        />
      </div>
    </td>
    <td className="styleTableCell">
      <ToggleSwitch
        id="enabledSwitch"
        selected={selected}
        onToggle={handleUpdateDiscSelected}
        label=""
      />
    </td>
    <td className="styleTableCell">
      <div
        style={styleDeleteButtom}
        role="button"
        tabIndex={0}
        onClick={handleDeleteDisc}
      >
        <IconDelete style={styleDeleteIcon} />
      </div>
    </td>
  </tr>
);

Disc.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  weight: PropTypes.string.isRequired,
  handleDeleteDisc: PropTypes.func.isRequired,
  handleUpdateDiscSelected: PropTypes.func.isRequired,
  discID: PropTypes.number.isRequired,
  handleUpdateDiscColor: PropTypes.func.isRequired,
};

export default Disc;
