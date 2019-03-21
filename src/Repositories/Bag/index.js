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

  deleteBag(id) {
    return new Promise((resolve, reject) => {
      this.db.table('bag')
        .delete(parseInt(id, 0))
        .then(() => {
          resolve(true);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  addHiddenColumn(column) {
    return new Promise((resolve, reject) => {
      this.db.table('hiddenColumns')
        .add({ column })
        .then((id) => {
          resolve(Object.assign({}, column, { id }));
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e);
          reject(e);
        });
    });
  }

  deleteHiddenColumn(column) {
    return new Promise((resolve, reject) => {
      this.db.table('hiddenColumns')
        .where('column').anyOf(column)
        .delete()
        .then(() => {
          resolve(true);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default BagRepository;

