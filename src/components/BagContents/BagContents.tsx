import * as React from 'react';
import { Type } from './Type/Type';
import { useBaggedDiscsFacade } from '../../Hooks/useBaggedDiscsFacade';


export const BagContents: React.SFC<{}> = () => {

    const [{ 
            baggedDrivers, 
            baggedFairwayDrivers, 
            baggedMidranges, 
            baggedPutters,
            columns
        }, updateDiscEnabled, updateDiscColor, updateDiscWear, deleteDisc] = useBaggedDiscsFacade();

    return (
        <div id="tableWrapper">
            <Type name="Drivers" 
                discs={baggedDrivers}
                columns={columns}
                updateDiscEnabled={updateDiscEnabled}
                updateDiscColor={updateDiscColor}
                updateDiscWear={updateDiscWear}
                deleteDisc={deleteDisc}
            />
            <Type name="Fairway Drivers" 
                discs={baggedFairwayDrivers}
                columns={columns}  
                updateDiscEnabled={updateDiscEnabled}
                updateDiscColor={updateDiscColor}
                updateDiscWear={updateDiscWear}
                deleteDisc={deleteDisc}
            />
            <Type name="Midranges" 
                discs={baggedMidranges}
                columns={columns}  
                updateDiscEnabled={updateDiscEnabled}
                updateDiscColor={updateDiscColor}
                updateDiscWear={updateDiscWear}
                deleteDisc={deleteDisc}
            />
            <Type name="Putters" 
                discs={baggedPutters}
                columns={columns}  
                updateDiscEnabled={updateDiscEnabled}
                updateDiscColor={updateDiscColor}
                updateDiscWear={updateDiscWear}
                deleteDisc={deleteDisc}
            />
        </div>
    )
}