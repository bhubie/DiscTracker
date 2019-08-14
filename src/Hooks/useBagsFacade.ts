import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { onEmit } from '../Utils/Utils';
import { IBag } from '../Stores/Bags/BagStore';
import { bagService } from '../Stores/Bags/BagService';
import { bagQuery } from '../Stores/Bags/BagQuery';

interface BagsState {
    bags: IBag[]
    selectedBag: IBag | undefined,
    isLoadingBags: boolean
}

export function useBagsFacade(): [BagsState, Function, Function, Function, Function] {


    function updateSelectedBag(id: string) {
        bagService.updateSelectedBag(parseInt(id));
    }

    function addNewBag(name: string) {
        bagService.addBag(name);
    }

    function editBag(id: number, name: string) {
        bagService.updateBagName(id, name)
    }

    function deleteBag(id: number) {
        bagService.deleteBag(id);
    }
    
    const [state, setState] = useState<BagsState>({
        bags: [],
        selectedBag: undefined,
        isLoadingBags: false
    })

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<IBag[]>(bagQuery.bags$, bags => setState(state => ({ ...state, bags  })) ),
            onEmit<IBag | undefined>(bagQuery.selectedBag$, selectedBag => setState(state => ({ ...state, selectedBag })) ),
            onEmit<boolean>(bagQuery.isLoadingBags$, isLoadingBags => setState(state => ({ ...state, isLoadingBags })) )
        ];

        bagService.fetchBags();

        return () => { subscriptions.map(it => it.unsubscribe()) };
    }, []);

    return [state, updateSelectedBag, addNewBag, editBag, deleteBag];
}