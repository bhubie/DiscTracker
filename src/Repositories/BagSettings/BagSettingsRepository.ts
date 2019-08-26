import Dexie from "dexie";
import db from "../../db";
import { IBagSettingsStore } from "../../Stores/BagSettings/BagSettingsStore";


export interface IBagSettingsRepository {
    add: (bagSetting: IBagSettingsStore) => Promise<IBagSettingsStore>
    addHiddenColumn: (id: number, column: string) => Promise<string>
    deleteHiddenColumn: (id: number, column: string) => Promise<boolean>
    getAll: () => Promise<IBagSettingsStore[]>
}

export class BagSettingsRepository implements IBagSettingsRepository {
    
    private db: Dexie;
    private tableName: string;

    constructor(db: Dexie) {
        this.db = db;
        this.tableName = 'bagSettings';
      }
    
      add(bagSetting: IBagSettingsStore) {
        return new Promise<IBagSettingsStore>((resolve) => {
          this.db.table(this.tableName)
            .add(bagSetting)
            .then((id) => {
              resolve(Object.assign({}, bagSetting, { id }));
            });
        });
      }
    
      addHiddenColumn(id: number, column: string) {
        return new Promise<string>((resolve, reject) => {
          this.db.table(this.tableName)
            .where('id')
            .equals(id)
            .modify((x) => {
              x.hiddenColumns.push(column);
            })
            .then(() => resolve(column))
            .catch((e) => {
              console.error(e);
              reject(e);
            });
        });
      }
    
      deleteHiddenColumn(id: number, column: string) {
        return new Promise<boolean>((resolve, reject) => {
          this.db.table(this.tableName)
            .where('id')
            .equals(id)
            .modify((x) => {
              x.hiddenColumns = x.hiddenColumns.filter((item: string) => item !== column);
            })
            .then(() => resolve(true))
            .catch((e) => {
              console.error(e);
              reject(e);
            });
        });
      }
    
      getAll() {
        return new Promise<IBagSettingsStore[]>((resolve, reject) => {
          this.db.table(this.tableName)
            .toArray()
            .then((bagSetting) => {
              resolve(bagSetting);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
}

export const bagSettingsRepository = new BagSettingsRepository(db);