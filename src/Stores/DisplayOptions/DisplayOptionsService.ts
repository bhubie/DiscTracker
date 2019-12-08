import { IDisplayOptionsStore, displayOptionsStore, DisplayOptionsStore, IColor, ThrowingStyle, DEFAULT_DISPLAY_OPTIONS } from "./DisplayOptionsStore";
import { IDisplayOptionsRepository, displayOptionsRepository } from "../../Repositories/DisplayOptions/DisplayOptionsRepository";
import { from } from "rxjs";


export class DisplayOptionsService {
    
    constructor(private displayOptionsStore: DisplayOptionsStore, private displayOptionsRepository: IDisplayOptionsRepository) {

    }

    async fetchDisplayOptions() {
  
        try {
            const displayOptions = await this.displayOptionsRepository.getAll();

            if(displayOptions.length > 0) {
                this.displayOptionsStore.update((state: IDisplayOptionsStore) => (displayOptions[0]));
            } else {
                const d = await this.displayOptionsRepository.add(DEFAULT_DISPLAY_OPTIONS);
                this.displayOptionsStore.update((state: IDisplayOptionsStore) => (d));
            }
        }
        catch(e) {

        }
        finally {

        }
    }

    updateGridColor(gridColor: IColor) {

        const sub = this.displayOptionsStore._select(store => store.id).subscribe(id => {
            if(id !== undefined) {
                this.displayOptionsRepository.updateGridColor(id, gridColor);
            }
        })

        sub.unsubscribe();
        

        this.displayOptionsStore.update((state: IDisplayOptionsStore) => ({
            gridColor
        }));
    }

    updateGridLineColor(gridLineColor: IColor) {
        const sub = this.displayOptionsStore._select(store => store.id).subscribe(id => {
            if(id !== undefined) {
                this.displayOptionsRepository.updateGridLineColor(id, gridLineColor);
            }
        })

        sub.unsubscribe();



        this.displayOptionsStore.update((state: IDisplayOptionsStore) => ({
            gridLineColor
        }));
    }

    updateThrowingStyle(throwingStyle: ThrowingStyle) {

        const sub = this.displayOptionsStore._select(store => store.id).subscribe(id => {
            if(id !== undefined) {
                this.displayOptionsRepository.updateThrowingStyle(id, throwingStyle);
            }
        })

        sub.unsubscribe();

        this.displayOptionsStore.update((state: IDisplayOptionsStore) => ({
            throwingStyle
        }));
    }
}

export const displayOptionsService = new DisplayOptionsService(displayOptionsStore, displayOptionsRepository);