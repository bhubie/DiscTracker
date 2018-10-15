import React from 'react';
import PropTypes from 'prop-types';

const IconDelete = ({ id, style }) => (
  <svg
    id={id}
    aria-hidden="true"
    style={style}
    viewBox="0 0 24 24"
  >
    <path fillRule="evenodd" fillOpacity="1" strokeLinejoin="round" d="M 19,4L 15.5,4L 14.5,3L 9.5,3L 8.5,4L 5,4L 5,6L 19,6M 6,19C 6,20.1 6.9,21 8,21L 16,21C 17.1,21 18,20.1 18,19L 18,7L 6,7L 6,19 Z " />
  </svg>
);

export default IconDelete;

IconDelete.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.string).isRequired,
};
