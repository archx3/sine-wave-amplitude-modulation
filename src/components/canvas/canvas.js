"use client";
import { useEffect, useRef, useState } from "react";
import { drawLine, getValueFromRangeMapping, paintBackground, setCanvasSize, stroke } from "./utils";
import useAppContext from "@/component/hooks/use-app";
import useImageDataContext from "@/component/hooks/use-image-data";

/**
 * Initializes the canvas by setting the size, painting the background, and setting the stroke color.
 *
 * @param {HTMLCanvasElement} PAPER - The canvas element on which to initialize the graphics context.
 * @param {function} callback - The callback function to execute after the canvas has been initialized.
 */
function initializeCanvas (PAPER, callback) {
  const PEN = PAPER.getContext("2d");
  const width = PAPER.clientWidth;
  const height = PAPER.clientHeight;

  setCanvasSize(PAPER, width, height);
  paintBackground(PEN, 0, 0, 0, 1, width, height);
  stroke(PEN, 255, 255, 255, 1);

  if (callback && typeof callback === 'function') {
    callback(PAPER, PEN);
  }
}

function drawWave ({ pen, firstPoint, y, color, frameCount, amplitude, width, G}) {
  let previousPoint = firstPoint;

  const PHASE = frameCount / 5; // or frameCount / 30, i.e. 30 frames per second
  const FREQUENCY = getValueFromRangeMapping(Math.sin(frameCount / 30), [-1, 1], [20, 200]);

  // we're going to draw a sine wave as long as the canvas is wide
  for (let x = 0; x < width; x++) {
    const ANGLE = getValueFromRangeMapping(x, [0, width], [0, Math.PI * 2]);
    const SIN_VALUE = Math.sin(PHASE + ANGLE * FREQUENCY); // adding a phase shift to the sine wave

    const point = { x, y: y + SIN_VALUE * getValueFromRangeMapping(G[Math.floor(y) * width + x], [0, 255], [0, amplitude,]) };

    drawLine(pen, previousPoint, point, color,);
    previousPoint = point;
  }
}

/**
 * Initializes the canvas by setting the size, painting the background, and setting the stroke color.
 *
 */
export default function Canvas () {
  const {
    WIDTH,
    HEIGHT,
    VERTICAL_DIVISIONS,
    VERTICAL_DIVISION_HEIGHT,
    FREQUENCY,
    MAX_AMPLITUDE,
    PHASE,

    FOREGROUND_COLOR,
    BACKGROUND_COLOR,
  } = useAppContext();

  const {G,} = useImageDataContext();

  const canvasRef = useRef(null);

  let frameCount = 0; // we need to track our animation over time the frames
  let animationFrameId = null; // we need to track the animation frame id, so we can cancel the animation frame when we're done

  const [state, setState] = useState({
    canvasInitialized: false,
  });

  const draw = function draw (PEN) {
    paintBackground(PEN, BACKGROUND_COLOR, WIDTH, HEIGHT);

    for (let div = 0; div < VERTICAL_DIVISIONS; div++) {
      const y = (VERTICAL_DIVISION_HEIGHT / 2) + div * VERTICAL_DIVISION_HEIGHT;
      drawWave({
        firstPoint: { x: 0, y: y },
        y: y,
        pen: PEN,
        color: FOREGROUND_COLOR,
        frameCount: frameCount,
        amplitude: MAX_AMPLITUDE,
        width: WIDTH,
        height: HEIGHT,
        G: G,
      });
    }
  }

  useEffect(() => {
    console.log("useEffect")
    const PAPER = canvasRef.current;
    const PEN = PAPER.getContext("2d");

    if (PAPER && !state.canvasInitialized) {
      initializeCanvas(PAPER, () => {
        setState({ ...state, canvasInitialized: true });
      });
    }

    const render = () => {
      frameCount++
      draw(PEN, frameCount)
      // animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw, state]);


  return (
    <canvas ref={canvasRef} className="canvas preview paper" id="paper"/>
  )
}
