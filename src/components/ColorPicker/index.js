import React from 'react';
import PropTypes from 'prop-types';
import { Div } from 'glamorous';
import { SketchPicker } from 'react-color';


class ColorPicker extends React.Component {
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
      this.props.handleColorChange(this.props.item, this.state.color);
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
      <Div>
        <Div
          css={styles.swatch}
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
          role="button"
          tabIndex={0}
        >
          <Div css={styles.color} />
        </Div>
        { this.state.displayColorPicker ?
          <Div css={styles.popover}>
            <Div
              css={styles.cover}
              onClick={this.handleClose}
              onKeyDown={this.handleClose}
              role="button"
              tabIndex={0}
            />
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </Div> : null }
      </Div>
    );
  }
}

ColorPicker.propTypes = {
  selectedColor: PropTypes.objectOf(PropTypes.string).isRequired,
  handleColorChange: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
};

export default ColorPicker;
