import { Store, StoreConfig } from '@datorama/akita';


export interface IBag {
    id: number
    name: string
}
export interface IBagStore {
    bags: IBag[]
    selectedBag?: IBag
}

export function createIntialBagStoreState(): IBagStore {
    return {
        bags: [],
        selectedBag: undefined
    };
}

@StoreConfig({ name: 'bags' })
export class BagStore extends Store<IBagStore> {
    constructor() {
        super(createIntialBagStoreState());
    }
}

export const bagStore = new BagStore();