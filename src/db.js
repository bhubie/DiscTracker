import Dexie from 'dexie';

const db = new Dexie('DiscTracker');
db.version(1).stores({
  baggedDisc: '++id,discID,bagID,name,type,weight,color,wear',
  bag: '++id,name',
  displayOptions: '++id,hand,gridColor,gridLineColor',
});

export default db;
