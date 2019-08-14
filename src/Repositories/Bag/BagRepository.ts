import { IBag } from "../../Stores/Bags/BagStore";
import Dexie from "dexie";
import db from '../../db';


export interface IBagRepsitory {
    add: (name: string) => Promise<IBag>
    updateBagName: (id: number, name: string) => Promise<IBag>
    getAll: () => Promise<IBag[]>
    deleteBag: (id: number) => Promise<boolean>


}

class BagRepository implements IBagRepsitory {

    private db: Dexie;

    constructor(db: Dexie) {
        this.db = db;
    }

    add(name: string) {
        return new Promise<IBag>((resolve, reject) => {
          this.db.table('bag')
            .add({name})
            .then((id) => {
                const b: IBag = {
                    name,
                    id
                }
                resolve(b);
            })
            .catch(error => {
                reject(error);
            });
        });
      }
    
      updateBagName(id: number, name: string) {
        return new Promise<IBag>((resolve, reject) => {
          this.db.table('bag')
            .update(id, { name })
            .then(() => {
                const b: IBag = {
                    name,
                    id
                }
              resolve(b);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
    
      getAll() {
        return new Promise<IBag[]>((resolve, reject) => {
          this.db.table('bag')
            .toArray()
            .then((bags) => {
              if (bags === undefined) {
                resolve([]);
              }
    
              resolve(bags);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
    
      deleteBag(id: number) {
        return new Promise<boolean>((resolve, reject) => {
          this.db.table('bag')
            .delete(id)
            .then(() => {
              resolve(true);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
    


}

export default BagRepository;

export const bagRepository = new BagRepository(db);