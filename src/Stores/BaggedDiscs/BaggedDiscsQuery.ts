import { Query } from '@datorama/akita';
import { IBaggedDiscsStore, BaggedDiscsStore, baggedDiscsStore, IBaggedDisc } from './BaggedDiscsStore';
import { DiscType } from '../Disc/DiscStore';
import { combineLatest, of, from } from 'rxjs';


export class BaggedDiscsQuery extends Query<IBaggedDiscsStore> {

    isLoadindBaggedDiscs$ = this.selectLoading();
    baggedDiscs$ = this.select(state => state.baggedDiscs);
    baggedDrivers$ = this.select(state => state.baggedDiscs.filter(disc => disc.type === 'Distance Driver'));
    baggedFairwayDrivers$ = this.select(state => state.baggedDiscs.filter(disc => disc.type ===  'Fairway Driver'));
    baggedPutters$ = this.select(state => state.baggedDiscs.filter(disc => disc.type === 'Putt & Approach'));
    baggedMidranges$  = this.select(state => state.baggedDiscs.filter(disc => disc.type === 'Mid-Range'));
    selectedBagDiscs$ = this.select(state => state.baggedDiscs.filter(disc => disc.selected === true));

    constructor(protected store: BaggedDiscsStore) {
        super(store);
    }
}

export const baggedDiscsQuery = new BaggedDiscsQuery(baggedDiscsStore);