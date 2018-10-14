import React from 'react';
import PropTypes from 'prop-types';

const Type = ({ name, children }) => {
  const renderRowHeaders = (children.length > 0);

  return (
    <tbody id={name} className="styleTableBody">
      <tr className="trHeaderStyle">
        <th colSpan="4" className="styleTableHeader">
          {name}
        </th>
      </tr>
      {renderRowHeaders ? (
        <tr className="styleTableRow">
          <th className="styleTableHeader">
            Name
          </th>
          <th className="styleTableHeader">
            Disc Color
          </th>
          <th className="styleTableHeader">
            Enabled
          </th>
          <th className="styleTableHeader">
            Remove
          </th>
        </tr>) : undefined}
      {children}
    </tbody>
  );
};

Type.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Type;
