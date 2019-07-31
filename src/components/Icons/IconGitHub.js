import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


const IconGitHub = ({ id, color }) => <FontAwesomeIcon id={id} icon={faGithub} size="2x" color={color} className="cursor-pointer" />;

export default IconGitHub;

IconGitHub.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
