import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';


class ColorPicker extends React.PureComponent {

  static getDerivedStateFromProps(props, state) {
    if (props.selectedColor !== state.color && !state.displayColorPicker) {
      return {
        color: props.selectedColor,
      };
    }
    return null;
  }

  state = {
    displayColorPicker: false,
    color: this.props.selectedColor,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });

    if (this.props.handleColorChange !== undefined) {
      this.props.handleColorChange(this.props.itemID, this.state.color);
    }
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
  };

  render() {
    const styles = {
      color: {
        width: '24px',
        height: '24px',
        borderRadius: '2px',
        background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
      },
      swatch: {
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: '-50px',
        marginLeft: '-100px',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    };

    return (
      <div className={this.props.className}>
        <div
          style={styles.swatch}
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
          role="button"
          tabIndex={0}
        >
          <div style={styles.color} />
        </div>
        { this.state.displayColorPicker ?
          <div style={styles.popover}>
            <div
              style={styles.cover}
              onClick={this.handleClose}
              onKeyDown={this.handleClose}
              role="button"
              tabIndex={0}
            />
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div> : null }
      </div>
    );
  }
}

ColorPicker.propTypes = {
  className: PropTypes.string,
  selectedColor: PropTypes.objectOf(PropTypes.number).isRequired,
  handleColorChange: PropTypes.func.isRequired,
  itemID: PropTypes.number.isRequired,
};

ColorPicker.defaultProps = {
  className: ' ',
};

export default ColorPicker;
