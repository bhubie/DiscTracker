import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { onEmit } from '../Utils/Utils';
import { bagSettingsService } from '../Stores/BagSettings/BagSettingsService';
import { bagSettingsQuery } from '../Stores/BagSettings/BagSettingsQuery';
import { string } from 'prop-types';


interface BagSettingState {
    id: number | undefined,
    columns: {name: string, caption: string, isHidden: boolean }[]
}

export function useBagSettingsFacade(): [BagSettingState, (column: string) => void, (column: string) => void] {

    function addHiddenColumn(column: string) {
        console.log(state.id!, column)
        bagSettingsService.addHiddinColumn(state.id!, column);
    }

    function removeHiddenColumn(column: string) {
        bagSettingsService.removeHiddenColumn(state.id!, column);
    }

    const [state, setState] = useState<BagSettingState>({
        id: 1,
        columns: []
    })

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<number | undefined>(bagSettingsQuery.id$, id => setState(state => ({ ...state, id  })) ),
            onEmit<{name: string, caption: string, isHidden: boolean }[]>(bagSettingsQuery.columnsAbleToHide$, columns => setState(state => ({ ...state, columns })) ),
        ];

        bagSettingsService.fetchBagSettings();

        return () => { subscriptions.map(it => it.unsubscribe()) };
    }, []);



    return [state, addHiddenColumn, removeHiddenColumn]
}