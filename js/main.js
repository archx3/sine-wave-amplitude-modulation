const PAPER = document.getElementById('paper');
const PEN = PAPER.getContext('2d');

const colors = [
  "#8D83EF", // 0
  "#AE69F0", // 1
  "#D46FF1",
  "#DB5AE7", // 3
  "#D911DA",
  "#D601CB", // 5
  "#E713BF",
  "#F24CAE", // 7
  "#FB79AB",
  "#FFB6C1", // 9
  "#D0E7F5",
  "#D9E7F4",
  "#D6E3F4",
  "#BCDFF5",
  "#B7D9F4",
  "#C3D4F0",
  "#9DC1F3",
  "#9AA9F4",
  "#FED2CF",
  "#FDDFD5",
  "#FEDCD1"
];

function clamp (value, min = 0, max = 1.0) {
  return Math.min(Math.max(value, min), max);
}

const GRG_IN_SF = document.getElementById('grg-in-sf');

const { width : IMAGE_WIDTH, height : IMAGE_HEIGHT } = GRG_IN_SF;
const WIDTH = PAPER.clientWidth;
const HEIGHT = PAPER.clientHeight;

const VERTICAL_DIVISIONS = 30;
const VERTICAL_DIVISION_HEIGHT = HEIGHT / VERTICAL_DIVISIONS ;
const FREQUENCY = 50;
const MAX_AMPLITUDE = VERTICAL_DIVISION_HEIGHT;


const GRADIENT = PEN.createLinearGradient(0, 0, WIDTH, 0);
GRADIENT.addColorStop(0, colors[0]);
GRADIENT.addColorStop(1, colors[7]);

const NUMBER_OF_STOPS = 10;
for (let i = 0; i < NUMBER_OF_STOPS; i++) {
  GRADIENT.addColorStop(clamp(10 / (NUMBER_OF_STOPS * i)), colors[i]);
}

function initializeCanvas (image) {
  const width = PAPER.clientWidth,
    height= PAPER.clientHeight;

  setCanvasSize(PAPER, width, height);
  paintBackground(PEN, 255, 255, 255, 1, width, height);
  stroke(PEN, 0, 0, 0, 1);
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

  return { PIXEL_CANVAS, PIXEL_BRUSH, IMAGE_DATA, PIXELS, COMPRESSED_PIXELS };
}


function drawWave (firstPoint, y) {
  let previousPoint = firstPoint;
  // we're going to draw a sine wave as long as the canvas is wide
  for (let x = 0; x < WIDTH; x++) {
    const ANGLE = mapRange(x, 0, WIDTH, 0, Math.PI * 2);

    // const MAX_AMPLITUDE = IMAGE_HEIGHT / 10;
    // const MODULATED_AMPLITUDE = mapRange(x, 0, IMAGE_WIDTH, 0, MAX_AMPLITUDE);
    const MODULATED_AMPLITUDE = MAX_AMPLITUDE;
    // const MODULATED_AMPLITUDE = mapRange(Math.sin(ANGLE * FREQUENCY / 7), -1, 1, 0, MAX_AMPLITUDE);

    const PHASE = time / 5; // or frameCount / 30, i.e. 30 frames per second

    // const SIN_VALUE = Math.sin(ANGLE * FREQUENCY);
    const SIN_VALUE = Math.sin(PHASE + ANGLE * FREQUENCY); // adding a phase shift to the sine wave

    // const y = IMAGE_HEIGHT / 2 + SIN_VALUE * MODULATED_AMPLITUDE;

    const point = { x, y : y + SIN_VALUE * MODULATED_AMPLITUDE};

    // let's create a linear gradient from the left to the right and add random stops based on modulated amplitude


    // drawLine(PEN, previousPoint, point, GRADIENT);
    drawLine(PEN, previousPoint, point);
    previousPoint = point;

  }
}

let time = 0; // we need to track our animation over time the frames
const draw = function draw () {
  paintBackground(PEN, 255, 255, 255, 1, WIDTH, HEIGHT);
  let previousPoint = { x: -1, y: HEIGHT / 2 };

  drawWave( previousPoint);



  for (let div = 0; div < VERTICAL_DIVISIONS; div++) {
    const y = (VERTICAL_DIVISION_HEIGHT / 2) + div * VERTICAL_DIVISION_HEIGHT;
    // const y = div * VERTICAL_DIVISION_HEIGHT;
    // let FIRST_POINT = { x: -1, y };

    drawWave(Object.assign({}, { x: -1, y }), y);
    // drawLine(PEN, { x : 0, y }, { x : WIDTH, y });
  }

  time++;
  // requestAnimationFrame(draw);
}

function init () {

  const {
  PIXEL_CANVAS,
  PIXEL_BRUSH,
  IMAGE_DATA,
  PIXELS,
  COMPRESSED_PIXELS
} = createShadowCanvasFromImage(GRG_IN_SF);

  initializeCanvas({ width : WIDTH, height : HEIGHT });

  draw();
}

// GRG_IN_SF.addEventListener('load', () => {});

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    init();
  }
});




