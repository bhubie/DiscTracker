import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import IconArrowUp from '../Icons/IconArrowUp';
import { isScrolledIntoView } from '../../Utils/Utils';
import { mediaQueries } from '../../Utils/MediaQueries';

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
        fill: 'currentColor',
        transform: `rotate(${this.state.rotatation}deg)`,
        height: '24px',
        width: '24px',
      };

      return (
        <div id="BottomSheetWrapper" className="BottomSheetWrapper">
          <SwipeableBottomSheet
            overflowHeight={54}
            marginTop={128}
            onChange={this.onChange}
          >
            <div className="BottomSheet">
              <IconArrowUp style={styleArrow} id="arrow" />
              <span style={{ animation: 'fadein' }}>{bottomSheetMessage}</span>
              <IconArrowUp style={styleArrow} id="arrow" />
            </div>
            {this.props.children}
          </SwipeableBottomSheet>
        </div>
      );
    }
}

BottomSheet.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BottomSheet;

