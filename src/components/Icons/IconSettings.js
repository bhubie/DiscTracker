import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const IconSettings = ({ id, color }) => <FontAwesomeIcon id={id} icon={faCog} size="lg" color={color} className="cursor-pointer" />;


export default IconSettings;

IconSettings.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

