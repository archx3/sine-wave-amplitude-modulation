const MODULATED_AMPLITUDE = MAX_AMPLITUDE;

function drawWave (firstPoint, y) {
  let previousPoint = firstPoint;
  // we're going to draw a sine wave as long as the canvas is wide
  for (let x = 0; x < WIDTH; x++) {
    const ANGLE = mapRange(x, 0, WIDTH, 0, Math.PI * 2);

    // const MAX_AMPLITUDE = IMAGE_HEIGHT / 10;
    // const MODULATED_AMPLITUDE = mapRange(x, 0, IMAGE_WIDTH, 0, MAX_AMPLITUDE);
    const MODULATED_AMPLITUDE = MAX_AMPLITUDE;
    // const MODULATED_AMPLITUDE = mapRange(Math.sin(ANGLE * FREQUENCY / 7), -1, 1, 0, MAX_AMPLITUDE);

    // const PHASE = time / 5; // or frameCount / 30, i.e. 30 frames per second

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
