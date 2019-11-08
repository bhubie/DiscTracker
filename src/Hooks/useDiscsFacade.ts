import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { discService } from '../Stores/Disc/DiscService';
import { IDisc, DiscType } from '../Stores/Disc/DiscStore';
import { discQuery } from '../Stores/Disc/DiscQuery';
import { onEmit } from '../Utils/Utils';
import { baggedDiscsService } from '../Stores/BaggedDiscs/BaggedDiscsService';
import { IBaggedDisc } from '../Stores/BaggedDiscs/BaggedDiscsStore';
import { bagQuery } from '../Stores/Bags/BagQuery';
import { combineLatest } from 'rxjs';


interface DiscState {
    discs: IDisc[]
    isDriversSelected: boolean
    isFairwayDriversSelected: boolean
    isMidrangeSelected: boolean
    isPutterSelected: boolean
    isFetchingDiscs: boolean
    isAddToBagButtonDisabled: boolean
    selectedDiscID: string
}

export function useDiscsFacade(): [DiscState, 
    (discType: DiscType, include: boolean) => void, 
    (id: string) => void,
    () => void
] {

    const setDiscTypeInclusionFilter = (discType: DiscType, include: boolean) => {
        if(include) {
            discService.addDiscTypeToIncludedDiscFilter(discType);
        } else {
            discService.removeDiscTypeFromDiscToIncludeFilter(discType);
        }
    };

    const setSelectedDiscID = (id: string) => {
        discService.setSelectedDiscID(id);
    }

    const addDiscToBag = () => {

        baggedDiscsService.addDisc(bagQuery.getValue().selectedBag, discQuery.getValue().discs.filter(disc => disc._id === discQuery.getValue().selectedDiscId)[0]);

        // combineLatest(bagQuery.selectedBag$, discQuery.selectedDisc$)
        //     .subscribe(([bag, disc]) => {
        //         if(disc !== undefined && bag !== undefined) {
        //             const d: IBaggedDisc =  {
        //                 discID: disc._id,
        //                 bagID: bag.id,
        //                 name: disc.name,
        //                 manufacturer: disc.manufacturer,
        //                 difficulty: disc.dificulty,
        //                 type: disc.type,
        //                 selected: true,
        //                 color: {
        //                     r: 0,
        //                     g: 188,
        //                     b: 212,
        //                     a: 1,
        //                 },
        //                 weight: 175,
        //                 wear: 10,
        //                 discInformation: null
        //             }
        //             baggedDiscsService.addDisc(d);
        //         }
        //     }).unsubscribe();  
    }
    
    const [state, setState] = useState<DiscState>({ 
        discs: [],
        isDriversSelected: true,
        isFairwayDriversSelected: true,
        isPutterSelected: true,
        isMidrangeSelected: true,
        isFetchingDiscs: true,
        isAddToBagButtonDisabled: true,
        selectedDiscID: ''
    }); 


    useEffect(() => {
        const subscriptions: Subscription[] = [
          onEmit<IDisc[]>(discQuery.selectVisibleDiscs$, discs => setState(state => ({ ...state, discs  })) ),
          onEmit<boolean>(discQuery.isDriversSelected$, isDriversSelected => setState(state => ({ ...state, isDriversSelected  }))),
          onEmit<boolean>(discQuery.isFairwayDriversSelected$, isFairwayDriversSelected => setState(state => ({ ...state, isFairwayDriversSelected  }))),
          onEmit<boolean>(discQuery.isMidrangeSelected$, isMidrangeSelected => setState(state => ({ ...state, isMidrangeSelected  }))),
          onEmit<boolean>(discQuery.isPuttersSelected$, isPutterSelected => setState(state => ({ ...state, isPutterSelected }))),
          onEmit<boolean>(discQuery.isFetchingDiscs$, isFetchingDiscs => setState(state => ({ ...state, isFetchingDiscs }))),
          onEmit<boolean>(discQuery.isAddToBagButtonDisabled$, isAddToBagButtonDisabled => setState(state => ({ ...state, isAddToBagButtonDisabled }))),
          onEmit<string>(discQuery.selectedDiscID$, selectedDiscID => setState(state => ({ ...state, selectedDiscID }))),
        ];
        
        discService.fetchDiscs();

        return () => { subscriptions.map(it => it.unsubscribe()) };
      },[]);
    
      return [state, setDiscTypeInclusionFilter, setSelectedDiscID, addDiscToBag];
}