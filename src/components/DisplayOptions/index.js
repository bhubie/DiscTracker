import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContents } from '../Card';
import ColorPicker from '../ColorPicker';

const DisplayOptions = ({
  handleUpdateGridColor,
  handleThrowingStyleChange,
  handleUpdateGridLineColor,
  gridColor, gridLineColor, id,
  throwingStyleValues, hand,
}) => {
  const defaultGridColor = (gridColor !== undefined) ? gridColor : {
    r: '0', g: '0', b: '0', a: '1',
  };

  const defaultGridLineColor = (gridLineColor !== undefined) ? gridLineColor : {
    r: '255', g: '255', b: '255', a: '1',
  };


  const options = throwingStyleValues.map((value) => {
    const cssClass = `button ${value.value === hand.value ? 'is-info is-selected' : ''}`;
    return (
      <button
        className={cssClass}
        id={value.value}
        name={value.label}
        onClick={handleThrowingStyleChange}
        key={value.value}
      >
        {value.label}
      </button>
    );
  });

  return (
    <div id="displayOptions" className="displayOptions">
      <Card>
        <CardHeader>
          Display Options
        </CardHeader>
        <CardContents>
          <div id="gridBackgroungColor" className="columns">
            <span className="column is-three-quarters">
              Grid Background Color:
            </span>
            <ColorPicker
              item="gridColor"
              handleColorChange={handleUpdateGridColor}
              selectedColor={defaultGridColor}
              itemID={id}
              className="column"
            />
          </div>
          <div id="gridLineColor" className="columns">
            <span className="column is-three-quarters">
              Grid Line Color:
            </span>
            <ColorPicker
              item="gridLineColor"
              handleColorChange={handleUpdateGridLineColor}
              selectedColor={defaultGridLineColor}
              itemID={id}
              className="column"
            />
          </div>
          <div id="throwingStyle" className="columns">
            <span className="column ">
              Throwing Style:
            </span>
            <div className="buttons has-addons is-centered">
              {options}
            </div>
          </div>
        </CardContents>
      </Card>
    </div>
  );
};

DisplayOptions.propTypes = {
  hand: PropTypes.objectOf(PropTypes.string).isRequired,
  throwingStyleValues: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
  gridColor: PropTypes.objectOf(PropTypes.number).isRequired,
  gridLineColor: PropTypes.objectOf(PropTypes.string).isRequired,
  handleUpdateGridColor: PropTypes.func.isRequired,
  handleUpdateGridLineColor: PropTypes.func.isRequired,
  handleThrowingStyleChange: PropTypes.func.isRequired,
};

export default DisplayOptions;
