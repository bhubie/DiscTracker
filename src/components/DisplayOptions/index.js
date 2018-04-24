import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Div, Span } from 'glamorous';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';
import ColorPicker from '../ColorPicker';


const style = {
  marginTop: '10px',
  gridColumn: '2 / span 1',
  gridRow: 3,
};

const colorOptionStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const colorLabelStyle = {
  marginRight: '10px',
};

const DisplayOptions = ({
  handleGridBackgroundColorChange, handleGridLineColorChange, gridColor, gridLineColor,
}) => {
  const defaultGridColor = (gridColor !== undefined) ? gridColor : {
    r: '0', g: '0', b: '0', a: '1',
  };
  const defaultGridLineColor = (gridLineColor !== undefined) ? gridLineColor : {
    r: '255', g: '255', b: '255', a: '1',
  };

  return (
    <Div id="displayOptions" css={style}>
      <Card style={CardStyle} initiallyExpanded>
        <CardHeader
          style={HeaderCardStyle}
          title="Display Options"
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <Div id="gridBackgroungColor" css={colorOptionStyle} >
            <Span css={colorLabelStyle}>
                Grid Background Color:
            </Span>
            <ColorPicker
              item="gridColor"
              handleColorChange={handleGridBackgroundColorChange}
              selectedColor={defaultGridColor}
            />
          </Div>
          <Div id="gridLineColor" css={colorOptionStyle} >
            <Span css={colorLabelStyle}>
                            Grid Line Color:
            </Span>
            <ColorPicker
              item="gridLineColor"
              handleColorChange={handleGridLineColorChange}
              selectedColor={defaultGridLineColor}
            />
          </Div>
        </CardText>
      </Card>
    </Div>
  );
};

DisplayOptions.propTypes = {
  gridColor: PropTypes.objectOf(PropTypes.string).isRequired,
  gridLineColor: PropTypes.objectOf(PropTypes.string).isRequired,
  handleGridBackgroundColorChange: PropTypes.func.isRequired,
  handleGridLineColorChange: PropTypes.func.isRequired,
};

export default DisplayOptions;
