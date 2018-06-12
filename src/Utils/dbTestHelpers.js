import Dexie from 'dexie';
import relationships from 'dexie-relationships';
import indexedDB from 'fake-indexeddb';

const testDB = new Dexie('DiscTracker', { addons: [relationships], indexedDB });
testDB.version(1).stores({
  baggedDisc: '++id,discID,bagID -> bag.id,name,type,weight,color,wear',
  bag: '++id,name',
  displayOptions: '++id,hand,gridColor,gridLineColor',
});

const deleteTableContents = (table) => {
  testDB.table(table).clear();
};

export { deleteTableContents, testDB };
