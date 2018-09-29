import React, { Component } from 'react';
import glamorous from 'glamorous';
import Header from '../Header';
import BagContainer from '../BagContainer';
import DiscSelector from '../DiscSelector';
import WelcomeMesage from '../WelcomeMessage';
import BottomSheet from '../BottomSheet';
import { mediaQueries } from '../../Utils/MediaQueries';
import AppTheme from '../../AppTheme';
import DisplayOptionsContainer from '../../Containers/DisplayOptionsContainer';
import FlightPathContainer from '../../Containers/FlightPathContainer';
import ThrowingStyleContainer from '../../Containers/ThrowingStyleContainer';

const { Div } = glamorous;
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

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

class AppContentsContainer extends Component {
    state = {
      currentBag: [],
      discs: [],
    }

    componentDidMount() {
      fetch(apiUrl, { mode: 'cors' })
        .then(res => res.json())
        .then((j) => {
          this.setState({ discs: j }, () => {
          });
        });

      // this.loadDisplayOptions();
    }

    handleAddToBag = (disc) => {
      this.setState(prevState => ({
        currentBag: prevState.currentBag.concat([disc]),
      }));
    }

    handleRemoveDisc = (discID) => {
      this.setState(prevState => ({
        currentBag: prevState.currentBag.filter(_ => _.discID !== discID),
      }));
    }

    handleSelectedStateChange = (discID, value) => {
      let index;

      this.state.currentBag.forEach((disc, i) => {
        if (disc.discID === discID) {
          index = i;
        }
      });

      this.state.currentBag[index].selected = value;
      this.forceUpdate();
    }

    handleDiscColorChange = (discID, value) => {
      let index;

      this.state.currentBag.forEach((disc, i) => {
        if (disc.discID == discID) {
          index = i;
        }
      });

      this.state.currentBag[index].color = value;
      this.forceUpdate();
    }

    handleGetStartedOnclick = () => {
      const flightPathContainer = document.getElementById('flightPathContainer');
      flightPathContainer.scrollIntoView({ behavior: 'smooth' });
    }

    createBagElement = (id, bottomSheet) => (
      <BagDiv id={id} bottomSheet={bottomSheet}>
        <BagContainer
          name="My Bag"
          discs={this.state.currentBag}
          handleRemoveDisc={this.handleRemoveDisc}
          handleSelectedStateChange={this.handleSelectedStateChange}
          handleDiscColorChange={this.handleDiscColorChange}
        />
        <DiscSelector
          discs={this.state.discs}
          handleAddToBag={this.handleAddToBag}
        />
        <ThrowingStyleContainer />
        <DisplayOptionsContainer />
      </BagDiv>
    )

    render() {
      return (
        <Div css={styleApp} id="app">
          <Header />
          <WelcomeMesage handleGetStartedOnClick={this.handleGetStartedOnclick} />
          {this.createBagElement('BagContainer', false)}
          <FlightPathContainer />

          <BottomSheet>
            {this.createBagElement('BagContainer2', true)}
          </BottomSheet>
        </Div>
      );
    }
}

export default AppContentsContainer;
