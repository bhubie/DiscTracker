import React from 'react';
import PropTypes from 'prop-types';
import { Div } from 'glamorous';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';
import BagSelector from '../BagSelector';
import Bag from '../Bag';

const styleSelectedBag = {
  width: '100%',
  gridColumn: '1 / span 2',
  gridRow: 1,
  marginTop: '10px',
};

const styleTableWrapper = {
  display: 'block',
  overflowX: 'auto',
};


const BagContainer = ({
  discs, handleRemoveDisc, handleSelectedStateChange, handleDiscColorChange,
}) => {
  return (
    <Div id="selectedBag" css={styleSelectedBag}>
      <Card style={CardStyle} initiallyExpanded>
        <CardHeader
          style={HeaderCardStyle}
          title="Bags"
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <BagSelector values={['test']} />
          <Bag
            discs={discs}
            handleRemoveDisc={handleRemoveDisc}
            handleSelectedStateChange={handleSelectedStateChange}
            handleDiscColorChange={handleDiscColorChange}
          />
        </CardText>
      </Card>
    </Div>
  );
};

BagContainer.propTypes = {
  name: PropTypes.string.isRequired,
  discs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemoveDisc: PropTypes.func.isRequired,
  handleSelectedStateChange: PropTypes.func.isRequired,
  handleDiscColorChange: PropTypes.func.isRequired,
};

export default BagContainer;
