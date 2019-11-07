import { BaggedDiscsStore, IBaggedDiscsStore, IBaggedDisc, baggedDiscsStore } from "./BaggedDiscsStore";
import { IBaggedDiscsRepositry, baggedDiscsRepository } from "../../Repositories/BaggedDiscs/BaggedDiscsRepository";
import { from } from "rxjs";
import { IColor } from "../DisplayOptions/DisplayOptionsStore";
import { DiscQuery, discQuery } from "../Disc/DiscQuery";
import { IDisc } from "../Disc/DiscStore";
import { combineLatest } from "rxjs";



export class BaggedDiscsService {
    
    constructor(private baggedDiscsStore: BaggedDiscsStore, 
                private baggedDiscsRepository: IBaggedDiscsRepositry,
                private discQuery: DiscQuery) {

    }

    fetchBaggedDiscs(bagID: number) {
       
        this.baggedDiscsStore.setLoading(true);

        combineLatest(
            from(this.baggedDiscsRepository.getBaggedDiscs(bagID))
            ,this.discQuery.selectDiscs$
            ,this.mergeBaggedDiscsWithDiscInformation
        )
        .subscribe(discs => {

            //console.log(discs)
            this.baggedDiscsStore.update((state: IBaggedDiscsStore) => ({
                baggedDiscs: discs
            }));

            this.baggedDiscsStore.setLoading(false);
        })
        //.unsubscribe();
    }

    private mergeBaggedDiscsWithDiscInformation(baggedDiscs: IBaggedDisc[], discs: IDisc[]) {
        //console.log('merge bagged discs called');
        //console.log(discs)
        return baggedDiscs.map(bd => {
            if(bd.discInformation === null) {
                //console.log('discInformation is null')
                //console.log(discs.find(d => d._id === bd.discID))
                const foundDisc = discs.find(d => d._id === bd.discID);

                return {
                    ...bd,
                    discInformation: foundDisc !== undefined ? foundDisc : null
                }
                
            }
            return bd;       
        })
    }

 

    async addDisc(disc: IBaggedDisc) {
        try {
            const d = await this.baggedDiscsRepository.addDisc(disc);

            this.discQuery.selectedDisc$.subscribe(disc => {
                if(disc !== undefined) {
                    d.discInformation = disc;
                }

                //console.log(d);
                this.baggedDiscsStore.update((state: IBaggedDiscsStore) => ({
                    baggedDiscs: [...state.baggedDiscs, d]
                }));
            }).unsubscribe();
           
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

export const baggedDiscsService = new BaggedDiscsService(baggedDiscsStore, baggedDiscsRepository, discQuery);