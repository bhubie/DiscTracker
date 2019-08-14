import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { discService } from '../Stores/Disc/DiscService';
import { IDisc, DiscType } from '../Stores/Disc/DiscStore';
import { discQuery } from '../Stores/Disc/DiscQuery';
import { onEmit } from '../Utils/Utils';


interface DiscState {
    discs: IDisc[]
    isDriversSelected: boolean
    isFairwayDriversSelected: boolean
    isMidrangeSelected: boolean
    isPutterSelected: boolean
    isFetchingDiscs: boolean
}

export function useDiscsFacade(): [DiscState, Function] {

    const setDiscTypeInclusionFilter = (discType: DiscType, include: boolean) => {
        if(include) {
            discService.addDiscTypeToIncludedDiscFilter(discType);
        } else {
            discService.removeDiscTypeFromDiscToIncludeFilter(discType);
        }
    };
    
    const [state, setState] = useState<DiscState>({ 
        discs: [],
        isDriversSelected: true,
        isFairwayDriversSelected: true,
        isPutterSelected: true,
        isMidrangeSelected: true,
        isFetchingDiscs: true,
    }); 


    useEffect(() => {
        const subscriptions: Subscription[] = [
          onEmit<IDisc[]>(discQuery.selectVisibleDiscs$, discs => setState(state => ({ ...state, discs  })) ),
          onEmit<boolean>(discQuery.isDriversSelected$, isDriversSelected => setState(state => ({ ...state, isDriversSelected  }))),
          onEmit<boolean>(discQuery.isFairwayDriversSelected$, isFairwayDriversSelected => setState(state => ({ ...state, isFairwayDriversSelected  }))),
          onEmit<boolean>(discQuery.isMidrangeSelected$, isMidrangeSelected => setState(state => ({ ...state, isMidrangeSelected  }))),
          onEmit<boolean>(discQuery.isPuttersSelected$, isPutterSelected => setState(state => ({ ...state, isPutterSelected }))),
          onEmit<boolean>(discQuery.isFetchingDiscs$, isFetchingDiscs => setState(state => ({ ...state, isFetchingDiscs }))),
        ];
        
        discService.fetchDiscs();

        return () => { subscriptions.map(it => it.unsubscribe()) };
      },[]);
    
      return [state, setDiscTypeInclusionFilter];
}