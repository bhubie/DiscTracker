import Dexie from 'dexie';
import relationships from 'dexie-relationships';
// import setGlobalVars from 'indexeddbshim';


// const shim = {};
// setGlobalVars(shim, { checkOrigin: false });
// const { indexedDB, IDBKeyRange } = shim;
// Dexie.dependencies.indexedDB = indexedDB;
// Dexie.dependencies.IDBKeyRange = IDBKeyRange;

const db = new Dexie('DiscTracker', { addons: [relationships] });
db.version(1).stores({
  baggedDisc: '++id,discID,bagID -> bag.id,name,type,weight,color,wear',
  bag: '++id,name',
  displayOptions: '++id,hand,gridColor,gridLineColor',
});

export default db;
