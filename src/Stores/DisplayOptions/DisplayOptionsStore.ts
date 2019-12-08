import { Store, StoreConfig } from '@datorama/akita';

export type RightHand = {
    value: 'R',
    label: 'RHBH/LHFH'
}

export type LeftHand = {
    value: 'L',
    label: 'LHBH/RHFH'
}

export type ThrowingStyle = RightHand | LeftHand;

export interface IColor {
    r: number
    g: number
    b: number
    a: number
}

export interface IDisplayOptionsStore {
    id?: number
    throwingStyle : ThrowingStyle
    gridColor: IColor
    gridLineColor: IColor
}

export const DEFAULT_DISPLAY_OPTIONS: IDisplayOptionsStore  = {
    throwingStyle: {
        value: 'R',
        label: 'RHBH/LHFH'
    },
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
  };

export function createIntialDisplayOptionsStoreState(): IDisplayOptionsStore {
    return DEFAULT_DISPLAY_OPTIONS;
}

@StoreConfig({ name: 'displayOptions' })
export class DisplayOptionsStore extends Store<IDisplayOptionsStore> {
    constructor() {
        super(createIntialDisplayOptionsStoreState());
    }
}

export const displayOptionsStore = new DisplayOptionsStore();