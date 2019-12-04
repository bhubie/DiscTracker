import * as React from 'react';
import { Card, CardHeader, CardContents } from '../Card/Card';
import ColorPicker from '../ColorPicker';
import { useDisplayOptionsFacade } from '../../Hooks/useDisplayOptionsFacade';
import classNames from 'classnames';

export const DisplayOptions: React.SFC<{}> = () => {
    
    const [{
        isLeftHandSelected,
        isRightHandSelected,
        gridColor,
        gridLineColor,
    }, 
    updateThrowingStyle, 
    updateGridColor,
    updateGridLineColor
    ] = useDisplayOptionsFacade();
  
    return (
        <div id="displayOptions" className="displayOptions">
          <Card>
    {/* 
  // @ts-ignore */}
            <CardHeader>
              Display Options
            </CardHeader>
            <CardContents>
              <div id="gridBackgroungColor" className="columns">
                <span className="column is-three-quarters">
                  Grid Background Color:
                </span>
                <ColorPicker
                  item="gridColor"
                  handleColorChange={updateGridColor}
                  selectedColor={gridColor}
                  itemID={undefined}
                  className="column"
                />
              </div>
              <div id="gridLineColor" className="columns">
                <span className="column is-three-quarters">
                  Grid Line Color:
                </span>
                <ColorPicker
                  item="gridLineColor"
                  handleColorChange={updateGridLineColor}
                  selectedColor={gridLineColor}
                  itemID={undefined}
                  className="column"
                />
              </div>
              <div id="throwingStyle" className="columns">
                <span className="column ">
                  Throwing Style:
                </span>
                <div className="buttons has-addons is-centered">
                    <button
                        className={classNames('button', {'is-info is-selected': isLeftHandSelected})}
                        id="L"
                        name="LHBH/RHFH"
                        onClick={() => updateThrowingStyle('L')}
                        key="L"
                        data-testid="button-left"
                    >
                        LHBH/RHFH
                    </button>
                    <button
                        className={classNames('button', {'is-info is-selected': isRightHandSelected})}
                        id="R"
                        name="RHBH/LHFH"
                        onClick={() => updateThrowingStyle('R')}
                        key="R"
                        data-testid="button-right"
                    >
                        RHBH/LHFH
                    </button>
                </div>
              </div>
            </CardContents>
          </Card>
        </div>
      );
}