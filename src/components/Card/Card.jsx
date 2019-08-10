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

const CardHeader = ({ className, children }) => {
  const cssClass = `card-header-title ${className}`;
  return (
    <div className="card-header">
      <div className={cssClass}>
        {children}
      </div>
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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContents.defaultProps = {
  className: '',
};

CardHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

CardHeader.defaultProps = {
  className: '',
};
