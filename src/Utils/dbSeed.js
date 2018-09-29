import db from '../db';
import DisplayOptionsRepository from '../Repositories/DisplayOptions';

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

const seedDatabase = async () => {
  const isDisplayOptionsSeeded = await seedDisplayOptions();
  return isDisplayOptionsSeeded;
};

export default seedDatabase;
