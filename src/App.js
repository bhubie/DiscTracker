import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import React, { Component } from 'react';
import glamorous from 'glamorous';
import Header from './components/Header';
import DiscSelectorContainer from './Containers/DiscSelectorContainer';
import WelcomeMesage from './components/WelcomeMessage';
import BottomSheet from './components/BottomSheet';
import { mediaQueries } from './Utils/MediaQueries';
import AppTheme from './AppTheme';
import DisplayOptionsContainer from './Containers/DisplayOptionsContainer';
import FlightPathContainer from './Containers/FlightPathContainer';
import ThrowingStyleContainer from './Containers/ThrowingStyleContainer';
import Bag from './components//Bag';
import { fetchDiscs } from './Actions/DiscActions';


const { Div } = glamorous;

const styleApp = {
  background: AppTheme.palette.primary1Color,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridColumnGap: '10px',
  gridTemplateAreas:
    `"header           header"
    "welcomemessage   welcomemessage"
    "bagcontainer     flightpath"
    "bagcontainer     flightpath"`,
  maxWidth: '100%',
  [mediaQueries.maxWidth750.value]: {
    display: 'block',
  },
};

const bagFactory = glamorous('div', { withProps: { bottomSheet: false } });
const BagDiv = bagFactory(({ bottomSheet }) => ({
  gridArea: 'bagcontainer',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  marginLeft: '24px',
  gridColumnGap: '15px',
  [mediaQueries.maxWidth750.value]: {
    display: bottomSheet ? 'inline' : 'none',
  },
}));

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchDiscs());
  }

    handleGetStartedOnclick = () => {
      const flightPathContainer = document.getElementById('flightPathContainer');
      flightPathContainer.scrollIntoView({ behavior: 'smooth' });
    }

    createBagElement = (id, bottomSheet) => (
      <BagDiv id={id} bottomSheet={bottomSheet}>
        <Bag />
        <DiscSelectorContainer />
        <ThrowingStyleContainer />
        <DisplayOptionsContainer />
      </BagDiv>
    )

    render() {
      return (
        <MuiThemeProvider muiTheme={AppTheme}>
          <Div css={styleApp} id="app">
            <Header />
            <WelcomeMesage handleGetStartedOnClick={this.handleGetStartedOnclick} />
            {this.createBagElement('BagContainer', false)}
            <FlightPathContainer />

            <BottomSheet>
              {this.createBagElement('BagContainer2', true)}
            </BottomSheet>
          </Div>
        </MuiThemeProvider>
      );
    }
}

export default App;
