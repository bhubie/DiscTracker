import { Store, StoreConfig } from '@datorama/akita';
import { DiscType, IDisc } from "../Disc/DiscStore";
import { IColor } from "../DisplayOptions/DisplayOptionsStore";

export interface IPathCoordinates {
    coordinates: {x: number, y: number}[]
}

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
    discInformation: IDisc | null
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
