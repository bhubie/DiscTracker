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
  handleUpdateGridColor, handleUpdateGridLineColor, gridColor, gridLineColor, id,
}) => {
  // console.log('passed in grid color is');
  
  const defaultGridColor = (gridColor !== undefined) ? gridColor : {
    r: '0', g: '0', b: '0', a: '1',
  };

  // console.log(defaultGridColor);

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
              handleColorChange={handleUpdateGridColor}
              selectedColor={defaultGridColor}
              itemID={id}
            />
          </Div>
          <Div id="gridLineColor" css={colorOptionStyle} >
            <Span css={colorLabelStyle}>
                            Grid Line Color:
            </Span>
            <ColorPicker
              item="gridLineColor"
              handleColorChange={handleUpdateGridLineColor}
              selectedColor={defaultGridLineColor}
              itemID={id}
            />
          </Div>
        </CardText>
      </Card>
    </Div>
  );
};

DisplayOptions.propTypes = {
  gridColor: PropTypes.objectOf(PropTypes.number).isRequired,
  gridLineColor: PropTypes.objectOf(PropTypes.string).isRequired,
  handleUpdateGridColor: PropTypes.func.isRequired,
  handleUpdateGridLineColor: PropTypes.func.isRequired,
};

export default DisplayOptions;
