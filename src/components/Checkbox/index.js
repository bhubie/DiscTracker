/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = React.memo(({
  id, name, label, checked, onChange,
}) => {
  const cssClass = 'is-checkradio is-primary';
  return (
    <div>
      <input
        className={cssClass}
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
});

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
