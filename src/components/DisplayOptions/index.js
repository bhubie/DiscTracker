import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContents } from '../Card';
import ColorPicker from '../ColorPicker';

const DisplayOptions = ({
  handleUpdateGridColor, handleUpdateGridLineColor, gridColor, gridLineColor, id,
}) => {
  const defaultGridColor = (gridColor !== undefined) ? gridColor : {
    r: '0', g: '0', b: '0', a: '1',
  };

  const defaultGridLineColor = (gridLineColor !== undefined) ? gridLineColor : {
    r: '255', g: '255', b: '255', a: '1',
  };

  return (
    <div id="displayOptions" className="displayOptions">
      <Card>
        <CardHeader
          title="Display Options"
        />
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
        </CardContents>
      </Card>
    </div>
  );
};

DisplayOptions.propTypes = {
  gridColor: PropTypes.objectOf(PropTypes.number).isRequired,
  gridLineColor: PropTypes.objectOf(PropTypes.string).isRequired,
  handleUpdateGridColor: PropTypes.func.isRequired,
  handleUpdateGridLineColor: PropTypes.func.isRequired,
};

export default DisplayOptions;
