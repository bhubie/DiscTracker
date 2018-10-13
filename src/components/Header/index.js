import React from 'react';
import AppTheme from '../../AppTheme';
import IconGitHub from '../Icons/IconGitHub';


const styleIcon = {
  color: AppTheme.palette.alternateTextColor,
  fill: 'currentColor',
};

const Header = () => (
  <nav className="navbar header" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a
        className="navbar-item subtitle is-4"
        href="https://disctracker.netlify.com/"
      >
        Disc Tracker
      </a>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <a
          href="https://github.com/bhubie/DiscTracker"
          target="_blank"
          rel="noopener noreferrer"
          title="Contribute on Github"
        >
          <IconGitHub id="githubIcon" style={styleIcon} />
        </a>
      </div>
    </div>
  </nav>
);

export default Header;
