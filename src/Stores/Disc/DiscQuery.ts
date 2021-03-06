import { Query } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { IDiscState, DiscStore , discStore, IDisc, } from './DiscStore';

export class DiscQuery extends Query<IDiscState> {

    selectedDiscTypes$ = this.select(state => state.ui.discTypesToInclude);
    isFetchingDiscs$ = this.selectLoading();
    isDriversSelected$ = this.select(state => state.ui.discTypesToInclude.includes('Distance Driver'));
    isFairwayDriversSelected$ = this.select(state => state.ui.discTypesToInclude.includes('Fairway Driver'));
    isMidrangeSelected$ = this.select(state => state.ui.discTypesToInclude.includes('Mid-Range'));
    isPuttersSelected$ = this.select(state => state.ui.discTypesToInclude.includes('Putt & Approach'));
    selectDiscs$ = this.select(state => state.discs);
    isAddToBagButtonDisabled$ = this.select(state => state.selectedDiscId === '');
    selectedDiscID$ = this.select(state => state.selectedDiscId);
    selectedDisc$ = combineLatest(
        this.selectedDiscID$,
        this.selectDiscs$,
        this.getSelectedDisc
    )

    selectVisibleDiscs$ = combineLatest(
        this.selectedDiscTypes$,
        this.selectDiscs$,
        this.getVisibleDiscs,
    );

    constructor (protected store: DiscStore) {
        super(store);
    }

    private getVisibleDiscs(indlucdedDiscs: string[], discs: IDisc[]) {
        return discs.filter(disc => indlucdedDiscs.includes(disc.type));
    }

    private getSelectedDisc(id: string, discs: IDisc[]) {
        return discs.find(disc => disc._id === id);
    }
}


export const discQuery = new DiscQuery(discStore);