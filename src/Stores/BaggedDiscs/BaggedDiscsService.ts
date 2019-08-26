import { BaggedDiscsStore, IBaggedDiscsStore, IBaggedDisc, baggedDiscsStore } from "./BaggedDiscsStore";
import { IBaggedDiscsRepositry, baggedDiscsRepository } from "../../Repositories/BaggedDiscs/BaggedDiscsRepository";
import { from } from "rxjs";
import { IColor } from "../DisplayOptions/DisplayOptionsStore";



export class BaggedDiscsService {
    
    constructor(private baggedDiscsStore: BaggedDiscsStore, private baggedDiscsRepository: IBaggedDiscsRepositry) {

    }

    fetchBaggedDiscs(bagID: number) {
        this.baggedDiscsStore.setLoading(true);

        from(this.baggedDiscsRepository.getBaggedDiscs(bagID))
            .subscribe(discs => {
                this.baggedDiscsStore.update((state: IBaggedDiscsStore) => ({
                    baggedDiscs: discs.sort((a, b) => { 
                        if(a.name < b.name) {
                            return -1;
                        }
                        if(a.name > b.name) {
                            return 1
                        }
                        return 0;
                    })
                }));
                this.baggedDiscsStore.setLoading(false);
            })
    }

    async addDisc(disc: IBaggedDisc) {
        try {
            const d = await  this.baggedDiscsRepository.addDisc(disc);
            this.baggedDiscsStore.update((state: IBaggedDiscsStore) => ({
                baggedDiscs: [...state.baggedDiscs, d]
            }));
        } 
        catch(error) {
            this.baggedDiscsStore.setError(error);
        }
    }

    deleteBaggedDisc(id: number) {
        try {
            this.baggedDiscsRepository.deleteDisc(id);

            this.baggedDiscsStore.update((state: IBaggedDiscsStore) => ({
                baggedDiscs: state.baggedDiscs.filter(disc => disc.id !== id)
            }));
        }
        catch(error) {
            this.baggedDiscsStore.setError(error);
        }
    }

    updateDiscEnabled(id: number, enabled: boolean) {
        try
        {
            this.baggedDiscsRepository.updateDiscEnabled(id, enabled);
            this.baggedDiscsStore.update((state: IBaggedDiscsStore) => ({
                baggedDiscs: [
                    ...state.baggedDiscs.filter(disc => disc.id !== id),
                    Object.assign({}, state.baggedDiscs.find(disc => disc.id === id), { selected: enabled }),
                ]
            }));
        }
        catch(error) {
            this.baggedDiscsStore.setError(error);
        }
    }

    updateDiscColor(id: number, color: IColor) {
        try
        {
            this.baggedDiscsRepository.updateDiscColor(id, color);
            this.baggedDiscsStore.update((state: IBaggedDiscsStore) => ({
                baggedDiscs: [
                    ...state.baggedDiscs.filter(disc => disc.id !== id),
                    Object.assign({}, state.baggedDiscs.find(disc => disc.id === id), { color }),
                ]
            }));
        }
        catch(error) {
            this.baggedDiscsStore.setError(error);
        }
    }

    updateDiscWear(id: number, wear: number) {
        try
        {
            this.baggedDiscsRepository.updateDiscWear(id, wear);
            this.baggedDiscsStore.update((state: IBaggedDiscsStore) => {
                return ({
                baggedDiscs: [
                    ...state.baggedDiscs.filter(disc => disc.id !== id),
                    Object.assign({}, state.baggedDiscs.find(disc => disc.id === id), { wear }),
                ]
            })});
        }
        catch(error) {
            this.baggedDiscsStore.setError(error);
        }
    }
}

export const baggedDiscsService = new BaggedDiscsService(baggedDiscsStore, baggedDiscsRepository);