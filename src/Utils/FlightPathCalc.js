const calcAdjustedHighSpeedTurn = (highSpeedTurn, distance, power) => {
  let effectiveHighSpeedTurn = highSpeedTurn - (distance / 100);

  if (power > 0.8) {
    let op = (power - 0.8) / 0.4;
    op *= op * 2;
    const dc = Math.max(0.0, (350 - distance)) / 10.0;
    // emphasize high-speed turn on sub-350ft discs
    effectiveHighSpeedTurn -= op * dc;
  }
  effectiveHighSpeedTurn *= power * power * power * power;

  return effectiveHighSpeedTurn;
};

const calcAdjustedLowSpeedFade = (lowSpeedFade, power) => lowSpeedFade * (1.0 / (power * power));

const calcTurnSign = hand => ((hand === 'R') ? 1.0 : -1.0);

const calcFadeStart = power => ((1.0 - (power * power)) * 0.3) + 0.4;
// return 0.4 + (1.0 - power * power) * 0.3;

const calcImpact = power => (1.0 - power) / 5;

const calcTurnEnd = power => 0.8 - (power * power * 0.36);

const calcXAxisOrigin = width => width / 2;

const calcDeltaV = (yScale, distance) => yScale / (yScale * distance);


export {
  calcAdjustedHighSpeedTurn,
  calcAdjustedLowSpeedFade,
  calcTurnSign,
  calcFadeStart,
  calcImpact,
  calcTurnEnd,
  calcXAxisOrigin,
  calcDeltaV,
};
