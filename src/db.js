import Dexie from 'dexie';
import relationships from 'dexie-relationships';

const db = new Dexie('DiscTracker', { addons: [relationships] });
db.version(1).stores({
  baggedDisc: '++id,discID,bagID -> bag.id,name,type,weight,color,wear',
  bag: '++id,name',
  displayOptions: '++id,hand,gridColor,gridLineColor',
});

export default db;
