import * as React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  wait,
  waitForElement,
} from '@testing-library/react'
import { DiscSelector } from './DiscSelector';
import { discService } from '../../Stores/Disc/DiscService';
import { of } from 'rxjs';
import { discStore, IDiscState, IDisc, DEFAULT_DISC_TYPES_TO_INCLUDE } from '../../Stores/Disc/DiscStore';
import sinon from 'sinon';


const mockDiscs: IDisc[] = [{
  _id: "5ae0c0d59049dd3d3a2c152e",
  dificulty: null,
  manufacturer: "Lightning",
  discWithManufacturer: 'Lightning - #2 Putter',
  name: "#2 Putter",
  type: "Putt & Approach",
  distance: 227,
  hst: -35,
  lsf: 17,
  net: -18
},
{
  _id: "5ae0c0d59049dd3d3a2c1531",
  dificulty: null,
  manufacturer: "Lightning",
  discWithManufacturer: 'Lightning - #2 Upshot',
  name: "#2 Upshot",
  type: "Mid-Range",
  distance: 247,
  hst: -18,
  lsf: 18,
  net: 0
},
{
  _id: "5ae0c0d59049dd3d3a2c152f",
  dificulty: null,
  manufacturer: "Lightning",
  discWithManufacturer: 'Fair way driver',
  name: "#2 Roller",
  type: "Fairway Driver",
  distance: 305,
  hst: -18,
  lsf: 56,
  net: 38
},
{
  _id: "5ae0c0d59049dd3d3a2c152f11",
  dificulty: null,
  manufacturer: "Lightning",
  discWithManufacturer: 'Distance Driver Mock',
  name: "#2 Roller",
  type: "Distance Driver",
  distance: 305,
  hst: -18,
  lsf: 56,
  net: 38
},];

describe('Disc Selector Component', () => {

  beforeEach(() => {
    
    //Update discs with mocked discs
    discStore.update((state: IDiscState) => ({
      discs: mockDiscs,
      ui: {
        discTypesToInclude: DEFAULT_DISC_TYPES_TO_INCLUDE
      }
    }));
      
    jest.spyOn(discService, 'fetchDiscs')
      .mockImplementation(() => of({discs: []}).subscribe());

  });

  afterEach(() => {
    cleanup();
  })

  it('Distance Driver Filter checkbox should be checked on page load', async () => {
      const { getByLabelText } = render(<DiscSelector />);
      expect(getByLabelText("Drivers")).toHaveProperty("checked", true);
  });

  it('Fairway Driver Filter checkbox should be checked on page load', async () => {
    const { getByLabelText } = render(<DiscSelector />);
    expect(getByLabelText("Fairway Drivers")).toHaveProperty("checked", true);
  });

  it('Mid Range Filter checkbox should be checked on page load', async () => {
    const { getByLabelText } = render(<DiscSelector />);
    expect(getByLabelText("Mid-Ranges")).toHaveProperty("checked", true);
  });

  it('Putter Filter checkbox should be checked on page load', async () => {
    const { getByLabelText } = render(<DiscSelector />);
    expect(getByLabelText("Putters")).toHaveProperty("checked", true);
  });

  test('When a user unchecks the putter filter, putters should be removed from the disc selector drop down', async () => {
    const { debug, getByText, getByLabelText, getByTestId } = render(<DiscSelector />);

    fireEvent.click(getByText("Putters"));

    //Verify checkbox is unchecked
    expect(getByLabelText("Putters")).toHaveProperty("checked", false);

    //Verify drop down does not contain putters
    const discDropDownCount = mockDiscs.filter(disc => disc.type !== 'Putt & Approach').length + 1;

    expect(getByTestId('disc-selector-dropdown').children.length).toBe(discDropDownCount);
  });

  test('When a user unchecks the mid-range filter, mid-ranges should be removed from the disc selector drop down', async () => {
    const { getByText, getByTestId, debug } = render(<DiscSelector />);

    fireEvent.click(getByTestId('includeMidCheckbox'));

    //Verify checkbox is unchecked
    expect(getByTestId('includeMidCheckbox')).toHaveProperty("checked", false);

    //Verify drop down does not contain putters
    const discDropDownCount = mockDiscs.filter(disc => disc.type !== 'Mid-Range').length + 1;
    expect(getByTestId('disc-selector-dropdown').children.length).toBe(discDropDownCount);
  });

  test('When a user checks the fairway driver filter, fairway drivers should be removed from the disc selector drop down', async () => {
    const { getByText, getByTestId, debug } = render(<DiscSelector />);

    fireEvent.click(getByTestId('includeFairwayCheckbox'));

    //Verify checkbox is unchecked
    expect(getByTestId('includeFairwayCheckbox')).toHaveProperty("checked", false);

    //Verify drop down does not contain putters
    const discDropDownCount = mockDiscs.filter(disc => disc.type !== 'Fairway Driver').length + 1;
    expect(getByTestId('disc-selector-dropdown').children.length).toBe(discDropDownCount);
  });
})