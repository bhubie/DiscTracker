import { IDisplayOptionsStore, ThrowingStyle, IColor } from "../../Stores/DisplayOptions/DisplayOptionsStore";
import { Dexie } from "dexie";
import db from '../../db';

export interface IDisplayOptionsRepository {
    add: (displayOption: IDisplayOptionsStore) => Promise<IDisplayOptionsStore>
    updateThrowingStyle: (id: number, throwingStyle: ThrowingStyle) => Promise<ThrowingStyle> 
    updateGridColor: (id: number, gridColor: IColor) => Promise<IColor>
    updateGridLineColor: (id: number, gridLineColor: IColor) => Promise<IColor>
    getAll: () => Promise<IDisplayOptionsStore[]>
}

export class DisplayOptionsRepository implements IDisplayOptionsRepository {
    private db: Dexie;
    constructor(db: Dexie) {
      this.db = db;
    }
  
    add(displayOption: IDisplayOptionsStore) {
        const itemToAdd: any = {
            gridColor: displayOption.gridColor,
            gridLineColor: displayOption.gridLineColor,
            hand: displayOption.throwingStyle
        }
        return new Promise<IDisplayOptionsStore>((resolve) => {
            this.db.table('displayOptions')
            .add(itemToAdd)
            .then((id) => {
                const d: IDisplayOptionsStore = {
                    id: id as number,
                    throwingStyle: displayOption.throwingStyle,
                    gridColor: displayOption.gridColor,
                    gridLineColor: displayOption.gridLineColor
                };
                resolve(d);
            });
        });
    }
  
    updateThrowingStyle(id: number, throwingStyle: ThrowingStyle) {
      return new Promise<ThrowingStyle>((resolve, reject) => {
        this.db.table('displayOptions')
          .update(id, { hand: throwingStyle })
          .then(() =>{ 
              resolve(throwingStyle)
            })
          .catch((e) => {
            reject(e);
          });
      });
    }
  
    updateGridColor(id: number, gridColor: IColor) {
      return new Promise<IColor>((resolve, reject) => {
        this.db.table('displayOptions')
          .update(id, { gridColor })
          .then(() =>  {
              resolve(gridColor)
            })
          .catch((e) => {
            reject(e);
          });
      });
    }
  
    updateGridLineColor(id: number, gridLineColor: IColor) {
      return new Promise<IColor>((resolve, reject) => {
        this.db.table('displayOptions')
          .update(id, { gridLineColor })
          .then(() =>  {
              resolve(gridLineColor)
            })
          .catch((e) => {
            reject(e);
          });
      });
    }
  
    getAll() {
      return new Promise<IDisplayOptionsStore[]>((resolve, reject) => {
        this.db.table('displayOptions')
          .toArray()
          .then((displayOption) => {
            const ds: IDisplayOptionsStore[] = displayOption.map(o => {
                return {
                    id: o.id,
                    throwingStyle: o.hand,
                    gridColor: o.gridColor,
                    gridLineColor: o.gridLineColor
                }
            });
            resolve(ds);
          })
          .catch((e) => {
            reject(e);
          });
      });
    }
  }
  
  export const displayOptionsRepository = new DisplayOptionsRepository(db);
  