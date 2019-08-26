import { Store, StoreConfig } from '@datorama/akita';
import { DiscType } from "../Disc/DiscStore";
import { IColor } from "../DisplayOptions/DisplayOptionsStore";


export interface IBaggedDisc {
    id?: number
    discID: string
    bagID: number
    name: string
    manufacturer: string
    difficulty: string | null
    type: DiscType
    selected: boolean
    color: IColor
    weight: number
    wear: number
}

export interface IBaggedDiscsStore {
    baggedDiscs: IBaggedDisc[]
}

@StoreConfig({ name: 'baggedDiscs' })
export class BaggedDiscsStore extends Store<IBaggedDiscsStore> {
    constructor() {
        super({baggedDiscs: []});
    }
}

export const baggedDiscsStore = new BaggedDiscsStore();
