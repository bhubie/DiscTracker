import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';
import { ButtonPrimary } from '../Buttons';
import Select from '../Select';

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
        <div id="discSelector" className="discSelectorStyle">
          <Card style={CardStyle} initiallyExpanded>
            <CardHeader
              style={HeaderCardStyle}
              title="Available Discs"
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <div id="DiscSelectorContainer" className="columns">
                <div id="dropDownContainer" className="column is-three-quarters">
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
                </div>
                <div className="column is-fullwidth">
                  <ButtonPrimary id="btnAddToBag" onClick={this.handleClick} isFullWidth>
                    Add to Bag
                  </ButtonPrimary>
                </div>
              </div>
            </CardText>
          </Card>
        </div>
      );
    }
}

DiscSelector.propTypes = {
  selectedBagID: PropTypes.number.isRequired,
  selectableDiscs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddDiscToBag: PropTypes.func.isRequired,
};
