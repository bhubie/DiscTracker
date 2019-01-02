/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import ColorPicker from '../../ColorPicker/index';
import ToggleSwitch from '../../ToggleSwitch';
import IconDelete from '../../Icons/IconDelete';
import Select from '../../Select';

const discWearOptions = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
];

const Disc = ({
  name, selected, handleDeleteDisc,
  handleUpdateDiscSelected, discID, handleUpdateDiscColor, discColor, discWear,
  handleUpdateDiscWear,
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
      <Select
        options={discWearOptions}
        placeHolder=" "
        showLoadingIndicator={false}
        loadingMessage="Loading"
        selectLabel="value"
        selectValue="value"
        showPlaceHolder={false}
        selectedOption={discWear}
        onChange={handleUpdateDiscWear}
        returnFullEvent
      />
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
  discWear: PropTypes.number.isRequired,
  handleUpdateDiscWear: PropTypes.func.isRequired,
};

export default Disc;
