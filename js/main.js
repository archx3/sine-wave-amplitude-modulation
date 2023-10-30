const PAPER = document.getElementById('paper');
const PEN = PAPER.getContext('2d');

const GRG_IN_SF = document.getElementById('grg-in-sf');

const { width : IMAGE_WIDTH, height : IMAGE_HEIGHT } = GRG_IN_SF;

function initializeCanvas (image) {
  const { width, height } = image;
  setCanvasSize(PAPER, width, height);
  paintBackground(PEN, 255, 255, 255, 1, width, height);
  stroke(PEN, 0, 0, 0, 1);
}

function createShadowCanvasFromImage (image) {
  const PIXEL_CANVAS = document.createElement('canvas');
  PIXEL_CANVAS.width = image.width;
  PIXEL_CANVAS.height = image.height;
  const PIXEL_BRUSH = PIXEL_CANVAS.getContext('2d');

  PIXEL_BRUSH.drawImage(image, 0, 0, image.width, image.height);
  const IMAGE_DATA = PIXEL_BRUSH.getImageData(0, 0, image.width, image.height);
  const PIXELS = IMAGE_DATA.data;

  return { PIXEL_CANVAS, PIXEL_BRUSH, IMAGE_DATA, PIXELS };
}

const draw = function draw () {
  let previousPoint = { x: -1, y: IMAGE_HEIGHT / 2 };

  // we're going to draw a sine wave as long as the canvas is wide
  for (let x = 0; x < IMAGE_WIDTH; x++) {
    const FREQUENCY = 2;
    const ANGLE = mapRange(x, 0, IMAGE_WIDTH, 0, Math.PI * 2);
    const SIN = Math.sin(ANGLE * FREQUENCY);
    const AMPLITUDE = height / 2;

    const y = Math.floor(SIN * AMPLITUDE + IMAGE_HEIGHT / 2);

    const point = { x, y };
    drawLine(PEN, previousPoint, point);
    previousPoint = point;
  }

  requestAnimationFrame(() => draw());
}

GRG_IN_SF.addEventListener('load', () => {
  const {
    PIXEL_CANVAS,
    PIXEL_BRUSH,
    IMAGE_DATA,
    PIXELS
  } = createShadowCanvasFromImage(GRG_IN_SF);



  initializeCanvas({ width : IMAGE_WIDTH, height : IMAGE_HEIGHT });

  draw();
});



