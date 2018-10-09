import db from '../db';
import DisplayOptionsRepository from '../Repositories/DisplayOptions';
import BagRepository from '../Repositories/Bag';

const defaultDisplayOptions = {
  hand: {
    value: 'L',
  },
  gridColor: {
    r: '37',
    g: '37',
    b: '38',
    a: '1',
  },
  gridLineColor: {
    r: '255',
    g: '255',
    b: '255',
    a: '1',
  },
};

const defaultBag = { name: 'Default Bag' };


const seedDisplayOptions = () => {
  const displayRepository = new DisplayOptionsRepository(db);

  return new Promise((resolve) => {
    displayRepository.getAll()
      .then((results) => {
        if (results.length > 0) {
          resolve(true);
        } else {
          displayRepository.add(defaultDisplayOptions).then(() => {
            resolve(true);
          });
        }
      });
  });
};

const seedBags = () => {
  const bagRepository = new BagRepository(db);

  return new Promise((resolve) => {
    bagRepository.getAll()
      .then((results) => {
        if (results.length > 0) {
          resolve(true);
        } else {
          bagRepository.add(defaultBag).then(() => {
            resolve(true);
          });
        }
      });
  });
};

const seedDatabase = async () => {
  await seedDisplayOptions();
  await seedBags();
  return true;
};

export default seedDatabase;
