import { Query, arrayFind } from '@datorama/akita';
import { IBaggedDiscsStore, BaggedDiscsStore, baggedDiscsStore } from './BaggedDiscsStore';

export class BaggedDiscsQuery extends Query<IBaggedDiscsStore> {

    isLoadindBaggedDiscs$ = this.selectLoading();
    baggedDiscs$ = this.select(state => state.baggedDiscs);
    baggedDrivers$ = this.select(state => state.baggedDiscs).pipe(
        arrayFind(disc => disc.type === 'Distance Driver')
    );
    baggedFairwayDrivers$ = this.select(state => state.baggedDiscs).pipe(
        arrayFind(disc => disc.type === 'Fairway Driver')
    );
    baggedPutters$ = this.select(state => state.baggedDiscs).pipe(
        arrayFind(disc => disc.type === 'Putt & Approach')
    );
    baggedMidranges$  = this.select(state => state.baggedDiscs).pipe(
        arrayFind(disc => disc.type === 'Mid-Range')
    );
    selectedBagDiscs$ = this.select(state => state.baggedDiscs).pipe(
        arrayFind(disc => disc.selected === true)
    );

    constructor(protected store: BaggedDiscsStore) {
        super(store);
    }
}

export const baggedDiscsQuery = new BaggedDiscsQuery(baggedDiscsStore);