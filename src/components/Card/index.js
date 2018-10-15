import React from 'react';
import PropTypes from 'prop-types';


const Card = ({ children, className }) => {
  const cssClass = `card ${className}`;
  return (
    <div className={cssClass}>
      {children}
    </div>
  );
};

const CardHeader = ({ title, className }) => {
  const cssClass = `card-header ${className}`;
  return (
    <div className={cssClass}>
      <p className="card-header-title">
        {title}
      </p>
    </div>
  );
};

const CardContents = ({ children, className }) => {
  const cssClass = `card-content ${className}`;
  return (
    <div className={cssClass}>
      {children}
    </div>
  );
};

export { Card,
  CardHeader,
  CardContents };

Card.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};


CardContents.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
};

CardContents.defaultProps = {
  className: '',
};

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CardHeader.defaultProps = {
  className: '',
};
