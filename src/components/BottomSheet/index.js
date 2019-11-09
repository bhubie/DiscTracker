import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import IconArrowUp from '../Icons/IconArrowUp';
import { isScrolledIntoView } from '../../Utils/Utils.ts';

class BottomSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      rotatation: 0,
      isVisible: false,
    };
  }

  componentDidMount() {

    window.addEventListener('scroll', () => {
      if (isScrolledIntoView(document.getElementById('flightPath'))) {
        this.setState({
          isVisible: true,
        });
      } else {
        this.setState({
          isVisible: false,
        });
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

      const bottomSheetStyle = this.state.isVisible ? { display: 'inline' } : { display: 'none' };

      return (
        <div id="BottomSheetWrapper" className="BottomSheetWrapper" style={bottomSheetStyle}>
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

