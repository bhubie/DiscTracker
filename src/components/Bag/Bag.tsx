import * as React from 'react';
import { useState } from 'react';
import { Card, CardHeader, CardContents } from '../Card/Card';
import IconSettings from '../Icons/IconSettings';
import Modal from '../Modal/Modal';
import { BagSelector } from '../BagSelector/BagSelector';
import { BagSettings } from '../BagSettings/BagSettings';
import { BagContents } from '../BagContents/BagContents';
import { useBagSettingsFacade } from '../../Hooks/useBagSettingsFacade';
import { Button, Color } from '../FormComponents/FormComponents';

const Bag: React.SFC<{}> = ({}) => {

  const [{ columns }, addColumn, removeColumn] = useBagSettingsFacade();
  const [showBagSettingsModal, handleBagSettingsClick] = useState(false);

  const handleVisibleColumnChange = (e: any) => {
    if (e.target.checked) {
      removeColumn(e.target.id);
    } else {
      addColumn(e.target.id);
    }
  };


  const modalButtons = [
    <button
      onClick={() => handleBagSettingsClick(false)}
      className="button"
      key="positiveButton"
    >
      Close
    </button>
  ]
  
  return (
    <div id="selectedBag" className="styleSelectedBag">
      <Card>
      {/*
    // @ts-ignore */}
        <CardHeader className="is-flex flex-space-between">
          Bags
          <Button onClick={() => handleBagSettingsClick(!showBagSettingsModal)} color={Color.Text}>
            <IconSettings id="icon-bag-settings" color="black" />
          </Button>
        </CardHeader>
        <CardContents>
          <BagSelector />
          <BagContents />
        </CardContents>
      </Card>
 
      <Modal
        title="Bag Settings"
        isOpen={showBagSettingsModal}
        onRequestClose={() => handleBagSettingsClick(!showBagSettingsModal)}
        actions={modalButtons}
      >
        <BagSettings columns={columns} handleVisibleColumnChange={handleVisibleColumnChange} />
      </Modal>
    </div>
  );
};

export default Bag;
