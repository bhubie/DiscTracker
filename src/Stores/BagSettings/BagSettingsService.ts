import { BagSettingsStore, bagSettingsStore, IBagSettingsStore, DEFAULT_BAG_SETTINGS } from "./BagSettingsStore";
import { IBagSettingsRepository } from "../../Repositories/BagSettings/BagSettingsRepository";
import { bagSettingsRepository } from "../../Repositories/BagSettings/BagSettingsRepository";
import { from } from "rxjs";


export class BagSettingsService {

    constructor(private bagSettingsStore: BagSettingsStore, private bagSettingsRepository: IBagSettingsRepository) {

    }
    
    async fetchBagSettings() {
        this.bagSettingsStore.setLoading(true);

        try {
            const settings = await this.bagSettingsRepository.getAll();

            if(settings.length > 0) {
                this.bagSettingsStore.update((state: IBagSettingsStore) => ({
                    id: settings[0].id,
                    hiddenColumns: settings[0].hiddenColumns
                }));
            } else {
                const s = await this.bagSettingsRepository.add(DEFAULT_BAG_SETTINGS);
                this.bagSettingsStore.update((state: IBagSettingsStore) => ({
                    id: s.id,
                    hiddenColumns: s.hiddenColumns
                }));
            }
        }
        catch(error) {

        }
        finally {
            this.bagSettingsStore.setLoading(false);
        }
        
            
    }

    addHiddinColumn(id: number, column: string) {
        try {
            this.bagSettingsRepository.addHiddenColumn(id, column);

            this.bagSettingsStore.update((state: IBagSettingsStore) => ({
                hiddenColumns: [...state.hiddenColumns, column],
            }));

        }
        catch(error) {
            this.bagSettingsStore.setError(error);
        }
    }

    removeHiddenColumn(id: number, column: string) {
        try {
            this.bagSettingsRepository.deleteHiddenColumn(id, column);

            this.bagSettingsStore.update((state: IBagSettingsStore) => ({
                hiddenColumns: state.hiddenColumns.filter(c => c !== column)
            }));

        }
        catch(error) {
            this.bagSettingsStore.setError(error);
        }
    }


}

export const bagSettingsService = new BagSettingsService(bagSettingsStore, bagSettingsRepository)