import React from 'react';
import PropTypes from 'prop-types';
import { ButtonPrimary } from '../Buttons';

const WelcomeMessage = ({ handleGetStartedOnClick }) => (
  <div id="welcomeMessage" className="welcomeMessage">
    <p>
        Golf Disc Flight Path Visualizer
    </p>
    <p>
        Disc flight path data provided by:
      <br />
      <br />
      <a
        href="http://www.inboundsdiscgolf.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Inbounds Disc Golf
      </a>
    </p>
    <div id="getStartedButtonContainer" className="getStartedButtonContainer">
      <ButtonPrimary id="btnGetStarted" onClick={handleGetStartedOnClick}>
        Get Started
      </ButtonPrimary>
    </div>
  </div>
);

WelcomeMessage.propTypes = {
  handleGetStartedOnClick: PropTypes.func.isRequired,
};

export default WelcomeMessage;
