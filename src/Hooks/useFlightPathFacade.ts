import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { onEmit } from '../Utils/Utils';
import { IColor, ThrowingStyle } from '../Stores/DisplayOptions/DisplayOptionsStore';
import { displayOptionsQuery } from '../Stores/DisplayOptions/DisplayOptionsQuery';
import { baggedDiscsQuery } from '../Stores/BaggedDiscs/BaggedDiscsQuery';
import { IBaggedDisc } from '../Stores/BaggedDiscs/BaggedDiscsStore';


interface FlightPathState {
    discs: IBaggedDisc[]
    gridColor: IColor
    gridLineColor: IColor
    throwingStyle: ThrowingStyle
}


export function useFlightPathFacade(): FlightPathState {

    const [state, setState] = useState<FlightPathState>({
        discs: [],
        gridColor: {
            r: 37,
            g: 37,
            b: 38,
            a: 1,
          },
        gridLineColor: {
            r: 255,
            g: 255,
            b: 255,
            a: 1,
          },
        throwingStyle: {
            value: 'R',
            label: 'RHBH/LHFH'
        }
    });

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<IBaggedDisc[]>(baggedDiscsQuery.selectedBagDiscs$, discs => setState(state => ({ ...state, discs  })) ),
            onEmit<IColor>(displayOptionsQuery.gridColor$, gridColor => setState(state => ({ ...state, gridColor  })) ),
            onEmit<IColor>(displayOptionsQuery.gridLineColor$, gridLineColor => setState(state => ({ ...state, gridLineColor  })) ),
            onEmit<ThrowingStyle>(displayOptionsQuery.throwingStyle$, throwingStyle => setState(state => ({ ...state, throwingStyle  })) ),
        ]

        return () => { subscriptions.map(it => it.unsubscribe()) };
    }, []);

    return state;
}