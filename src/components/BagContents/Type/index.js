import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Type = ({ name, children, columns }) => {
  const renderRowHeaders = (children.length > 0);

  const tableHeaders = columns.map((column) => {
    const cssClass = classNames(
      'styleTableHeader',
      { 'sticky-column': column.name === 'Name' },
      { 'select-cell': column.name === 'Wear' },
    );
    return (
      <th className={cssClass} key={column.name}>
        {column.caption}
      </th>
    );
  });

  return (
    <div>
      <div className="mg-bt-10px">{name}</div>
      <div id="tableWrapper" className="styleTableWrapper">
        <table id={name} className="styleTable">
          <thead>
            <tr>
              {renderRowHeaders ? tableHeaders : undefined}
            </tr>
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
