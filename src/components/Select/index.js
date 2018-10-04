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
  backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='5' viewBox='7 10 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%230' fill-rule='evenodd' opacity='.54' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")",
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

    renderOptions = (options, showLoadingIndicator, loadingMessage, selectValue, selectLabel, id) => {
      let renderedOptions;

      if (options !== undefined) {
        renderedOptions = options.map(option => (<option value={option[selectValue]}>{option[selectLabel]}</option>));
      } else {
        renderedOptions = [];
      }
      // console.log(renderedOptions);

      let placeHolder;
      if (showLoadingIndicator && renderedOptions.length < 1) {
        placeHolder = <option>{loadingMessage}</option>;
      } else if (this.props.showPlaceHolder === true) {
        placeHolder = <option disabled selected value >{this.props.placeHolder}</option>;
      } else {
        placeHolder = undefined;
      }

      return (
        <GlamSelect onChange={this.handleOnChange} css={styleSelect} id={id}>
          {placeHolder}
          {renderedOptions}
        </GlamSelect>
      );
    };

    render() {
      return (
        <Div css={styleSelectArrow}>
          {this.renderOptions(
            this.props.options,
            this.props.showLoadingIndicator,
            this.props.loadingMessage,
            this.props.selectValue,
            this.props.selectLabel,
            this.props.id,
          )}
        </Div>

      );
    }
}

Select.propTypes = {
  showPlaceHolder: PropTypes.bool,
  placeHolder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  showLoadingIndicator: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string,
  selectValue: PropTypes.string.isRequired,
  selectLabel: PropTypes.string.isRequired,
};

Select.defaultProps = {
  loadingMessage: 'Loading...',
};
