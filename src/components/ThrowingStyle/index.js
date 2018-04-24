import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Div } from 'glamorous';
import 'react-select/dist/react-select.css';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';


export default class ThrowingStyle extends React.Component {
    state = {
      selectedOption: this.props.hand,
      values: [{
        value: 'R',
        label: 'RHBH/LHFH',
      }, {
        value: 'L',
        label: 'LHBH/RHFH',
      }],
    }

    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      this.props.handleStyleChange(selectedOption);
    }

    render() {
      const { selectedOption } = this.state;
      const value = selectedOption && selectedOption.value;
      const style = {
        marginTop: '10px',
        gridColumn: '1 / span 1',
        gridRow: 3,
      };

      return (
        <Div id="throwingStyle" css={style} >
          <Card style={CardStyle} initiallyExpanded>
            <CardHeader
              style={HeaderCardStyle}
              title="Throwing Style"
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <Select
                name="discSelector"
                value={value}
                onChange={this.handleChange}
                options={this.state.values}
                clearable={false}
                searchable={false}
              />
            </CardText>
          </Card>
        </Div>
      );
    }
}

ThrowingStyle.propTypes = {
  hand: PropTypes.objectOf(PropTypes.string).isRequired,
  handleStyleChange: PropTypes.func.isRequired,
};
