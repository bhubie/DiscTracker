import React from 'react';
import PropTypes from 'prop-types';
import { colorToRGBA } from '../../Utils/Utils';
import { calcAdjustedHighSpeedTurn, calcAdjustedLowSpeedFade, calcTurnSign, calcFadeStart, calcImpact, calcTurnEnd, calcXAxisOrigin, calcDeltaV } from '../../Utils/FlightPathCalc';

const style = {
  margin: 'auto',
  gridArea: 'flightpath',
  width: '350px',
  height: '550px',
  maxHeight: '600px',
};

export default class FlightPath extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.flightPathContainer = React.createRef();
  }

  componentDidMount() {
    this.createCanvas(this.props.gridColor, this.props.gridLineColor);
    // window.addEventListener('resize', this.drawDiscs.bind(this));
  }

  componentDidUpdate() {
    this.drawDiscs();
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.drawDiscs.bind(this));
  }

  createCanvas(gridColor, gridLineColor) {
    this.drawGridLines(gridColor, gridLineColor);
  }

  drawDiscs() {
    this.drawGridLines(this.props.gridColor, this.props.gridLineColor);

    this.props.baggedDiscs.forEach((disc) => {
      if (disc.selected) {
        this.drawDiscPath(
          `${disc.manufacturer} ${disc.name}`,
          disc.distance,
          disc.hst,
          disc.lsf,
          disc.ns,
          1,
          disc.wear,
          disc.color,
          this.props.throwingStyle,
        );
      }
    });
  }

  drawDiscLie(color, xCoordinate, yCoordinate) {
    const pathContext = this.canvas.current.getContext('2d');
    pathContext.strokeStyle = colorToRGBA(color);
    pathContext.fillStyle = colorToRGBA(color);
    pathContext.beginPath();
    pathContext.arc(xCoordinate, yCoordinate, 2, 0, 2 * 3.1415926);
    pathContext.stroke();
    pathContext.fill();
  }

  drawGridLines(gridColor, gridLineColor) {
    const ctx = this.canvas.current.getContext('2d');
    const canvasHeight = parseInt(this.flightPathContainer.current.style.height, 10);
    const canvasWidth = parseInt(this.flightPathContainer.current.style.width, 10);

    this.canvas.current.width = canvasWidth;
    this.canvas.current.height = canvasHeight;

    ctx.fillStyle = colorToRGBA(gridColor);
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.lineWidth = 1.0;
    ctx.fillStyle = colorToRGBA(gridLineColor);
    ctx.strokeStyle = colorToRGBA(gridLineColor);

    let i;
    for (i = 0; i < canvasWidth; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.canvas.current.height);
      ctx.stroke();
    }

    // const xBlocks = this.state.GridHeight / this.state.GridBlockHeight;

    for (i = 0; i <= canvasHeight; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvasHeight, i);
      ctx.stroke();
      ctx.textAlign = 'left';
      ctx.fillText(` ${canvasHeight - i}'`, 0, i - 3);
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.floor((canvasHeight - i) / 3.33)}m `, canvasWidth, i - 3);
    }
  }

  drawDiscName(color, name, xCoordinate, yCoordinate) {
    const ctx = this.canvas.current.getContext('2d');
    ctx.textAlign = 'center';
    ctx.strokeStyle = colorToRGBA(color);
    ctx.fillStyle = colorToRGBA(color);
    ctx.fillText(name, xCoordinate, yCoordinate - 10);
  }

  drawDiscPath(
    name, distance, highSpeedTurn, lowSpeedFade,
    netStability, power, wear, color, hand,
  ) {
    const pathContext = this.canvas.current.getContext('2d');
    pathContext.strokeStyle = colorToRGBA(color);
    pathContext.lineWidth = 2;

    const yScale = 2.5;
    const xScale = 0.7;
    const turnSign = calcTurnSign(hand);
    const fadeStart = calcFadeStart(power);
    const impact = calcImpact(power);
    const turnEnd = calcTurnEnd(power);
    const discOriginXAxis = calcXAxisOrigin(this.canvas.current.width);
    const discOriginYAxis = this.canvas.current.height;
    // const scaledDiscDistance = yScale * distance;
    const deltav = calcDeltaV(yScale, distance);
    const adjustedHighSpeedTurn = calcAdjustedHighSpeedTurn(highSpeedTurn, distance, power);
    const adjustedLowSpeedFade = calcAdjustedLowSpeedFade(lowSpeedFade, power);

    let vx = 0.0;
    const vy = -1.0;
    let currentPathX = discOriginXAxis;
    let currentPathY = discOriginYAxis;
    let discCurrentPower = power;

    // iterate through the flight path
    do {
      const previousPathY = currentPathY;
      const previousPathX = currentPathX;
      currentPathY += vy;
      currentPathX += (vx * xScale);
      discCurrentPower -= deltav;

      if (discCurrentPower > turnEnd) {
        vx -= turnSign * (adjustedHighSpeedTurn / 14000) * (turnEnd / discCurrentPower);
      }

      if (discCurrentPower < fadeStart) {
        vx -= (turnSign * (adjustedLowSpeedFade / 4000) * (fadeStart - discCurrentPower)) / fadeStart;
      }

      if (discCurrentPower > 0.0) {
        pathContext.beginPath();
        pathContext.moveTo(previousPathX, previousPathY);
        pathContext.lineTo(currentPathX, currentPathY);
        pathContext.stroke();
      }
    } while (discCurrentPower > impact);

    this.drawDiscLie(color, currentPathX, currentPathY);
    this.drawDiscName(color, name, currentPathX, currentPathY);
  }
  render() {
    return (
      <div id="flightPathContainer" className="flightPathContainer" >
        <div id="flightPath" style={style} ref={this.flightPathContainer}>
          <canvas id="flightPath" ref={this.canvas} />
        </div>
      </div>
    );
  }
}

FlightPath.propTypes = {
  gridColor: PropTypes.objectOf(PropTypes.number).isRequired,
  gridLineColor: PropTypes.objectOf(PropTypes.string).isRequired,
  throwingStyle: PropTypes.string.isRequired,
  baggedDiscs: PropTypes.arrayOf(PropTypes.object).isRequired,
};
