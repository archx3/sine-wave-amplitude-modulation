



function clamp (value, min = 0, max = 1.0) {
  return Math.min(Math.max(value, min), max);
}

// const GRG_IN_SF = document.getElementById('grg-in-sf');

// const { width : IMAGE_WIDTH, height : IMAGE_HEIGHT } = GRG_IN_SF;
const WIDTH = 800;
const HEIGHT = 800;

let FOREGROUND_COLOR = '#fff';
let BACKGROUND_COLOR = '#000';

let VERTICAL_DIVISIONS = 60;
const VERTICAL_DIVISION_HEIGHT = HEIGHT / VERTICAL_DIVISIONS ;
const FREQUENCY = 150;
const MAX_AMPLITUDE = VERTICAL_DIVISION_HEIGHT / 3;
let G;

let time = 0; // we need to track our animation over time the frames
const PHASE = time / 5; // or frameCount / 30, i.e. 30 frames per second

// region creating gradient
const GRADIENT = PEN.createLinearGradient(0, 0, WIDTH, 0);
GRADIENT.addColorStop(0, colors[0]);
GRADIENT.addColorStop(1, colors[7]);

const NUMBER_OF_STOPS = 10;
for (let i = 0; i < NUMBER_OF_STOPS; i++) {
  GRADIENT.addColorStop(clamp(10 / (NUMBER_OF_STOPS * i)), colors[i]);
}

// endregion

function initializeCanvas (image) {
  const width = PAPER.clientWidth,
    height= PAPER.clientHeight;

  setCanvasSize(PAPER, width, height);
  paintBackground(PEN, 0, 0, 0, 1, width, height);
  stroke(PEN, 255, 255, 255, 1);
}

function createShadowCanvasFromImage (image) {
  const { width, height } = image;

  const PIXEL_CANVAS = document.createElement('canvas');
  PIXEL_CANVAS.width = width;
  PIXEL_CANVAS.height = height;
  const PIXEL_BRUSH = PIXEL_CANVAS.getContext('2d');

  PIXEL_BRUSH.drawImage(image, 0, 0, width, height);
  const IMAGE_DATA = PIXEL_BRUSH.getImageData(0, 0, width, height);
  const PIXELS = IMAGE_DATA.data; // Uint8ClampedArray have a range of 0-255; just like rgba values

  const COMPRESSED_PIXELS = Array.from({ length : width * height }, (_, i) => {
    const pixelIndex = i * 4;

    const r = PIXELS[pixelIndex];
    const g = PIXELS[pixelIndex + 1];
    const b = PIXELS[pixelIndex + 2];

    // this averages the rgb values which is more like the grayscale value of the color but no necessarily the grayscale value the human eye perceives
    return (r + g + b) / 3;
  });
  G = COMPRESSED_PIXELS;

  return { PIXEL_CANVAS, PIXEL_BRUSH, IMAGE_DATA, PIXELS, COMPRESSED_PIXELS };
}


function drawWave (firstPoint, y) {
  let previousPoint = firstPoint;
  // Object.assign(previousPoint, firstPoint);
  const PHASE = time / 5; // or frameCount / 30, i.e. 30 frames per second
  const FREQUENCY = getValueFromRangeMapping(Math.sin(time / 30), [-1, 1], [20, 200]);
  // we're going to draw a sine wave as long as the canvas is wide
  for (let x = 0; x < WIDTH; x++) {
    const ANGLE = getValueFromRangeMapping(x, [0, WIDTH], [0, Math.PI * 2]);
    const SIN_VALUE = Math.sin(PHASE + ANGLE * FREQUENCY); // adding a phase shift to the sine wave

    const grayScaleIndex = Math.floor(y) * WIDTH + x
    const grayValue = G[grayScaleIndex];

    // console.log( grayScaleIndex, )
    const AMPLITUDE = getValueFromRangeMapping(grayValue, [0, 255], [ 0, MAX_AMPLITUDE,]);
    // const _AMPLITUDE = mapRange(grayScaleIndex, 0, 255, MAX_AMPLITUDE, 0);
    const MODULATED_AMPLITUDE = getValueFromRangeMapping(Math.sin(ANGLE * FREQUENCY / 7), [-1, 1], [0, MAX_AMPLITUDE]);

    // const MODULATED_AMPLITUDE = 0;
    const point = { x, y : y + SIN_VALUE * AMPLITUDE};

    drawLine(PEN, previousPoint, point, FOREGROUND_COLOR, );
    previousPoint = point;

  }
}


const draw = function draw () {
  paintBackground(PEN, BACKGROUND_COLOR, WIDTH, HEIGHT);

  for (let div = 0; div < VERTICAL_DIVISIONS; div++) {
    const y = (VERTICAL_DIVISION_HEIGHT / 2) + div * VERTICAL_DIVISION_HEIGHT;
    // console.log({ y })
    drawWave({ x: -1, y }, y);
  }

  time++;
  requestAnimationFrame(draw);
}

function init () {

  const IMAGE = new Image();
  IMAGE.src = 'img/grg-in-osu.jpg';

  IMAGE.onload = () => {
    createShadowCanvasFromImage(IMAGE);

    initializeCanvas({ width : WIDTH, height : HEIGHT });

    draw();
  }
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    init();
  }
});
