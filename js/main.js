const PAPER = document.getElementById('paper');
const PEN = PAPER.getContext('2d');

const GRG_IN_SF = document.getElementById('grg-in-sf');

const { width : IMAGE_WIDTH, height : IMAGE_HEIGHT } = GRG_IN_SF;

const VERTICAL_DIVISIONS = 20;
const VERTICAL_DIVISION_HEIGHT = IMAGE_HEIGHT / VERTICAL_DIVISIONS;

function initializeCanvas (image) {
  const { width, height } = image;
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

let time = 0; // we need to track our animation over time the frames

const draw = function draw () {
  paintBackground(PEN, 255, 255, 255, 1, IMAGE_WIDTH, IMAGE_HEIGHT);
  /*let previousPoint = { x: -1, y: IMAGE_HEIGHT / 2 };

  // we're going to draw a sine wave as long as the canvas is wide
  for (let x = 0; x < IMAGE_WIDTH; x++) {
    const FREQUENCY = 100;
    const ANGLE = mapRange(x, 0, IMAGE_WIDTH, 0, Math.PI * 2);

    const MAX_AMPLITUDE = IMAGE_HEIGHT / 10;
    // const MODULATED_AMPLITUDE = mapRange(x, 0, IMAGE_WIDTH, 0, MAX_AMPLITUDE);
    const MODULATED_AMPLITUDE = mapRange(Math.sin(ANGLE * FREQUENCY / 7), -1, 1, 0, MAX_AMPLITUDE);

    const PHASE = time / 25; // or frameCount / 30, i.e. 30 frames per second

    // const SIN_VALUE = Math.sin(ANGLE * FREQUENCY);
    const SIN_VALUE = Math.sin(PHASE + ANGLE * FREQUENCY); // adding a phase shift to the sine wave

    const y = IMAGE_HEIGHT / 2 + SIN_VALUE * MODULATED_AMPLITUDE;

    const point = { x, y };
    drawLine(PEN, previousPoint, point);
    previousPoint = point;

  }

  time++;*/

  for (let div = 0; div < VERTICAL_DIVISIONS; div++) {
    // const y = (VERTICAL_DIVISION_HEIGHT / 2) + div * VERTICAL_DIVISION_HEIGHT;
    const y = div * VERTICAL_DIVISION_HEIGHT;
    drawLine(PEN, { x : 0, y }, { x : IMAGE_WIDTH, y });
  }

  // requestAnimationFrame(draw);
}

GRG_IN_SF.addEventListener('load', () => {
  const {
    PIXEL_CANVAS,
    PIXEL_BRUSH,
    IMAGE_DATA,
    PIXELS,
    COMPRESSED_PIXELS
  } = createShadowCanvasFromImage(GRG_IN_SF);

  initializeCanvas({ width : IMAGE_WIDTH, height : IMAGE_HEIGHT });



  draw();
});



