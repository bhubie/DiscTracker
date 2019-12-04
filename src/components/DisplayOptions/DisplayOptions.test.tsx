import * as React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  wait,
  waitForElement,
} from '@testing-library/react';
import { DisplayOptions } from './DisplayOptions';



describe('Display Options Component', () => {
    afterEach(() => {
        cleanup();
    });

    test('When a User clicks throwing style of left hand LHBH button should be selected', async () => {
        
        const { getByTestId } = render(<DisplayOptions />);


        fireEvent.click(getByTestId('button-left'));

        expect(getByTestId('button-left').className.includes('is-selected')).toBe(true);
    });

    test('When a User clicks throwing style of right hand RHBH button should be selected', async () => {
        
        const { getByTestId } = render(<DisplayOptions />);


        fireEvent.click(getByTestId('button-right'));

        expect(getByTestId('button-right').className.includes('is-selected')).toBe(true);
    });
})