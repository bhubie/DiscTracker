import React from 'react';
import { Div } from 'glamorous';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';
import BagContentsContainer from '../../Containers/BagContentsContainer';
import BagSelectorContainer from '../../Containers/BagSelectorContainer';

const styleSelectedBag = {
  width: '100%',
  gridColumn: '1 / span 2',
  gridRow: 1,
  marginTop: '10px',
};

const Bag = () => (
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
        <BagContentsContainer />
      </CardText>
    </Card>
  </Div>
);

export default Bag;
