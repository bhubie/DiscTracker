
import DisplayOptionsRepository from './index';
import { deleteTableContents, testDB } from '../../Utils/dbTestHelpers';

const displayOptionsRepository = new DisplayOptionsRepository(testDB);

const displayOptions = {
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

describe('DisplayOptionsRepository', () => {
  describe('Add', () => {
    it('should add in a record and return the ID of the new record', async () => {
      const id = await displayOptionsRepository.add(displayOptions);
      expect(id).toBe(1);
    });
  });

  describe('Update Hand', () => {
    it('should update stored hand with passed in hand value', async () => {
      const updateHand = {
        value: 'R',
      };

      const id = await displayOptionsRepository.add(displayOptions);
      const hand = await displayOptionsRepository.updateHand(id, updateHand);
      const dOptions = await displayOptionsRepository.getAll();

      expect(hand.value).toBe(dOptions[0].hand.value);
    });
  });
});

afterEach(() => {
  deleteTableContents('displayOptions');
});
