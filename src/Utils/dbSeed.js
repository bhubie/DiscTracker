import db from '../db.ts';
import { displayOptionsRepository } from '../Repositories/DisplayOptions/DisplayOptionsRepository.ts';
import BagRepository from '../Repositories/Bag';
import BagSettingsRepository from '../Repositories/BagSettings';

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
const defaultBagSettings = { hiddenColumns: [] };


// eslint-disable-next-line arrow-body-style
const seedDisplayOptions = () => {
  return new Promise((resolve) => {
    displayOptionsRepository.getAll()
      .then((results) => {
        if (results.length > 0) {
          resolve(true);
        } else {
          displayOptionsRepository.add(defaultDisplayOptions).then(() => {
            resolve(true);
          });
        }
      });
  });
};

const seedBagSettings = () => {
  const bagSettingsRepository = new BagSettingsRepository(db);

  return new Promise((resolve) => {
    bagSettingsRepository.getAll()
      .then((results) => {
        if (results.length > 0) {
          resolve(true);
        } else {
          bagSettingsRepository.add(defaultBagSettings).then(() => {
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
  await seedBagSettings();
  return true;
};

export default seedDatabase;
