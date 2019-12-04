import React from 'react';
import { IBaggedDisc } from '../../../Stores/BaggedDiscs/BaggedDiscsStore';
import classNames from 'classnames';
import Disc from '../Disc';
import { IColor } from '../../../Stores/DisplayOptions/DisplayOptionsStore';

export interface IType {
    name: string
    discs: IBaggedDisc[]
    columns: any[]
    updateDiscEnabled: (id: number, enabled: boolean) => void
    updateDiscColor: (id: number, color: IColor) => void
    updateDiscWear: (id: number, wear: number) => void
    deleteDisc: (id: number) => void
}
export const Type: React.SFC<IType> = (props) => {
    
    const renderRowHeaders = (props.discs.length > 0);

    const tableHeaders = props.columns.map((column) => {
      const cssClass = classNames(
        'styleTableHeader',
        { 'sticky-column': column.name === 'Name' },
        { 'select-cell': column.name === 'Wear' },
      );
  
      return (
        <th className={cssClass} key={column.name}>
          {column.caption}
        </th>
      )
      
    });

    const discElements = props.discs.map(disc => {
        return (
  // @ts-ignore
          <Disc
            key={disc.id}
            name={disc.manufacturer + ' - ' + disc.name }
            selected={disc.selected}
            weight={disc.weight}
            handleDeleteDisc={(e) => props.deleteDisc(e.target.parentElement.parentElement.parentElement.parentElement.id)}
            handleUpdateDiscSelected={(e) => props.updateDiscEnabled(parseInt(e.target.parentElement
              .parentElement.parentElement.id), e.target.checked)}
            discID={disc.id !== undefined ? disc.id : 0}
            handleUpdateDiscColor={props.updateDiscColor}
            discColor={disc.color}
            discWear={disc.wear}
            handleUpdateDiscWear={(e) => props.updateDiscWear(parseInt(e.target.parentElement
              .parentElement.parentElement.id), parseInt(e.target.options[e.target.selectedIndex].value))}
            displayedFields={props.columns}
          />
        )
    })
  
    return (
      <div>
        <div className="mg-bt-10px">{name}</div>
        <div id="tableWrapper" className="styleTableWrapper">
          <table id={name} className="styleTable">
            <thead>
              <tr>
                {renderRowHeaders ? tableHeaders : undefined}
              </tr>
            </thead>
            <tbody id={name} className="styleTableBody">
              {discElements}
            </tbody>
          </table>
        </div>
      </div>
    );
};