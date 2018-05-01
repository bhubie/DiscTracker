import React from 'react';
import PropTypes from 'prop-types';
import { Div } from 'glamorous';
import AppTheme from '../../AppTheme';
import Link from '../Link/index';
import { mediaQueries } from '../../Utils/MediaQueries';
import Button from '../Button';


const welcomeMessageStyle = {
  gridArea: 'welcomemessage',
  textAlign: 'center',
  color: AppTheme.palette.alternateTextColor,
  [mediaQueries.maxWidth750.value]: {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
};

const getStartedButtomWrapperStyle = {
  display: 'none',
  [mediaQueries.maxWidth750.value]: {
    display: 'inline',
  },
};

const WelcomeMessage = ({ handleGetStartedOnClick }) => (
  <Div id="welcomeMessage" css={welcomeMessageStyle}>
    <p>
        Golf Disc Flight Path Visualizer
    </p>
    <p>
        Disc flight path data provided by:
      <br />
      <br />
      <Link
        href="http://www.inboundsdiscgolf.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Inbounds Disc Golf
      </Link>
    </p>
    <Div id="getStartedButtonContainer" css={getStartedButtomWrapperStyle}>
      <Button id="btnGetStarted" onClick={handleGetStartedOnClick} type="secondary">
        Get Started
      </Button>
    </Div>
  </Div>
);

WelcomeMessage.propTypes = {
  handleGetStartedOnClick: PropTypes.func.isRequired,
};

export default WelcomeMessage;
