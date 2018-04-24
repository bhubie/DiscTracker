import React from 'react';
import { Header as GlamHeader, H1 } from 'glamorous';
import AppTheme from '../../AppTheme';

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
};

const h1Style = {
  float: 'left',
  fontSize: '24px',
  fontWeight: 400,
};

const Header = () => (
  <GlamHeader css={headerStyle}>
    <H1 css={h1Style}>
      Disc Tracker
    </H1>
  </GlamHeader>
);

export default Header;
// export default muiThemeable()(Header);
