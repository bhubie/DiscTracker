import { BagSettingsStore, bagSettingsStore, IBagSettingsStore } from "./BagSettingsStore";
import { IBagSettingsRepository } from "../../Repositories/BagSettings/BagSettingsRepository";
import { bagSettingsRepository } from "../../Repositories/BagSettings/BagSettingsRepository";
import { from } from "rxjs";


export class BagSettingsService {

    constructor(private bagSettingsStore: BagSettingsStore, private bagSettingsRepository: IBagSettingsRepository) {

    }

    fetchBagSettings() {

        console.log('fetch bag settigns called')
        this.bagSettingsStore.setLoading(true);

        from(this.bagSettingsRepository.getAll())
            .subscribe(bagSettings => {
                console.log(bagSettings[0].hiddenColumns)
                this.bagSettingsStore.update((state: IBagSettingsStore) => ({
                    id: bagSettings[0].id,
                    hiddenColumns: bagSettings[0].hiddenColumns
                }));
                this.bagSettingsStore.setLoading(false);
            })
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