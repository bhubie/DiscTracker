import BagRepository from './index';
import { deleteTableContents, testDB } from '../../Utils/dbTestHelpers';

const bagRepository = new BagRepository(testDB);

const mockedBag = {
  name: 'Mocked Bag',
};

describe('Bag Repository', () => {
  describe('Add', () => {
    it('should add passed in record successfully', async () => {
      const bag = await bagRepository.add(mockedBag);
      expect(bag.id).toBe(1);
    });
  });

  describe('update name', () => {
    it('should update the name of the bag with the new passed in name', async () => {
      const updatedBagName = 'New Bag Name';
      const bag = await bagRepository.add(mockedBag);
      const name = await bagRepository.updateName(bag.id, updatedBagName);

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

  describe('delete', () => {
    it('should delete a record successfully', async () => {
      bagRepository.add(mockedBag);
      const bags = await bagRepository.getAll();
      await bagRepository.deleteBag(bags[0].id);
      
      const newBags = await bagRepository.getAll();
      expect(newBags.length).toBe(0);
    });
  });
});


afterEach(() => {
  deleteTableContents('bag');
});

