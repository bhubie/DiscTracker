import { useEffect, useState } from 'react';
import { IBaggedDisc } from '../Stores/BaggedDiscs/BaggedDiscsStore';
import { Subscription } from 'rxjs';
import { onEmit } from '../Utils/Utils';
import { baggedDiscsQuery } from '../Stores/BaggedDiscs/BaggedDiscsQuery';
import { bagQuery } from '../Stores/Bags/BagQuery';
import { baggedDiscsService } from '../Stores/BaggedDiscs/BaggedDiscsService';
import { IColor } from '../Stores/DisplayOptions/DisplayOptionsStore';
import { bagSettingsQuery } from '../Stores/BagSettings/BagSettingsQuery';
import { IBag } from '../Stores/Bags/BagStore';
import { discQuery } from '../Stores/Disc/DiscQuery';


interface BaggedDiscsState {
    baggedDrivers: IBaggedDisc[]
    baggedFairwayDrivers: IBaggedDisc[]
    baggedPutters: IBaggedDisc[]
    baggedMidranges: IBaggedDisc[]
    columns: {name: string, caption: string}[]
}

export function useBaggedDiscsFacade(): [
    BaggedDiscsState, 
    (id: number, enabled: boolean) => void, 
    (id: number, color: IColor) => void, 
    (id: number, wear: number) => void,
    (id: number) => void
] {

    function updateDiscEnabled(id: number, enabled: boolean) {
        baggedDiscsService.updateDiscEnabled(id, enabled);
    }

    function updateDiscColor(id: number, color: IColor) {
        baggedDiscsService.updateDiscColor(id, color);
    }

    function updateDiscWear(id: number, wear: number) {
        baggedDiscsService.updateDiscWear(id, wear);
    }

    function deleteDisc(id: number) {
        baggedDiscsService.deleteBaggedDisc(id);
    }

    const [state, setState] = useState<BaggedDiscsState>({
        baggedDrivers: [],
        baggedFairwayDrivers: [],
        baggedPutters: [],
        baggedMidranges: [],
        columns: [],
    });

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<IBaggedDisc[]>(baggedDiscsQuery.baggedDrivers$, baggedDrivers => setState(state => ({ ...state, baggedDrivers  })) ),
            onEmit<IBaggedDisc[]>(baggedDiscsQuery.baggedFairwayDrivers$, baggedFairwayDrivers => setState(state => ({ ...state, baggedFairwayDrivers  })) ),
            onEmit<IBaggedDisc[]>(baggedDiscsQuery.baggedMidranges$, baggedMidranges => setState(state => ({ ...state, baggedMidranges  })) ),
            onEmit<IBaggedDisc[]>(baggedDiscsQuery.baggedPutters$, baggedPutters => setState(state => ({ ...state, baggedPutters  }))),
            onEmit<{name: string, caption: string,}[]>(bagSettingsQuery.visibleColumns$, columns => setState(state => ({ ...state, columns  })) ),
            onEmit<IBag | undefined>(bagQuery.selectedBag$, bag => {
                if(bag !== undefined) {
                    baggedDiscsService.fetchBaggedDiscs(bag.id);
                }
            }),

        ]

        return () => { subscriptions.map(it => it.unsubscribe()) };
    }, []);

    return [state, updateDiscEnabled, updateDiscColor, updateDiscWear, deleteDisc];
}