'use strict';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

document.addEventListener('DOMContentLoaded', canvasClear);
canvasSize();

document.addEventListener('dblclick', canvasClear);

function canvasClear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', canvasSize);

function canvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  canvasClear();
}

let brushRadius = 100, brushGrow = false;
const maxRadius = 100, minRadius = 5, maxColor = 359, minColor = 0;

function getBrushSize() {
  if (brushRadius === maxRadius) brushGrow = false;
  if (brushRadius === minRadius) brushGrow = true;
  return brushGrow ? brushRadius++ : brushRadius--;
}

let color = 0;

function getColor(color) {
  return `hsl( ${color}, 100%, 50% )`;
}

function getHue(shift) {
  return shift
    ? color > minColor && color <= maxColor ? color-- : (color = maxColor)
    : color <= maxColor ? color++ : (color = minColor);
}

let lastX, lastY;

function draw(e) {
  ctx.beginPath();

  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.fillStyle = getColor(color);
  ctx.strokeStyle = getColor(color);
  ctx.lineWidth = brushRadius;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  if (lastX && lastY) {
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }

  getHue(e.shiftKey);
  getBrushSize();

  ctx.closePath();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', () => {
  canvas.addEventListener('mousemove', draw);
});

function noDraw() {
  canvas.removeEventListener('mousemove', draw);
  lastX = undefined;
  lastY = undefined;
}

canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mouseleave', noDraw);
