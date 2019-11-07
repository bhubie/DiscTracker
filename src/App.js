import React, { Component } from 'react';
import Header from './components/Header';
import { DiscSelector } from './components/DiscSelector/DiscSelector.tsx';
import BottomSheet from './components/BottomSheet';
import { fetchDiscs } from './Actions/DiscActions';
import { DisplayOptions } from './components/DisplayOptions/DisplayOptions.tsx';
import Bag from './components/Bag/Bag.tsx';
//import FlightPath from './components/FlightPath/index.js';
import { FlightPath } from './components/FlightPath/FlightPath.tsx';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchDiscs());
  }

  handleGetStartedOnclick = () => {
    const flightPathContainer = document.getElementById('flightPathContainer');
    flightPathContainer.scrollIntoView({ behavior: 'smooth' });
  }

  createBagElement = (id, bottomSheet) => {
    const cssClass = bottomSheet ? 'contentsBottomSheet' : 'contentsNonBottomSheet column is-half-desktop is-two-thirds-widescreen';
    return (
      <div id={id} className={cssClass}>
        <Bag />
        <DiscSelector />
        <DisplayOptions />
      </div>
    );
  }

  render() {
    return (
      <div className="styleApp" id="app">
        <Header handleGetStartedOnClick={this.handleGetStartedOnclick} />
        <div className="columns" style={{marginBottom: 0, marginRight: 0 }}>
          {this.createBagElement('BagContainer', false)}
          <div id="columnRight" className="column">
            <FlightPath />
          </div>
        </div>


        <BottomSheet>
          {this.createBagElement('BagContainer2', true)}
        </BottomSheet>
      </div>
    );
  }
}

export default App;
