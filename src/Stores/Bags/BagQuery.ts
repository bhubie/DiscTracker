import { Query } from '@datorama/akita';
import { IBagStore, BagStore, bagStore } from './BagStore';


export class BagQuery extends Query<IBagStore> {

    isLoadingBags$ = this.selectLoading();
    bags$ = this.select(state => state.bags);
    selectedBag$ = this.select(state => state.selectedBag);

    constructor(protected store: BagStore) {
        super(store);
    }

}

export const bagQuery = new BagQuery(bagStore);