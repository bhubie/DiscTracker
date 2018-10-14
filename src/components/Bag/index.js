import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';
import BagContentsContainer from '../../Containers/BagContentsContainer';
import BagSelectorContainer from '../../Containers/BagSelectorContainer';

const Bag = () => (
  <div id="selectedBag" className="styleSelectedBag">
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
  </div>
);

export default Bag;
