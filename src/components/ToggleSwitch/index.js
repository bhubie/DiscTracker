import React from 'react';
import PropTypes from 'prop-types';


const ToggleSwitch = ({
  id, selected, onToggle, label,
}) => {
  const cssClass = 'switch is-primary is-rounded';
  
  return (
    <div className="field">
      <input
        id={id}
        type="checkbox"
        className={cssClass}
        checked={selected}
        onChange={onToggle}
        secondary
      />
      <label htmlFor={id} id="switchlabel">{label}</label>
    </div>
  );
};

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};


export default ToggleSwitch;
