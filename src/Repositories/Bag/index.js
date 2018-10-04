class BagRepository {
  constructor(db) {
    this.db = db;
  }

  add(bag) {
    return new Promise((resolve) => {
      this.db.table('bag')
        .add(bag)
        .then((id) => {
          resolve(Object.assign({}, bag, { id }));
        });
    });
  }

  updateName(id, name) {
    return new Promise((resolve, reject) => {
      this.db.table('bag')
        .update(parseInt(id, 0), { name })
        .then(() => {
          resolve(name);
        })
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
          if (bags === undefined) {
            resolve([]);
          }

          resolve(bags);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default BagRepository;

