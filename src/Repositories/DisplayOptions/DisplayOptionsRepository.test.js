
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

  describe('Update Grid Color', () => {
    it('should update stored grid color with passed in grid color', async () => {
      const updatedGridColor = {
        r: '255',
        g: '255',
        b: '0',
        a: '1',
      };

      const id = await displayOptionsRepository.add(displayOptions);
      const gc = await displayOptionsRepository.updateGridColor(id, updatedGridColor);
      const dOptions = await displayOptionsRepository.getAll();

      expect(gc).toEqual(dOptions[0].gridColor);
    });
  });

  describe('Update Grid Line Color', () => {
    it('should update stored grid line color with passed in grid line color', async () => {
      const updatedGridLineColor = {
        r: '255',
        g: '255',
        b: '0',
        a: '1',
      };

      const id = await displayOptionsRepository.add(displayOptions);
      const gc = await displayOptionsRepository.updateGridLineColor(id, updatedGridLineColor);
      const dOptions = await displayOptionsRepository.getAll();

      expect(gc).toEqual(dOptions[0].gridLineColor);
    });
  });

  describe('Update Hand', () => {
    it('should update stored hand with passed in hand', async () => {
      const updateHand = {
        value: 'R',
      };

      const id = await displayOptionsRepository.add(displayOptions);
      const hand = await displayOptionsRepository.updateHand(id, updateHand);
      const dOptions = await displayOptionsRepository.getAll();

      expect(hand.value).toBe(dOptions[0].hand.value);
    });
  });

  describe('Get All', () => {
    it('should retrieve all reords from the display options table', async () => {
      await displayOptionsRepository.add(displayOptions);
      const dOptions = await displayOptionsRepository.getAll();

      expect(dOptions.length).toBe(1);
    });
  });
});

afterEach(() => {
  deleteTableContents('displayOptions');
});
