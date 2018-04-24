import * as calculator from './FlightPathCalc';

describe('calcTurnSign', () => {
  it('should return 1 if hand is r', () => {
    const turnSign = calculator.calcTurnSign('R');
    expect(turnSign).toBe(1);
  });

  it('should return -1 if hand is not R', () => {
    const turnSign = calculator.calcTurnSign('L');
    expect(turnSign).toBe(-1);

    const turnSign2 = calculator.calcTurnSign();
    expect(turnSign2).toBe(-1);
  });
});

describe('calcFadeStart', () => {
  it('should return a value of .4', () => {
    const fade = calculator.calcFadeStart(1);
    expect(fade).toBe(0.4);
  });
});

describe('calcImpact', () => {
  it('should return a value of .0399999', () => {
    const impact = calculator.calcImpact(0.8);
    expect(impact).toBe(0.039999999999999994);
  });
});

describe('calcTurnEnd', () => {
  it('should return a value of .444', () => {
    const turnEnd = calculator.calcTurnEnd(1);
    expect(turnEnd).toBe(0.44000000000000006);
  });
});

describe('calcXAxisOrigin', () => {
  it('should return a value of 175', () => {
    const xAxis = calculator.calcXAxisOrigin(350);
    expect(xAxis).toBe(175);
  });
});

describe('calcDeltaV', () => {
  it('should return a value of .02', () => {
    const deltaV = calculator.calcDeltaV(2, 50);
    expect(deltaV).toBe(0.02);
  });
});

