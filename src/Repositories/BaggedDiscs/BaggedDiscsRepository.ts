import { IColor } from "../../Stores/DisplayOptions/DisplayOptionsStore";
import Dexie from "dexie";
import db from "../../db";
import { DiscType } from "../../Stores/Disc/DiscStore";
import { IBaggedDisc } from "../../Stores/BaggedDiscs/BaggedDiscsStore";



export interface IBaggedDiscsRepositry {
    getBaggedDiscs: (bagID: number) => Promise<IBaggedDisc[]>
    addDisc: (disc: IBaggedDisc) => Promise<IBaggedDisc>
    updateDiscEnabled: (id: number, enabled: boolean) => Promise<boolean>
    updateDiscColor: (id: number, color: IColor) => Promise<boolean>
    updateDiscWear: (id: number, wear: number) => Promise<boolean>
    deleteDisc: (id: number) => Promise<number>

}

export class BaggedDiscsRepository  implements IBaggedDiscsRepositry{

    private db: Dexie;
    private tableName: string;

    constructor(db: Dexie) {
        this.db = db;
        this.tableName = 'baggedDisc';
    }

    getBaggedDiscs(bagID: number) {
        return new Promise<IBaggedDisc[]>((resolve, reject) => {
          this.db.table(this.tableName)
            .where({ bagID })
            .toArray()
            .then((discs) => {
              if (discs === undefined) {
                resolve([]);
              }
              resolve(discs);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
    
      addDisc(disc: IBaggedDisc) {
        return new Promise<IBaggedDisc>((resolve) => {
          this.db.table(this.tableName)
            .add(disc)
            .then((id) => {
              resolve(Object.assign({}, disc, { id }));
            });
        });
      }
    
      updateDiscEnabled(id: number, enabled: boolean) {
        return new Promise<boolean>((resolve, reject) => {
          this.db.table(this.tableName)
            .update(id, { selected: enabled })
            .then(() => resolve(true))
            .catch((e) => {
              reject(e);
            });
        });
      }
    
      updateDiscColor(id: number, color: IColor) {
        return new Promise<boolean>((resolve, reject) => {
          this.db.table(this.tableName)
            .update(id, { color })
            .then((updated) => {
              resolve(true);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
    
      updateDiscWear(id: number, wear: number) {
        return new Promise<boolean>((resolve, reject) => {
          this.db.table(this.tableName)
            .update(id, { wear })
            .then(() => resolve(true))
            .catch((e) => {
              reject(e);
            });
        });
      }
    
      deleteDisc(i: number) {
        return this.db.table(this.tableName)
          .where('id')
          .equals(parseInt(i.toString()))
          .delete()

      }
}

export const baggedDiscsRepository = new BaggedDiscsRepository(db);