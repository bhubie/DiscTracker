import React from 'react';
import BagContentsContainer from '../../Containers/BagContentsContainer';
import BagSelectorContainer from '../../Containers/BagSelectorContainer';
import { Card, CardHeader, CardContents } from '../Card/Card';
import IconSettings from '../Icons/IconSettings';
import Modal from '../Modal';
import BagSettingsContainer from '../../Containers/BagSettingsContainer';

const Bag = ({ showModal, handleBagSettingsClick }) => {
  const modalButtons = (
    <button
      onClick={handleBagSettingsClick}
      className="button"
      key="positiveButton"
    >
      Close
    </button>
  );

  return (
    <div id="selectedBag" className="styleSelectedBag">
      <Card>
        <CardHeader className="is-flex flex-space-between">
          Bags
          <div onClick={handleBagSettingsClick}>
            <IconSettings id="icon-bag-settings" color="black" />
          </div>
        </CardHeader>
        <CardContents>
          <BagSelectorContainer />
          <BagContentsContainer />
        </CardContents>
      </Card>
      <Modal
        title="Bag Settings"
        modal={false}
        open={showModal}
        onRequestClose={handleBagSettingsClick}
        actions={modalButtons}
      >
        <BagSettingsContainer />
      </Modal>
    </div>
  );
};

export default Bag;
