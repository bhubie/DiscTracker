import React from 'react';
import PropTypes from 'prop-types';

export const ButtonPrimary = props => (
  <button onClick={props.onClick} className="button is-primary" id={props.id}>
    {props.children}
  </button>
);

export const ButtonSecondary = props => (
  <button onClick={props.onClick} className="button is-info" id={props.id}>
    {props.children}
  </button>
);

ButtonPrimary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ButtonSecondary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};