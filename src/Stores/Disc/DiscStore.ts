import { EntityState, Store, EntityStore, StoreConfig } from '@datorama/akita';

export type DiscType = 'Fairway Driver' | 'Distance Driver' | 'Mid-Range' | 'Putt & Approach';

export interface IDisc {
    _id: string,
    dificulty: string | null,
    manufacturer: string,
    name: string,
    discWithManufacturer: string,
    type: DiscType,
    distance: number,
    hst: number,
    lsf: number,
    net: number,
}


export const DEFAULT_DISC_TYPES_TO_INCLUDE: DiscType[] = [
    'Distance Driver',
    'Fairway Driver',
    'Mid-Range',
    'Putt & Approach'
];

export interface IDiscState {
    discs: IDisc[]
    selectedDiscId: string
    ui: {
        discTypesToInclude: DiscType[]
    }
}

export function createInitialDiscState(): IDiscState {
    return {
        discs: [],
        selectedDiscId: '',
        ui: {
            discTypesToInclude: DEFAULT_DISC_TYPES_TO_INCLUDE
        }
    };
}

@StoreConfig({ name: 'discs' })
export class DiscStore extends Store<IDiscState> {
    constructor() {
        super(createInitialDiscState());
    }
}

export const discStore = new DiscStore();
