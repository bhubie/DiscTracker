import React from 'react';
import PropTypes from 'prop-types';

export const ButtonPrimary = ({
  children, id, isFullWidth, onClick, size,
}) => {
  let buttonSize;
  switch (size) {
    case 'small':
      buttonSize = ' is-small';
      break;
    case 'medium':
      buttonSize = ' is-medium';
      break;
    case 'large':
      buttonSize = ' is-large';
      break;
    default:
      buttonSize = '';
  }
  const cssClass = `button is-primary${isFullWidth ? ' is-fullwidth' : ''}${buttonSize}`;

  return (
    <button onClick={onClick} className={cssClass} id={id}>
      {children}
    </button>
  );
};

export const ButtonSecondary = props => (
  <button onClick={props.onClick} className="button is-info" id={props.id}>
    {props.children}
  </button>
);

ButtonPrimary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isFullWidth: PropTypes.bool,
  size: PropTypes.string,
};

ButtonPrimary.defaultProps = {
  isFullWidth: false,
  size: '',
};

ButtonSecondary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
