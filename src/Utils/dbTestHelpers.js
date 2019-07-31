import Dexie from 'dexie';
import relationships from 'dexie-relationships';

Dexie.dependencies.indexedDB = require('fake-indexeddb');
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

const testDB = new Dexie('DiscTracker', { addons: [relationships] });
testDB.version(1).stores({
  baggedDisc: '++id,discID,bagID -> bag.id,name,type,weight,color,wear',
  bag: '++id,name',
  displayOptions: '++id,hand,gridColor,gridLineColor',
  bagSettings: '++id,hiddenColumns',
});

const deleteTableContents = (table) => {
  testDB.table(table).clear();
};

export { deleteTableContents, testDB };
