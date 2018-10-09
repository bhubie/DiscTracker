import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import Delete from 'material-ui/svg-icons/action/delete';
import { Tr, Div, Td } from 'glamorous';
import ColorPicker from '../../ColorPicker/index';
import AppTheme from '../../../AppTheme';

const styleToggle = {
  width: '0%',
  margin: 'auto',
};

const tableRowStyle = {
  textAlign: 'center',
  fontSize: '0.8125rem',
  display: 'table-row',
};

const colorPickerWrapperStyle = {
  margin: 'auto',
  width: '50%',
};

const styleTableCell = {
  display: 'table-cell',
  paddingLeft: '24px',
  paddingRight: '24px',
  height: '40px',
  fontSize: '13px',
};

const styleDeleteButtom = {
  cursor: 'pointer',
};

const Disc = ({
  name, selected, weight, handleDeleteDisc,
  handleUpdateDiscSelected, discID, handleUpdateDiscColor, discColor,
}) => (
  <Tr id={discID} css={tableRowStyle}>
    <Td css={styleTableCell}>
      {name}
    </Td>
    <Td css={styleTableCell}>
      <Div css={colorPickerWrapperStyle}>
        <ColorPicker
          itemID={discID}
          handleColorChange={handleUpdateDiscColor}
          selectedColor={discColor}
        />
      </Div>
    </Td>
    <Td css={styleTableCell}>
      <Toggle
        defaultToggled={selected}
        onToggle={handleUpdateDiscSelected}
        style={styleToggle}
        secondary
      />
    </Td>
    <Td css={styleTableCell}>
      <Div
        css={styleDeleteButtom}
        role="button"
        tabIndex={0}
        onClick={handleDeleteDisc}
      >
        <Delete
          color={AppTheme.palette.primary1Color}
        />
      </Div>
    </Td>
  </Tr>
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
