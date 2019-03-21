import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContents } from '../Card';

export default class ThrowingStyle extends React.Component {
  handleChange = (e) => {
    const clickedOption = {
      value: e.target.id,
      label: e.target.name,
    };

    this.props.handleUpdateHand(this.props.id, clickedOption);
  }

  render() {
    const options = this.props.throwingStyleValues.map((value) => {
      const cssClass = `button ${value.value === this.props.hand.value ? 'is-info is-selected' : ''}`;
      return (
        <button
          className={cssClass}
          id={value.value}
          name={value.label}
          onClick={this.handleChange}
          key={value.value}
        >
          {value.label}
        </button>
      );
    });

    return (
      <div id="throwingStyle" className="throwingStyle">
        <Card>
          <CardHeader>
            Throwing Style
          </CardHeader>
          <CardContents>
            <div className="buttons has-addons is-centered">
              {options}
            </div>
          </CardContents>
        </Card>
      </div>
    );
  }
}

ThrowingStyle.propTypes = {
  hand: PropTypes.objectOf(PropTypes.string).isRequired,
  handleUpdateHand: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  throwingStyleValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};
