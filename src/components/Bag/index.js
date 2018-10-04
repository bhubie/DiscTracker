import React from 'react';
import PropTypes from 'prop-types';
import { Div } from 'glamorous';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';
import BagContents from '../BagContents';
import BagSelectorContainer from '../../Containers/BagSelectorContainer';

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


const Bag = ({
  discs, handleRemoveDisc, handleSelectedStateChange, handleDiscColorChange,
}) => (
  <Div id="selectedBag" css={styleSelectedBag}>
    <Card style={CardStyle} initiallyExpanded>
      <CardHeader
        style={HeaderCardStyle}
        title="Bags"
        actAsExpander
        showExpandableButton
      />
      <CardText expandable>
        <BagSelectorContainer />
        <BagContents
          discs={discs}
          handleRemoveDisc={handleRemoveDisc}
          handleSelectedStateChange={handleSelectedStateChange}
          handleDiscColorChange={handleDiscColorChange}
        />
      </CardText>
    </Card>
  </Div>
);

Bag.propTypes = {
  name: PropTypes.string.isRequired,
  discs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemoveDisc: PropTypes.func.isRequired,
  handleSelectedStateChange: PropTypes.func.isRequired,
  handleDiscColorChange: PropTypes.func.isRequired,
};

export default Bag;
