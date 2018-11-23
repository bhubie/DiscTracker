import React, { Component } from 'react';
import Header from './components/Header';
import DiscSelectorContainer from './Containers/DiscSelectorContainer';
import BottomSheet from './components/BottomSheet';
import DisplayOptionsContainer from './Containers/DisplayOptionsContainer';
import FlightPathContainer from './Containers/FlightPathContainer';
import ThrowingStyleContainer from './Containers/ThrowingStyleContainer';
import Bag from './components//Bag';
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
    const cssClass = bottomSheet ? 'contentsBottomSheet' : 'contentsNonBottomSheet';
    return (
      <div id={id} className={cssClass}>
        <Bag />
        <DiscSelectorContainer />
        <ThrowingStyleContainer />
        <DisplayOptionsContainer />
      </div>
    );
  }

  render() {
    return (
      <div className="styleApp" id="app">
        <Header handleGetStartedOnClick={this.handleGetStartedOnclick} />
        {this.createBagElement('BagContainer', false)}
        <FlightPathContainer />

        <BottomSheet>
          {this.createBagElement('BagContainer2', true)}
        </BottomSheet>
      </div>
    );
  }
}

export default App;
