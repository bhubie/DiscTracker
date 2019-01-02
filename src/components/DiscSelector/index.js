/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContents } from '../Card';
import { ButtonPrimary } from '../Buttons';
import Select from '../Select';
import Checkbox from '../Checkbox';

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
          <Card>
            <CardHeader
              title="Available Discs"
            />
            <CardContents>
              <div id="DiscSelectorContainer" className="columns">
                <div id="dropDownContainer" className="column is-three-quarters is-two-thirds-tablet ">
                  <Select
                    options={this.props.selectableDiscs}
                    onChange={this.handleChange}
                    placeHolder="Tap to Select a Disc"
                    showLoadingIndicator
                    loadingMessage="Loading Discs..."
                    selectLabel="discWithManufacturer"
                    selectValue="_id"
                    showPlaceHolder
                  />
                </div>
                <div className="column ">
                  <ButtonPrimary id="btnAddToBag" onClick={this.handleClick} isFullWidth>
                    Add to Bag
                  </ButtonPrimary>
                </div>
              </div>
              <div id="filter-container" className="column is-full">
                <h5 className="title is-5">Filters</h5>
                <Checkbox
                  id="includeDriverCheckbox"
                  name="Distance Driver"
                  checked={this.props.includedDiscTypes.includes('Distance Driver')}
                  onChange={this.props.handleDiscFilterCheckboxChange}
                  label="Drivers"
                />
                <Checkbox
                  id="includeFairwayCheckbox"
                  name="Fairway Driver"
                  checked={this.props.includedDiscTypes.includes('Fairway Driver')}
                  onChange={this.props.handleDiscFilterCheckboxChange}
                  label="Fairway Drivers"
                />
                <Checkbox
                  id="includeMidCheckbox"
                  name="Mid-Range"
                  checked={this.props.includedDiscTypes.includes('Mid-Range')}
                  onChange={this.props.handleDiscFilterCheckboxChange}
                  label="Mid-Ranges"
                />
                <Checkbox
                  id="includePutCheckbox"
                  name="Putt & Approach"
                  checked={this.props.includedDiscTypes.includes('Putt & Approach')}
                  onChange={this.props.handleDiscFilterCheckboxChange}
                  label="Putters"
                />
              </div>
            </CardContents>
          </Card>
        </div>
      );
    }
}

DiscSelector.propTypes = {
  selectedBagID: PropTypes.number.isRequired,
  selectableDiscs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddDiscToBag: PropTypes.func.isRequired,
  handleDiscFilterCheckboxChange: PropTypes.func.isRequired,
  includedDiscTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
