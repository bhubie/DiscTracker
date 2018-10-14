import React from 'react';
import PropTypes from 'prop-types';

const IconArrowUp = ({ id, style }) => (
  <svg
    id={id}
    aria-hidden="true"
    style={style}
    viewBox="0 0 24 24"
  >
    <path fillRule="evenodd" fillOpacity="1" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
  </svg>
);

export default IconArrowUp;

IconArrowUp.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.string).isRequired,
};
