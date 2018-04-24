
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Div } from 'glamorous';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import AppTheme from '../../AppTheme';
import { isScrolledIntoView } from '../../Utils/Utils';
import { mediaQueries } from '../../Utils/MediaQueries';

const styleBottomSheetWrapper = {
  display: 'none',
};


const styleBottomSheet = {
  height: '54px',
  background: AppTheme.palette.accent1Color,
  color: '#FFFFFF',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

class BottomSheet extends Component {
    state = {
      opened: false,
      rotatation: 0,
    }

    componentDidMount() {
      const mobileMaxPixels = mediaQueries.maxWidth750.maxPixels;
      window.addEventListener('scroll', () => {
        if (isScrolledIntoView(document.getElementById('flightPath'))
                  && window.innerWidth <= mobileMaxPixels
                  && document.getElementById('BottomSheetWrapper').style.display !== 'inline') {
          document.getElementById('BottomSheetWrapper').style.display = 'inline';
        } else if (!isScrolledIntoView(document.getElementById('flightPath'))
                && window.innerWidth <= mobileMaxPixels
                && document.getElementById('BottomSheetWrapper').style.display === 'inline') {
          document.getElementById('BottomSheetWrapper').style.display = 'none';
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth >= mobileMaxPixels && document.getElementById('BottomSheetWrapper').style.display !== 'none') {
          document.getElementById('BottomSheetWrapper').style.display = 'none';
          document.body.style.overflowY = 'auto';
        }
      });
    }

    onChange = (isOpen) => {
      this.setState(prevState => ({
        opened: isOpen,
        rotatation: 180 + prevState.rotatation,
      }));

      //  set overflow on body to be hidden so it doesnt scroll when scrolling bottom sheet
      if (isOpen) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
    }

    render() {
      const bottomSheetMessage = this.state.opened ? 'Swipe Down to Close' : 'Swipe Up For Options';

      const styleArrow = {
        color: 'white',
        transform: `rotate(${this.state.rotatation}deg)`,
      };

      return (
        <Div id="BottomSheetWrapper" css={styleBottomSheetWrapper}>
          <SwipeableBottomSheet
            overflowHeight={54}
            marginTop={128}
            onChange={this.onChange}
          >
            <Div css={styleBottomSheet}>
              <KeyboardArrowUp style={styleArrow} id="arrow" />
              <span style={{ animation: 'fadein' }}>{bottomSheetMessage}</span>
              <KeyboardArrowUp style={styleArrow} id="arrow" />
            </Div>
            {this.props.children}
          </SwipeableBottomSheet>
        </Div>
      );
    }
}

BottomSheet.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BottomSheet;

