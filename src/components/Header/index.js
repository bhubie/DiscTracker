import React from 'react';
import PropTypes from 'prop-types';
import IconGitHub from '../Icons/IconGitHub';
import { ButtonPrimary } from '../Buttons';


const Header = ({ handleGetStartedOnClick }) => (
  <section className="header hero is-primary-dark is-fullheight">
    <div className="hero-head">
      <nav className="navbar  is-flex flex-space-between">
        <div className="container">
          <div className="navbar-brand ">
            <a
              className="navbar-item subtitle is-4"
              href="https://disctracker.netlify.com/"
            >
                Disc Tracker
            </a>
          </div>

          <div className="navbar-end">
            <a
              className="navbar-item"
              href="https://github.com/bhubie/DiscTracker"
              target="_blank"
              rel="noopener noreferrer"
              title="Contribute on Github"
            >
              <IconGitHub id="githubIcon" className="icon-github" />
            </a>
          </div>
        </div>
      </nav>
    </div>

    <div className="hero-body">
      <div className="container">
        <h1 className="title has-text-light">
          Golf Disc Flight Path Visualizer
        </h1>
        <h2 className="subtitle has-text-light">
          Disc flight path data provided by: &nbsp;
          <a href="http://www.inboundsdiscgolf.com" target="_blank" rel="noopener noreferrer">
            Inbounds Disc Golf
          </a>
        </h2>
        <ButtonPrimary id="btnGetStarted" onClick={handleGetStartedOnClick}>
          Get Started
        </ButtonPrimary>
      </div>
    </div>
  </section>

);

Header.propTypes = {
  handleGetStartedOnClick: PropTypes.func.isRequired,
};

export default Header;
