import React from 'react';
import { Header as GlamHeader, H1, Nav } from 'glamorous';
import AppTheme from '../../AppTheme';
import IconGitHub from '../Icons/IconGitHub';

const headerStyle = {
  left: 0,
  top: 0,
  height: '56px',
  padding: '0 24px',
  background: AppTheme.palette.primary2Color,
  zIndex: 50,
  gridArea: 'header',
  marginBottom: '24px',
  color: AppTheme.palette.alternateTextColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const h1Style = {
  margin: '0',
  fontSize: '24px',
  fontWeight: '400',
};

const styleIcon = {
  color: AppTheme.palette.alternateTextColor,
  fill: 'currentColor',
};

const styleNav = {
  fontSize: '100%',
};

const Header = () => (
  <GlamHeader css={headerStyle} id="Header">
    <H1 css={h1Style}>
      Disc Tracker
    </H1>
    <Nav id="headerNav" css={styleNav}>
      <a
        href="https://github.com/bhubie/DiscTracker"
        target="_blank"
        rel="noopener noreferrer"
        title="Contribute on Github"
      >
        <IconGitHub id="githubIcon" style={styleIcon} />
      </a>
    </Nav>
  </GlamHeader>
);

export default Header;
