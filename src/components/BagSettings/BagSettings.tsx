import * as React from 'react';
import Checkbox from '../Checkbox';
import { useBagSettingsFacade } from '../../Hooks/useBagSettingsFacade';


export interface IBagSettingsProps {
    columns: any[]
    handleVisibleColumnChange: (e: any) => void 
}

export const BagSettings: React.SFC<IBagSettingsProps> = ({columns, handleVisibleColumnChange}) => {
    const columnElements = columns
        .map((column) => {
            const isColumnChecked = column.isHidden === false;

            return (
        // @ts-ignore 
                <Checkbox
                    id={column.name}
                    key={column.name}
                    label={column.name}
                    name={column.caption}
                    checked={isColumnChecked}
                    onChange={handleVisibleColumnChange}
                />
            );
        });


    return (
        <div id="bagSettings">
            <div id="selected-columns-container">
            <div className="title is-5">Visible Columns:</div>
                {columnElements}
            </div>
        </div>
    )
}