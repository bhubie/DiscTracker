import React, { Component } from 'react';
import Header from './components/Header';
import { DiscSelector } from './components/DiscSelector/DiscSelector.tsx';
import BottomSheet from './components/BottomSheet';
import DisplayOptionsContainer from './Containers/DisplayOptionsContainer';
import FlightPathContainer from './Containers/FlightPathContainer';
import BagContainer from './Containers/BagContainer';
import { fetchDiscs } from './Actions/DiscActions';

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
        <BagContainer />
        <DiscSelector />
        <DisplayOptionsContainer />
      </div>
    );
  }

  render() {
    return (
      <div className="styleApp" id="app">
        <Header handleGetStartedOnClick={this.handleGetStartedOnclick} />
        <div className="columns" style={{marginBottom: 0, marginRight: 0,}}>
          {this.createBagElement('BagContainer', false)}
          <div id="columnRight" className="column">
            <FlightPathContainer />
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
