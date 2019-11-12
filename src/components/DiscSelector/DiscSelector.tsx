import * as React from 'react';
import { Card, CardHeader, CardContents } from '../Card/Card';
import { Button, Size, Color } from '../FormComponents/FormComponents';
import Select from '../Select';
import Checkbox from '../Checkbox';
import { useDiscsFacade } from '../../Hooks/useDiscsFacade';

export const DiscSelector: React.SFC<{}> = () => {

    const [{
                discs, 
                isDriversSelected, 
                isFairwayDriversSelected, 
                isMidrangeSelected, 
                isPutterSelected,
                isFetchingDiscs,
                isAddToBagButtonDisabled
            }, 
            setDiscTypeInclusionFilter,
            setSelectedDiscID,
            addDiscToBag
          ] = useDiscsFacade();

    const handleDiscTypeCheck = (event: any) => {
        setDiscTypeInclusionFilter(event.target.name, event.target.checked);
    } 
    return (
        <div id="discSelector" className="discSelectorStyle">
          <Card>
              {/* 
  // @ts-ignore */}
            <CardHeader>
              Available Discs
            </CardHeader>
            
            <CardContents>
              <div id="DiscSelectorContainer" className="columns">
                <div id="dropDownContainer" className="column is-three-quarters is-two-thirds-tablet ">
                  <Select
                    options={discs}
                    onChange={setSelectedDiscID}
                    placeHolder="Tap to Select a Disc"
                    showLoadingIndicator
                    loadingMessage="Loading Discs..."
                    selectLabel="discWithManufacturer"
                    selectValue="_id"
                    showPlaceHolder
                    isLoadingData={isFetchingDiscs}
                    id="disc-selector-dropdown"
                  />
                </div>
                <div className="column ">
                  <Button id="btnAddToBag" isFullWidth onClick={addDiscToBag} disabled={isAddToBagButtonDisabled} size={Size.Normal} color={Color.Primary}>
                    Add to Bag
                  </Button>
                </div>
              </div>
              <div id="filter-container" className="column is-full">
                <h5 className="title is-5">Filters</h5>
                {/* 
  // @ts-ignore */}
                <Checkbox
                  id="includeDriverCheckbox"
                  name="Distance Driver"
                  checked={isDriversSelected}
                  onChange={handleDiscTypeCheck}
                  label="Drivers"
                />
                {/* 
  // @ts-ignore */}
                <Checkbox
                  id="includeFairwayCheckbox"
                  name="Fairway Driver"
                  checked={isFairwayDriversSelected}
                  onChange={handleDiscTypeCheck}
                  label="Fairway Drivers"
                />
                {/* 
  // @ts-ignore */}
                <Checkbox
                  id="includeMidCheckbox"
                  name="Mid-Range"
                  checked={isMidrangeSelected}
                  onChange={handleDiscTypeCheck}
                  label="Mid-Ranges"
                />
                {/* 
  // @ts-ignore */}
                <Checkbox
                  id="includePutCheckbox"
                  name="Putt & Approach"
                  checked={isPutterSelected}
                  onChange={handleDiscTypeCheck}
                  label="Putters"
                />
              </div>
            </CardContents>
          </Card>
        </div>
    );

}
