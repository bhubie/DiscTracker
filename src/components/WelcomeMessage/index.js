import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Div } from 'glamorous';
import AppTheme from '../../AppTheme';
import { mediaQueries } from '../../Utils/MediaQueries';


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
      <a href="www.inboundsdiscglf.com">Inbounds Disc Golf</a>
    </p>
    <Div id="getStartedButtonContainer" css={getStartedButtomWrapperStyle}>
      <RaisedButton label="Get Started" secondary onClick={handleGetStartedOnClick} />
    </Div>
  </Div>
);

WelcomeMessage.propTypes = {
  handleGetStartedOnClick: PropTypes.func.isRequired,
};

export default WelcomeMessage;
