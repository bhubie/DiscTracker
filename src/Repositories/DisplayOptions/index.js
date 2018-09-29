class DisplayOptionsRepository {
  constructor(db) {
    this.db = db;
  }

  add(displayOption) {
    return new Promise((resolve) => {
      this.db.table('displayOptions')
        .add(displayOption)
        .then((id) => {
          resolve(Object.assign({}, displayOption, { id }));
        });
    });
  }

  updateHand(id, hand) {
    return new Promise((resolve, reject) => {
      this.db.table('displayOptions')
        .update(id, { hand })
        .then(() => resolve(Object.assign({}, { hand }, { id })))
        .catch((e) => {
          reject(e);
        });
    });
  }

  updateGridColor(id, gridColor) {
    return new Promise((resolve, reject) => {
      this.db.table('displayOptions')
        .update(id, { gridColor })
        .then(() =>  resolve(Object.assign({}, { gridColor }, { id })))
        .catch((e) => {
          reject(e);
        });
    });
  }

  updateGridLineColor(id, gridLineColor) {
    return new Promise((resolve, reject) => {
      this.db.table('displayOptions')
        .update(id, { gridLineColor })
        .then(() =>  resolve(Object.assign({}, { gridLineColor }, { id })))
        .catch((e) => {
          reject(e);
        });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.db.table('displayOptions')
        .toArray()
        .then((displayOption) => {
          resolve(displayOption);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default DisplayOptionsRepository;
