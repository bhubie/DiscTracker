import React from 'react';
import BagContentsContainer from '../../Containers/BagContentsContainer';
import BagSelectorContainer from '../../Containers/BagSelectorContainer';
import { Card, CardHeader, CardContents } from '../Card';

const Bag = () => (
  <div id="selectedBag" className="styleSelectedBag">
    <Card>
      <CardHeader
        title="Bags"
      />
      <CardContents>
        <BagSelectorContainer />
        <BagContentsContainer />
      </CardContents>
    </Card>
  </div>
);

export default Bag;
