import React from 'react';
import PropTypes from 'prop-types';
import IconGitHub from '../Icons/IconGitHub';
import { Button, Color } from '../FormComponents/FormComponents.tsx';


const Header = ({ handleGetStartedOnClick }) => (
  <section className="header hero is-primary-dark is-fullheight">
    <div className="hero-head">
      <nav className="navbar">
        <div className="container is-flex flex-space-between">
          <div className="navbar-brand ">
            <a
              className="navbar-item subtitle is-4"
              href="https://disctracker.netlify.com/"
            >
                Disc Golf Bag Manager
            </a>
          </div>

          <div className="navbar-end">
            <a
              className="navbar-item"
              href="https://github.com/bhubie/DiscTracker"
              target="_blank"
              rel="noopener noreferrer"
              title="Contribute on Github"
              id="link-github"
            >
              <IconGitHub id="githubIcon" color="white" />
            </a>
          </div>
        </div>
      </nav>
    </div>

    <div className="hero-body">
      <div className="container">
        <h1 className="title has-text-light">
          Golf Disc Bag Manager & Flight Path Visualizer
        </h1>
        <h2 className="subtitle has-text-light">
          Disc flight path data provided by: &nbsp;
          <a
            className="has-text-info"
            href="http://www.inboundsdiscgolf.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inbounds Disc Golf
          </a>
        </h2>
        <Button id="btnGetStarted" onClick={handleGetStartedOnClick} color={Color.Info}>
          Get Started
        </Button>
      </div>
    </div>
  </section>

);

Header.propTypes = {
  handleGetStartedOnClick: PropTypes.func.isRequired,
};

export default Header;
