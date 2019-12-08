import { Store, StoreConfig } from '@datorama/akita';

export interface IBagSettingsStore {
    id?: number
    hiddenColumns: string[]
    columns: {name: string, caption: string}[]
}

export const DEFAULT_BAG_SETTINGS = {
    hiddenColumns: [],
    columns: [
        { name: 'Name', caption: 'Name' },
        { name: 'Disc Color', caption: 'Disc Color' },
        { name: 'Wear', caption: 'Wear' },
        { name: 'Enabled', caption: 'Enabled' },
        { name: 'Remove', caption: 'Remove' },
    ]
};

@StoreConfig({ name: 'bagSettings' })
export class BagSettingsStore extends Store<IBagSettingsStore> {
    constructor() {
        super(DEFAULT_BAG_SETTINGS);
    }
}

export const bagSettingsStore = new BagSettingsStore();

