import React from 'react';
import PropTypes from 'prop-types';

const Type = ({ name, children }) => {
  const renderRowHeaders = (children.length > 0);

  return (
    <div>
      <div className="mg-bt-10px">{name}</div>
      <div id="tableWrapper" className="styleTableWrapper">
        <table id={name} className="styleTable">
          <thead>
            {renderRowHeaders ? (
              <tr className="styleTableRow">
                <th className="styleTableHeader sticky-column">
                  Name
                </th>
                <th className="styleTableHeader">
                  Disc Color
                </th>
                <th className="styleTableHeader" style={{ minWidth: '100px' }}>
                  Wear
                </th>
                <th className="styleTableHeader">
                  Enabled
                </th>
                <th className="styleTableHeader">
                  Remove
                </th>
              </tr>) : undefined}
          </thead>
          <tbody id={name} className="styleTableBody">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Type.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Type;
