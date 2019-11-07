import * as React from 'react';
import { useFlightPathFacade } from '../../Hooks/useFlightPathFacade';
import { colorToRGBA } from '../../Utils/Utils';
import { calcTurnSign, calcFadeStart, calcImpact, calcTurnEnd, calcXAxisOrigin, calcDeltaV, calcAdjustedHighSpeedTurn, calcAdjustedLowSpeedFade } from '../../Utils/FlightPathCalc';


export const FlightPath: React.FC<{}> = () => {


    const { discs, gridColor, gridLineColor, throwingStyle } = useFlightPathFacade();
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const flightPathContainer = React.useRef<HTMLDivElement>(null);

    const style = {
        margin: 'auto',
        gridArea: 'flightpath',
        width: '350px',
        height: '550px',
        maxHeight: '600px',
      };

      //Draw Background:
      React.useEffect(() => {
        if(canvas.current !== null && flightPathContainer.current !== null) {
            const ctx = canvas.current.getContext('2d');
    
            const canvasHeight = flightPathContainer.current.style.height !== null ? parseInt(flightPathContainer.current.style.height, 10) : 550;
            const canvasWidth = flightPathContainer.current.style.width !== null ? parseInt(flightPathContainer.current.style.width, 10): 350;
    
    
            canvas.current.width = canvasWidth;
            canvas.current.height = canvasHeight;
    
            if(ctx !== null) {
                ctx.fillStyle = colorToRGBA(gridColor);
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                ctx.lineWidth = 1.0;
                ctx.fillStyle = colorToRGBA(gridLineColor);
                ctx.strokeStyle = colorToRGBA(gridLineColor);
    
                for (let i = 0; i < canvasWidth; i += 50) {
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, canvas.current.height);
                    ctx.stroke();
                }
    
                for (let i = 0; i <= canvasHeight; i += 50) {
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
            
          }
      }, [gridColor, gridLineColor]);

    if(canvas.current !== null && flightPathContainer.current !== null) {
        const ctx = canvas.current.getContext('2d');

        const canvasHeight = flightPathContainer.current.style.height !== null ? parseInt(flightPathContainer.current.style.height, 10) : 550;
        const canvasWidth = flightPathContainer.current.style.width !== null ? parseInt(flightPathContainer.current.style.width, 10): 350;


        canvas.current.width = canvasWidth;
        canvas.current.height = canvasHeight;

        if(ctx !== null) {
            ctx.fillStyle = colorToRGBA(gridColor);
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.lineWidth = 1.0;
            ctx.fillStyle = colorToRGBA(gridLineColor);
            ctx.strokeStyle = colorToRGBA(gridLineColor);

            for (let i = 0; i < canvasWidth; i += 50) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.current.height);
                ctx.stroke();
            }

            for (let i = 0; i <= canvasHeight; i += 50) {
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
        
      }

      React.useLayoutEffect(() => {
          //Draw Discs
      discs.forEach((disc, index) => {

        if(canvas.current !== null && disc.discInformation !== undefined && disc.discInformation !== null) {
            const ctx = canvas.current.getContext('2d');
            const { hst, lsf, distance } = disc.discInformation;
            if(ctx !== null) {
                ctx.strokeStyle = colorToRGBA(disc.color);
                ctx.lineWidth = 2;
                //ctx.beginPath();

                const power = 1;
                const yScale = 2.5;
                const xScale = 0.7;
                const turnSign = calcTurnSign(throwingStyle.value); //TODO Fix and pass in Hand!
                const fadeStart = calcFadeStart(power);
                const impact = calcImpact(power);
                const turnEnd = calcTurnEnd(power);
                const discOriginXAxis = calcXAxisOrigin(canvas.current.width);
                const discOriginYAxis = canvas.current.height;
                // const scaledDiscDistance = yScale * distance;
                const deltav = calcDeltaV(yScale, distance);
                const adjustedHighSpeedTurn = calcAdjustedHighSpeedTurn(hst, distance, power);
                const adjustedLowSpeedFade = calcAdjustedLowSpeedFade(lsf, power);

                let vx = 0.0;
                const vy = -1.0;
                let currentPathX = discOriginXAxis;
                let currentPathY = discOriginYAxis;
                let discCurrentPower = power;

                // iterate through the flight path
                do {
                    const previousPathY = currentPathY;
                    const previousPathX = currentPathX;
                    //console.log(previousPathX + ' ' + previousPathY)
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
                        ctx.beginPath();
                        ctx.moveTo(previousPathX, previousPathY);
                        ctx.lineTo(currentPathX, currentPathY);
                        ctx.stroke();
                    }
                } while (discCurrentPower > impact);
                
                //Draw Disc Lie
                ctx.strokeStyle = colorToRGBA(disc.color);
                ctx.fillStyle = colorToRGBA(disc.color);
                ctx.beginPath();
                ctx.arc(currentPathX, currentPathY, 2, 0, 2 * 3.1415926);
                ctx.stroke();
                ctx.fill();

                //Draw Disc Name
                ctx.textAlign = 'center';
                ctx.strokeStyle = colorToRGBA(disc.color);
                ctx.fillStyle = colorToRGBA(disc.color);
                ctx.fillText(disc.discInformation.discWithManufacturer, currentPathX, currentPathY - 10);
            }
        }
      })
      })
      

     
   

      

    return (
        <div id="flightPathContainer" className="flightPathContainer" >
            <div id="flightPath" style={style} ref={flightPathContainer}>
                <canvas id="flightPath" ref={canvas} />
            </div>
        </div>
    );
}