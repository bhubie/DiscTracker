import React, { Component } from 'react';
import glamorous from 'glamorous';
import Header from '../Header';
import BagContainer from '../BagContainer';
import DiscSelector from '../DiscSelector';
import ThrowingStyle from '../ThrowingStyle/';
import FlightPath from '../FlightPath';
import DisplayOptions from '../DisplayOptions';
import WelcomeMesage from '../WelcomeMessage';
import BottomSheet from '../BottomSheet';
import { mediaQueries } from '../../Utils/MediaQueries';
import AppTheme from '../../AppTheme';
// import db from '../../db';
// import DisplayOptionsRepository from '../../Repositories/DisplayOptions';

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
      hand: {
        value: 'L',
      },
      gridColor: {
        r: '37',
        g: '37',
        b: '38',
        a: '1',
      },
      gridLineColor: {
        r: '255',
        g: '255',
        b: '255',
        a: '1',
      },
      displayOptionsID: 0,
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

    /*
    loadDisplayOptions = () => {
      const displayRepository = new DisplayOptionsRepository(db);
      displayRepository.getAll()
        .then((results) => {
          if (results.length > 0) {
            this.setState({
              hand: results[0].hand,
              gridColor: results[0].gridColor,
              gridLineColor: results[0].gridLineColor,
              displayOptionsID: results[0].id,
            });
          } else {
            displayRepository.add({
              hand: this.state.hand,
              gridColor: this.state.gridColor,
              gridLineColor: this.state.gridLineColor,
            }).then((id) => {
              this.setState({displayOptionsID: id});
            });
          }
        });
    }

    */

    handleStyleChange = (selectedOptions) => {
      this.setState({ hand: selectedOptions }, () => {
        // const repos = new DisplayOptionsRepository(db);
        // repos.updateHand(this.state.displayOptionsID, selectedOptions);
      });
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

    handleGridColorChange = (grid, color) => {
      this.setState({
        gridColor: color,
      });
    }

    handleGridLineColorChange = (grid, color) => {
      this.setState({
        gridLineColor: color,
      });
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

        <ThrowingStyle
          hand={this.state.hand}
          handleStyleChange={this.handleStyleChange}
        />
        <DisplayOptions
          gridColor={this.state.gridColor}
          gridLineColor={this.state.gridLineColor}
          handleGridBackgroundColorChange={this.handleGridColorChange}
          handleGridLineColorChange={this.handleGridLineColorChange}
        />
      </BagDiv>
    )

    render() {
      return (
        <Div css={styleApp} id="app">
          <Header />
          <WelcomeMesage handleGetStartedOnClick={this.handleGetStartedOnclick} />
          {this.createBagElement('BagContainer', false)}
          <FlightPath
            discs={this.state.currentBag.filter(disc => disc.selected === true)}
            throwingStyle={this.state.hand.value}
            gridColor={this.state.gridColor}
            gridLineColor={this.state.gridLineColor}
          />

          <BottomSheet>
            {this.createBagElement('BagContainer2', true)}
          </BottomSheet>
        </Div>
      );
    }
}


export default AppContentsContainer;

