import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from './components/Header';
import { DiscSelector } from './components/DiscSelector/DiscSelector.tsx';
import BottomSheet from './components/BottomSheet';
import { DisplayOptions } from './components/DisplayOptions/DisplayOptions.tsx';
import Bag from './components/Bag/Bag.tsx';
import { FlightPath } from './components/FlightPath/FlightPath.tsx';

const App = () => {
  function handleGetStartedOnclick() {
    const flightPathContainer = document.getElementById('flightPathContainer');
    flightPathContainer.scrollIntoView({ behavior: 'smooth' });
  }

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="styleApp" id="app">
      <Header handleGetStartedOnClick={handleGetStartedOnclick} />
      <div className="columns" style={{ marginBottom: 0, marginRight: 0 }}>
        {!isMobile ?
          <div id="BagContainer" className="contentsNonBottomSheet column is-half-desktop is-two-thirds-widescreen">
            <Bag />
            <DiscSelector />
            <DisplayOptions />
          </div>
        : undefined
        }
        <div id="columnRight" className="column">
          <FlightPath />
        </div>
      </div>

      {isMobile ?
        <BottomSheet>
          <div id="BagContainer" className="contentsBottomSheet">
            <Bag />
            <DiscSelector />
            <DisplayOptions />
          </div>
        </BottomSheet>
        : undefined
      }
    </div>
  );
};

export default App;
