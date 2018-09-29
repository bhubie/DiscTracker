import React from 'react';
import PropTypes from 'prop-types';
import { Tr, Tbody, Th } from 'glamorous';

const trHeaderStyle = {
  textAlign: 'left',
  fontSize: '0.8125rem',
  display: 'table-row',
  // borderBottom: '1px solid #e9ecef',
};

const styleTableRow = {
  fontSize: '0.8125rem',
  display: 'table-row',
};

const styleTableBody = {
  display: 'table-row-group',
  borderBottom: '1px solid #e9ecef',
};

const styleTableHeader = {
  fontWeight: 'normal',
  fontSize: '12px',
  paddingLeft: '24px',
  paddingRight: '24px',
  height: '40px',
  color: 'rgb(158, 158, 158)',
};

const Type = ({ name, children }) => {
  const renderRowHeaders = (children.length > 0);

  return (
    <Tbody id={name} css={styleTableBody}>
      <Tr css={trHeaderStyle}>
        <Th colSpan="4" css={styleTableHeader}>
          {name}
        </Th>
      </Tr>
      {renderRowHeaders ? (
        <Tr css={styleTableRow}>
          <Th css={styleTableHeader}>
            Name
          </Th>
          <Th css={styleTableHeader}>
            Disc Color
          </Th>
          <Th css={styleTableHeader}>
            Enabled
          </Th>
          <Th css={styleTableHeader}>
            Remove
          </Th>
        </Tr>) : undefined}
      {children}
    </Tbody>
  );
};

Type.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Type;
