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
  name, selected, weight, handleRemoveDisc,
  handleSelectedStateChange, discID, handleDiscColorChange,
}) => {
  const onClick = (e) => {
    handleRemoveDisc(e.target.parentElement.parentElement.parentElement.parentElement.id);
  };

  const onCheck = (e) => {
    handleSelectedStateChange(
      e.target.parentElement.parentElement.parentElement.id,
      e.target.checked,
    );
  };

  const color = {
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  };

  return (
    <Tr id={discID} css={tableRowStyle}>
      <Td css={styleTableCell}>
        {name}
      </Td>
      <Td css={styleTableCell}>
        <Div css={colorPickerWrapperStyle}>
          <ColorPicker
            item={discID}
            handleColorChange={handleDiscColorChange}
            selectedColor={color}
          />
        </Div>
      </Td>
      <Td css={styleTableCell}>
        <Toggle
          defaultToggled={selected}
          onToggle={onCheck}
          style={styleToggle}
          secondary
        />
      </Td>
      <Td css={styleTableCell}>
        <Div
          css={styleDeleteButtom}
          role="button"
          tabIndex={0}
          onClick={onClick}
        >
          <Delete
            color={AppTheme.palette.primary1Color}
          />
        </Div>
      </Td>
    </Tr>
  );
};

Disc.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  weight: PropTypes.string.isRequired,
  handleRemoveDisc: PropTypes.func.isRequired,
  handleSelectedStateChange: PropTypes.func.isRequired,
  discID: PropTypes.number.isRequired,
  handleDiscColorChange: PropTypes.func.isRequired,
};

export default Disc;
