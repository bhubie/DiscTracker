import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Div } from 'glamorous';
import 'react-select/dist/react-select.css';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';

const discSelectorStyle = {
  width: '100%',
  gridColumn: '1 / span 2',
  gridRow: 2,
  marginTop: '10px',
};

const discSelectorContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
};

const dropdownContainerStyle = {
  width: '70%',
  marginRight: '10px',
  marginTop: '10px',
};

const styleButtonContainer = {
  marginTop: '10px',
};

export default class DiscSelector extends React.Component {
    state = {
      selectedOption: '',
      discColor: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      discWeight: '',
      discWear: 10,
    }

    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
    }

    handleClick = () => {
      const disc = this.props.discs.filter(d => d.discID === this.state.selectedOption.value)[0];

      if (disc !== undefined) {
        disc.selected = true;
        disc.color = this.state.discColor;
        disc.weight = this.state.discWeight;
        disc.wear = this.state.discWear;
        this.props.handleAddToBag(disc);
      }
    }

    render() {
      const { selectedOption } = this.state;
      const value = selectedOption && selectedOption.value;


      const values = this.props.discs.map(disc => ({
        value: disc.discID,
        label: `${disc.Manufacturer} ${disc.Name}`,
      }));

      return (
        <Div id="discSelector" css={discSelectorStyle}>
          <Card style={CardStyle} initiallyExpanded>
            <CardHeader
              style={HeaderCardStyle}
              title="Available Discs"
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <Div id="DiscSelectorContainer" css={discSelectorContainerStyle}>
                <Div css={dropdownContainerStyle} id="dropDownContainer">
                  <Select
                    name="discSelector"
                    value={value}
                    onChange={this.handleChange}
                    options={values}
                    placeholder="Select or search for a disc..."
                  />
                </Div>
                <Div css={styleButtonContainer}>
                  <RaisedButton label="Add to Bag" secondary onClick={this.handleClick} />
                </Div>
              </Div>
            </CardText>
          </Card>
        </Div>
      );
    }
}

DiscSelector.propTypes = {
  discs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddToBag: PropTypes.func.isRequired,
};
