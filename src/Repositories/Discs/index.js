class DiscsRepository {
  constructor(db) {
    this.db = db;
    this.tableName = 'baggedDisc';
  }

  getBaggedDiscs(bagID) {
    return new Promise((resolve, reject) => {
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

  addDisc(disc) {
    return new Promise((resolve) => {
      this.db.table(this.tableName)
        .add(disc)
        .then((id) => {
          resolve(Object.assign({}, disc, { id }));
        });
    });
  }

  updateDiscEnabled(id, enabled) {
    return new Promise((resolve, reject) => {
      this.db.table(this.tableName)
        .update(id, { selected: enabled })
        .then(() => resolve(Object.assign({}, { selected: enabled }, { id })))
        .catch((e) => {
          reject(e);
        });
    });
  }

  updateDiscColor(id, color) {
    return new Promise((resolve, reject) => {
      this.db.table(this.tableName)
        .update(id, { color })
        .then((updated) => {
          resolve(Object.assign({}, { color }, { id }));
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  deleteDisc(id) {
    return new Promise((resolve, reject) => {
      this.db.table(this.tableName)
        .delete(parseInt(id, 0))
        .then(() => {
          resolve(true);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default DiscsRepository;
