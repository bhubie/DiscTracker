class BagRepository {
  constructor(db) {
    this.db = db;
  }

  add(bag) {
    return new Promise((resolve) => {
      this.db.table('bag')
        .add(bag)
        .then((id) => {
          resolve(id);
        });
    });
  }

  updateName(id, name) {
    return new Promise((resolve, reject) => {
      this.db.table('bag')
        .update(id, { name })
        .then(() => resolve(name))
        .catch((e) => {
          reject(e);
        });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.db.table('bag')
        .toArray()
        .then((bags) => {
          resolve(bags);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default BagRepository;
