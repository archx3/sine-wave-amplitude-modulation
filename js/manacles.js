/*(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    'use strict';*/

function _toConsumableArray (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

var poly = function poly (x, y, sides, r) {
  var points = [];
  for (var i = 0; i < sides; i++) {
    var X = x + Math.cos(Math.PI * 2 / sides * i) * r;
    var Y = y + Math.sin(Math.PI * 2 / sides * i) * r;
    points.push([X, Y]);
  }
  return points;
};

/**
 * Sets the size of the canvas.
 *
 * @param {Element} paper - The canvas element.
 * @param {number} w - The desired width of the canvas.
 * @param {number} h - The desired height of the canvas.
 */
const setCanvasSize = function setCanvasSize (paper, w, h) {
  paper.setAttribute('width', w);
  paper.setAttribute('height', h);
};

var fill = function fill (ctx) {
  var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var g = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var b = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 255;

  ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
};

var noFill = function noFill (ctx) {
  fill(ctx, 0, 0, 0, 0);
};

/**
 * Fill the canvas context with a specified background color.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} [r=0] - The red component of the background color (0-255).
 * @param {number} [g=0] - The green component of the background color (0-255).
 * @param {number} [b=0] - The blue component of the background color (0-255).
 * @param {number} [a=255] - The alpha component of the background color (0-255).
 * @param {number} [w=500] - The width of the canvas context.
 * @param {number} [h=500] - The height of the canvas context.
 */
const paintBackground = function paintBackground (ctx, r = 0, g = 0, b = 0, a = 255, w = 500, h = 500) {
  fill(ctx, r, g, b, a);
  ctx.fillRect(0, 0, w, h);
};

/**
 * Sets the stroke style of the provided context with the specified RGBA color values.
 *
 * @param {CanvasRenderingContext2D} ctx - The rendering context to set the stroke style for.
 * @param {number} [r=0] - The red component of the stroke color (between 0 and 255).
 * @param {number} [g=0] - The green component of the stroke color (between 0 and 255).
 * @param {number} [b=0] - The blue component of the stroke color (between 0 and 255).
 * @param {number} [a=255] - The alpha transparency value of the stroke color (between 0 and 255).
 * @returns {void}
 *
 * @example
 * stroke(ctx);                        // Sets the stroke color to black (0, 0, 0, 255)
 * stroke(ctx, 255, 0, 0, 128);         // Sets the stroke color to semi-transparent red (255, 0, 0, 128)
 * stroke(ctx, 0, 0, 255);              // Sets the stroke color to blue (0, 0, 255, 255)
 **/
var stroke = function stroke (ctx, r = 0, g = 0, b = 0, a = 255) {
  ctx.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
  ctx.beginPath();
  ctx.stroke();
  console.log(ctx.strokeStyle);

};

var noStroke = function noStroke (ctx) {
  stroke(ctx, 0, 0, 0, 0);
};

var strokeWeight = function strokeWeight (ctx, weight) {
  ctx.lineWidth = weight;
};

// var line = function line (pen, v, v2) {
//   pen.beginPath();
//   pen.moveTo.apply(pen, _toConsumableArray(v));
//   pen.lineTo.apply(pen, _toConsumableArray(v2));
//   pen.stroke();
//   pen.closePath();
// };

/**
 * Draws a line between two points on a given canvas using the provided pen.
 *
 * @param {CanvasRenderingContext2D} pen - The pen used to draw the line.
 * @param {Object} pointA - The starting point of the line.
 * @param {number} pointA.x - The x-coordinate of point A.
 * @param {number} pointA.y - The y-coordinate of point A.
 * @param {Object} pointB - The ending point of the line.
 * @param {number} pointB.x - The x-coordinate of point B.
 * @param {number} pointB.y - The y-coordinate of point B.
 * @param {string} [color='#000'] - The color of the line in CSS color format.
 * @param {number} [lineWidth=1] - The width of the line in pixels.
 *
 * @return {void}
 */
function drawLine (pen, pointA, pointB, color = '#000', lineWidth = 1) {
  pen.strokeStyle = color;
  pen.lineWidth = lineWidth;
  pen.beginPath();
  pen.moveTo(pointA.x, pointA.y);
  pen.lineTo(pointB.x, pointB.y);
  pen.stroke();
}

var ellipse = function ellipse (ctx, v, rx) {
  var ry = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : rx;
  var oa = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var sa = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var ea = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Math.PI * 2;

  ctx.beginPath();
  ctx.ellipse.apply(ctx, _toConsumableArray(v).concat([rx, ry, oa, sa, ea, false]));
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};

/**
 * Draws an arc on the canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number[]} v - The center coordinates of the arc [x, y].
 * @param {number} r - The radius of the arc.
 * @param {number} sa - The starting angle of the arc in radians. Default is 0.
 * @param {number} ea - The ending angle of the arc in radians. Default is 2 * PI.
 */
const arc = function arc (ctx, v, r, sa = 0, ea = Math.PI * 2) {
  ctx.beginPath();
  ctx.arc.apply(ctx, _toConsumableArray(v).concat([r, sa, ea, false]));
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};

var drawPoly = function drawPoly (ctx, ps) {
  ctx.beginPath();
  ctx.moveTo.apply(ctx, _toConsumableArray(ps[0]));
  for (var i = 1; i < ps.length; i++) {
    ctx.lineTo.apply(ctx, _toConsumableArray(ps[i]));
  }
  ctx.lineTo.apply(ctx, _toConsumableArray(ps[0]));
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var rect = function rect (ctx, pos, w, h) {
  ctx.beginPath();
  ctx.fillRect.apply(ctx, _toConsumableArray(pos).concat([w, h]));
  ctx.rect.apply(ctx, _toConsumableArray(pos).concat([w, h]));
  ctx.closePath();
  ctx.stroke();
};

/**
 * Linearly interpolates between two values.
 * For instance, if you want to interpolate between 0 and 100, you would call lerp(0, 100, t) where t is a value between 0 and 1.
 * What this does is return a value that is t percent between 0 and 100.
 * So if t is 0, the result is 0. If t is 0.5, the result is 50. If t is 1, the result is 100.
 *
 * @param {number} a - The starting value.
 * @param {number} b - The ending value.
 * @param {number} t - The interpolation parameter between 0 and 1.
 * @returns {number} - The interpolated value.
 */
const lerp = function lerpf (a, b, t) {
  return a + (b - a) * t;
};

/**
 * Maps a value from one range to another range.
 * For instance, if you want to map a value from the range [0, 100] to [0, 1], you would call mapRange(value, 0, 100, 0, 1).
 *
 * @param {number} value - The value to be mapped.
 * @param {number} u - The lower bound of the initial range.
 * @param {number} v - The upper bound of the initial range.
 * @param {number} x - The lower bound of the target range.
 * @param {number} y - The upper bound of the target range.
 * @returns {number} The mapped value.
 */
const mapRange = function mapRange (value, u, v, x, y) {
  // return x + (y - x) * (value - u) / (v - u);
  return lerp(x, y, (value - u) / (v - u));
}

/* start window exports */
/**
 * Polutes the global scope with unnamespaced functions
 */
var polute = function polute () {
  // window.setCanvasSize = setCanvasSize;
  // window.paintBackground = paintBackground;
  window.stroke = stroke;
  window.poly = poly;
  window.rect = rect;
  window.fill = fill;
  window.noFill = noFill;
  window.noStroke = noStroke;
  window.strokeWeight = strokeWeight;
  // window.line = line;
  window.ellipse = ellipse;
  // window.arc = arc;
  window.drawPoly = drawPoly;
};

/**
 * Exposed API
 */
window.microcan = {
  polute: polute,
  setCanvasSize: setCanvasSize,
  paintBackground: paintBackground,
  stroke: stroke,
  poly: poly,
  fill: fill,
  noFill: noFill,
  noStroke: noStroke,
  strokeWeight: strokeWeight,
  // line: line,
  ellipse: ellipse,
  arc: arc,
  drawPoly: drawPoly,
  rect: rect
};
/* end window exports */
// },{}]},{},[1])
