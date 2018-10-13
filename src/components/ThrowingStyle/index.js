import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';

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
      const cssClass = `button ${value.value === this.props.hand.value ? 'is-primary is-selected' : ''}`;
      return (
        <button className={cssClass} id={value.value} name={value.label} onClick={this.handleChange} >
          {value.label}
        </button>
      );
    });

    return (
      <div id="throwingStyle" className="throwingStyle">
        <Card style={CardStyle} initiallyExpanded>
          <CardHeader
            style={HeaderCardStyle}
            title="Throwing Style"
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <div className="buttons has-addons is-centered">
              {options}
            </div>
          </CardText>
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
