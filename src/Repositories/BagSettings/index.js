/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable-next-line no-param-reassign */
class BagSettingsRepository {
  constructor(db) {
    this.db = db;
    this.tableName = 'bagSettings';
  }

  add(bagSetting) {
    return new Promise((resolve) => {
      this.db.table(this.tableName)
        .add(bagSetting)
        .then((id) => {
          resolve(Object.assign({}, bagSetting, { id }));
        });
    });
  }

  addHiddenColumn(id, column) {
    return new Promise((resolve, reject) => {
      this.db.table(this.tableName)
        .where('id')
        .equals(id)
        // eslint-disable-next-line no-unused-expressions
        .modify((x) => {
          // eslint-disable-next-line no-unused-expressions
          x.hiddenColumns.push(column);
        })
        .then(() => resolve(column))
        .catch((e) => {
          console.error(e);
          reject(e);
        });
    });
  }

  deleteHiddenColumn(id, column) {
    console.log('removing column ', column);
    return new Promise((resolve, reject) => {
      this.db.table(this.tableName)
        .where('id')
        .equals(id)
        .modify((x) => {
          x.hiddenColumns = x.hiddenColumns.filter(item => item !== column);
        })
        .then(() => resolve(column))
        .catch((e) => {
          console.error(e);
          reject(e);
        });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
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

export default BagSettingsRepository;

