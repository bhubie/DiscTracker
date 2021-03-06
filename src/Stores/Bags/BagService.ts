import { BagStore, bagStore, IBagStore } from "./BagStore";
import { IBagRepsitory, bagRepository } from "../../Repositories/Bag/BagRepository";
import { from } from "rxjs";


export class BagService {

    constructor(private bagStore: BagStore, private bagRepository: IBagRepsitory) {

    }

    async fetchBags() {
        this.bagStore.setLoading(true);
        
        try {
            const bags = await this.bagRepository.getAll();

            if(bags.length > 0) {
                this.bagStore.update((state: IBagStore) => ({
                    bags,
                    selectedBag: bags[0]
                }));
            } else {
                const b = await  this.bagRepository.add('Default Bag');

                this.bagStore.update((state: IBagStore) => ({
                    bags: [b],
                    selectedBag: b
                }));
            }
        }
        catch(error) {

        }
        finally {
            this.bagStore.setLoading(false);
        }
    }

    async addBag(bagName: string) {

        try {
            const b = await this.bagRepository.add(bagName);

            this.bagStore.update((state: IBagStore) => ({
                bags: [...state.bags, b],
            }));
        } 
        catch(error) {
            this.bagStore.setError(error);
        }
       
    }

    deleteBag(id: number) {

        try {
            this.bagRepository.deleteBag(id);
            
            this.bagStore.update((state: IBagStore) => ({
                bags: state.bags.filter(bag => bag.id !== id)
            }));
        }
        catch(error) {
            this.bagStore.setError(error);
        }

    }

    updateBagName(id: number, name: string) {

        try {
            this.bagRepository.updateBagName(id, name);
            this.bagStore.update((state: IBagStore) => ({
             bags: [
                    ...state.bags.filter(bag => bag.id !== id),
                    Object.assign({}, state.bags.find(bag => bag.id === id), { name }),
                  ]
            }));
        }
        catch(error) {
            this.bagStore.setError(error);
        }
    }

    updateSelectedBag(id: number) {
        this.bagStore.update((state: IBagStore) => ({
            selectedBag: state.bags.find(bag => bag.id === id)
        }));
    }
}

export const bagService = new BagService(bagStore, bagRepository);