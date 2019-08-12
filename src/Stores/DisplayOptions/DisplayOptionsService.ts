import { IDisplayOptionsStore, displayOptionsStore, DisplayOptionsStore, IColor, ThrowingStyle } from "./DisplayOptionsStore";
import { IDisplayOptionsRepository, displayOptionsRepository } from "../../Repositories/DisplayOptions/DisplayOptionsRepository";
import { from } from "rxjs";


export class DisplayOptionsService {
    
    constructor(private displayOptionsStore: DisplayOptionsStore, private displayOptionsRepository: IDisplayOptionsRepository) {

    }

    fetchDisplayOptions() {
        from(this.displayOptionsRepository.getAll())
            .subscribe(displayOptions => {
                this.displayOptionsStore.update((state: IDisplayOptionsStore) => (displayOptions[0]));
            })
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