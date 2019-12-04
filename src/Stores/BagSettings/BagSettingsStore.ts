import { Store, StoreConfig } from '@datorama/akita';

export interface IBagSettingsStore {
    id?: number
    hiddenColumns: string[]
    columns: {name: string, caption: string}[]
}

@StoreConfig({ name: 'bagSettings' })
export class BagSettingsStore extends Store<IBagSettingsStore> {
    constructor() {
        super({
            hiddenColumns: [],
            columns: [
                { name: 'Name', caption: 'Name' },
                { name: 'Disc Color', caption: 'Disc Color' },
                { name: 'Wear', caption: 'Wear' },
                { name: 'Enabled', caption: 'Enabled' },
                { name: 'Remove', caption: 'Remove' },
            ]
        });
    }
}

export const bagSettingsStore = new BagSettingsStore();

