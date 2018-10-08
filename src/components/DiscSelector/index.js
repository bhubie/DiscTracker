import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Div } from 'glamorous';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';
import Button from '../Button';
import Select from '../Select';

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
      const disc = this.props.selectableDiscs.filter(d => d._id === this.state.selectedOption)[0];

      if (disc !== undefined) {
        disc.discID = disc._id;
        disc.selected = true;
        disc.color = this.state.discColor;
        disc.weight = this.state.discWeight;
        disc.wear = this.state.discWear;
        this.props.handleAddDiscToBag(this.props.selectedBagID, disc);
      }
    }

    render() {
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
                    options={this.props.selectableDiscs}
                    onChange={this.handleChange}
                    placeHolder="Tap to Select a Disc"
                    showLoadingIndicator
                    loadingMessage="Loading Discs..."
                    selectLabel="name"
                    selectValue="_id"
                    showPlaceHolder
                  />
                </Div>
                <Div css={styleButtonContainer}>
                  <Button id="btnAddToBag" onClick={this.handleClick} type="secondary">
                    Add to Bag
                  </Button>
                </Div>
              </Div>
            </CardText>
          </Card>
        </Div>
      );
    }
}

DiscSelector.propTypes = {
  selectedBagID: PropTypes.number.isRequired,
  selectableDiscs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddDiscToBag: PropTypes.func.isRequired,
};
