import React from 'react';
import PropTypes from 'prop-types';

export const ButtonPrimary = (props) => {
  const cssClass = `button is-primary ${props.isFullWidth ? 'is-fullwidth' : ''}`;

  return (
    <button onClick={props.onClick} className={cssClass} id={props.id}>
      {props.children}
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
};

ButtonSecondary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
