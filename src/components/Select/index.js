import React from 'react';
import PropTypes from 'prop-types';
import { Select as GlamSelect, Div } from 'glamorous';


const styleSelect = {
  backgroundColor: 'transparent',
  width: '100%',
  padding: '4px 0',
  fontSize: '16px',
  color: 'rgba(0,0,0,.42)',
  border: 'none',
  borderBottom: '1px solid rgba(0,0,0,.42)',
  appearance: 'none',
  ':focus': {
    outline: 'none',
  },
};

const styleSelectArrow = {
  width: '100%',
  position: 'relative',
  backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='5' viewBox='7 10 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%230' fill-rule='evenodd' opacity='.54' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\");",
  display: 'inline-flex',
  boxSizing: 'border-box',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px bottom 12px',
  overflow: 'hidden',
};

export default class Select extends React.Component {
    handleOnChange = (e) => {
      this.props.onChange(e.target.options[e.target.selectedIndex].value);
    }

    renderOptions = (options) => {
      const renderedOptions = options.map(option => (<option value={option.value}>{option.label}</option>));

      return (
        <GlamSelect onChange={this.handleOnChange} css={styleSelect}>
          <option disabled selected value >{this.props.placeHolder}</option>
          {renderedOptions}
        </GlamSelect>
      );
    };

    render() {
      return (
        <Div css={styleSelectArrow}>
          {this.renderOptions(this.props.options)}
        </Div>

      );
    }
}

Select.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
