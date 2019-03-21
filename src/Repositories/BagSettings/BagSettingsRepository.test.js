import BagSettingsRepository from './index';
import { deleteTableContents, testDB } from '../../Utils/dbTestHelpers';

const bagSettingsRepository = new BagSettingsRepository(testDB);

const mockedBagSettings = {
  hiddenColumns: ['Disc Color'],
};

describe('Bag Settings Repository', () => {
  describe('Add', () => {
    it('should add passed in record successfully', async () => {
      const bagSetting = await bagSettingsRepository.add(mockedBagSettings);
      expect(bagSetting.id).toBe(1);
    });
  });

  describe('add Hidden Column', () => {
    it('should update the existing hidden column array with the passed in hidden column', async () => {
      const newHiddenColumn = 'Test';
      const bagSetting = await bagSettingsRepository.add(mockedBagSettings);
      await bagSettingsRepository.addHiddenColumn(bagSetting.id, newHiddenColumn);

      const setting = await bagSettingsRepository.getAll();

      expect(setting[0].hiddenColumns[0]).toBe('Disc Color');
      expect(setting[0].hiddenColumns[1]).toBe('Test');
    });
  });

  describe('delete hidden column', () => {
    it('should delete a hidden column successfully', async () => {
      bagSettingsRepository.add(mockedBagSettings);
      const bags = await bagSettingsRepository.getAll();
      await bagSettingsRepository.deleteHiddenColumn(bags[0].id, 'Disc Color');

      const newHiddenColumns = await bagSettingsRepository.getAll();
      expect(newHiddenColumns[0].hiddenColumns.length).toBe(0);
    });
  });
});


afterEach(() => {
  deleteTableContents('bagSettings');
});

