import React from 'react';
import PropTypes from 'prop-types';

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

      let placeHolder;
      if (showLoadingIndicator && renderedOptions.length < 1) {
        placeHolder = <option>{loadingMessage}</option>;
      } else if (this.props.showPlaceHolder === true) {
        placeHolder = <option disabled selected value >{this.props.placeHolder}</option>;
      } else {
        placeHolder = undefined;
      }

      return (
        <select onChange={this.handleOnChange} id={id}>
          {placeHolder}
          {renderedOptions}
        </select>
      );
    };

    render() {
      const cssClass = `select is-fullwidth ${this.props.showLoadingIndicator && this.props.options.length < 1 ? 'is-loading ' : ''}`;
      
      return (
        <div className={cssClass}>
          {this.renderOptions(
            this.props.options,
            this.props.showLoadingIndicator,
            this.props.loadingMessage,
            this.props.selectValue,
            this.props.selectLabel,
            this.props.id,
          )}
        </div>

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
