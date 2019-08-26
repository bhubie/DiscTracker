import { Query } from '@datorama/akita';
import { IBagSettingsStore, BagSettingsStore, bagSettingsStore } from './BagSettingsStore';


export type column = {
    name: string
    caption: string
    isHidden: boolean
}

export class BagSettingsQuery extends Query<IBagSettingsStore> {

    isLoadingSettings$ = this.selectLoading();

    visibleColumns$ = this.select(state => {
        return state.columns.filter( column =>  {
            //console.log(column, '  = ', state.hiddenColumns.includes(column.name) === false, ' - ', state.hiddenColumns)
            return state.hiddenColumns.includes(column.name) === false
        })
    })

    columnsAbleToHide$ = this.select(state => {
        return state.columns
            .map(column => {
            return {
                isHidden: state.hiddenColumns.includes(column.name),
                ...column
            }
            })
            .filter( column =>  column.name !== 'Name' && column.name !== 'Manufacturer')
    });

    id$ = this.select(state => state.id);

    constructor(protected store: BagSettingsStore) {
        super(store);
    }
}

export const bagSettingsQuery = new BagSettingsQuery(bagSettingsStore);