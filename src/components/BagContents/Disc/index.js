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
  handleUpdateDiscWear, displayedFields,
}) => {
  const displayedColumns = displayedFields.map((column) => {
    const cssClass = column.name === 'Name' ? 'styleTableCell sticky-column' : 'styleTableCell';
    let contents;
    switch (column.name) {
      case 'Name':
        contents = name;
        break;
      case 'Manufacturer':
        contents = name;
        break;
      case 'Wear':
        contents = (
          <Select
            options={discWearOptions}
            placeHolder=" "
            showLoadingIndicator={false}
            loadingMessage="Loading"
            selectLabel="value"
            selectValue="value"
            showPlaceHolder={false}
            selectedOption={discWear.toString()}
            onChange={handleUpdateDiscWear}
            returnFullEvent
          />
        );
        break;
      case 'Disc Color':
        contents = (
          <div className="center-contents">
            <ColorPicker
              itemID={discID}
              handleColorChange={handleUpdateDiscColor}
              selectedColor={discColor}
            />
          </div>
        );
        break;
      case 'Enabled':
        contents = (
          <ToggleSwitch
            id={`enabledSwitch${discID}`}
            selected={selected}
            onToggle={handleUpdateDiscSelected}
            label=""
          />
        );
        break;
      case 'Remove':
        contents = (
          <div
            role="button"
            tabIndex={0}
            onClick={handleDeleteDisc}
            className="cursor-pointer"
          >
            <IconDelete className="delete-icon" id={`deleteDisc${discID}`} />
          </div>
        );
        break;
      default:
        contents = undefined;
    }

    return (
      <td className={cssClass} key={column.name + discID}>
        {contents}
      </td>
    );
  });

  return (
    <tr id={discID} className="tableRowStyle" key={discID}>
      {displayedColumns}
    </tr>
  );
};

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
  displayedFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  })).isRequired,
};

export default Disc;
