import { Query } from '@datorama/akita';
import { IDisplayOptionsStore, DisplayOptionsStore, displayOptionsStore } from './DisplayOptionsStore';

export class DisplayOptionsQuery extends Query<IDisplayOptionsStore> {

    isRightHandSelected$ = this.select(state => state.throwingStyle.value === 'R');
    isLeftHandSelected$ = this.select(state => state.throwingStyle.value === 'L');
    gridColor$ = this.select(state => state.gridColor);
    gridLineColor$ = this.select(state => state.gridLineColor);
    throwingStyle$ = this.select(state => state.throwingStyle);


    constructor(protected store: DisplayOptionsStore) {
        super(store);
    }
}

export const displayOptionsQuery = new DisplayOptionsQuery(displayOptionsStore);