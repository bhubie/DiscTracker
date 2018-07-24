import BagRepository from './index';
import { deleteTableContents, testDB } from '../../Utils/dbTestHelpers';

const bagRepository = new BagRepository(testDB);

const mockedBag = {
  name: 'Mocked Bag',
};

describe('Bag Repository', () => {
  describe('Add', () => {
    it('should add passed in record successfully', async () => {
      const id = await bagRepository.add(mockedBag);
      expect(id).toBe(1);
    });
  });

  describe('update name', () => {
    it('should update the name of the bag with the new passed in name', async () => {
      const updatedBagName = 'New Bag Name';
      const id = await bagRepository.add(mockedBag);
      const name = await bagRepository.updateName(id, updatedBagName);

      expect(name).toBe(updatedBagName);
    });
  });

  describe('get all', () => {
    it('should return all bags', async () => {
      const bag2 = {
        name: 'bag 2',
      };
      bagRepository.add(mockedBag);
      bagRepository.add(bag2);
      const bags = await bagRepository.getAll();

      expect(bags.length).toBe(2);
      expect(bags[0].name).toBe(mockedBag.name);
      expect(bags[1].name).toBe(bag2.name);
    });
  });
});


afterEach(() => {
  deleteTableContents('bag');
});

