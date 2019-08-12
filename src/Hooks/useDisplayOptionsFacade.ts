import { useEffect, useState } from 'react';
import { Observable, Subscription } from 'rxjs';
import { displayOptionsQuery } from '../Stores/DisplayOptions/DisplayOptionsQuery';
import { displayOptionsService } from '../Stores/DisplayOptions/DisplayOptionsService';
import { IColor } from '../Stores/DisplayOptions/DisplayOptionsStore';

interface DisplayOptionsState {
    isRightHandSelected: boolean
    isLeftHandSelected: boolean
    gridColor: IColor
    gridLineColor: IColor
}

function onEmit<T>(source$:Observable<T>, nextFn:(value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error);
}

export function useDisplayOptionsFacade(): [DisplayOptionsState, Function, Function, Function] {

    const updateThrowingStyle = (style: string) => {
        if(style === 'L') {
            displayOptionsService.updateThrowingStyle({value:'L', label:'LHBH/RHFH'});
        } else {
            displayOptionsService.updateThrowingStyle({value:'R', label:'RHBH/LHFH'});
        }
       
    }

    const updateGridColor = (id: any, color: IColor) => {
        displayOptionsService.updateGridColor(color);
    }

    const updateGridLineColor = (id: any, color: IColor) => {
        displayOptionsService.updateGridLineColor(color);
    }

    const [state, setState] = useState<DisplayOptionsState>({
        isRightHandSelected: true,
        isLeftHandSelected: false,
        gridColor:  {
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
    });

    useEffect(() => {
        const subscriptions: Subscription[] = [
            onEmit<boolean>(displayOptionsQuery.isRightHandSelected$, isRightHandSelected => setState(state => ({ ...state, isRightHandSelected}))),
            onEmit<boolean>(displayOptionsQuery.isLeftHandSelected$, isLeftHandSelected => setState(state => ({ ...state, isLeftHandSelected}))),
            onEmit<IColor>(displayOptionsQuery.gridColor$, gridColor => setState(state => ({ ...state, gridColor}))),
            onEmit<IColor>(displayOptionsQuery.gridLineColor$, gridLineColor => setState(state => ({ ...state, gridLineColor}))),
        ];

        displayOptionsService.fetchDisplayOptions();

        return () => { subscriptions.map(it => it.unsubscribe()) };
      },[]);

      return [state, updateThrowingStyle, updateGridColor, updateGridLineColor];
}
