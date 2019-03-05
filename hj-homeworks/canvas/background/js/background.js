'use strict';

const canvas = document.querySelector('#wall');
const ctx = canvas.getContext('2d');

const style = window.getComputedStyle(canvas, null);
canvas.height = style.height.slice(0, -2);
canvas.width = style.width.slice(0, -2);
canvas.style.width = style.width;
canvas.style.height = style.height;

const minObject = 50,
  maxObject = 200,
  minSize = 0.1,
  maxSize = 0.6,
  multiLine = 5,
  multiCircle = 12,
  multiCross = 20,
  minV = -0.20,
  maxV = 0.20,
  minQ = 0,
  maxQ = 360;
let size;
const object = [];

ctx.strokeStyle = '#ffffff';

//функция времени 1:
function nextPoint1(x, y, time) {
  return {
    x: x + Math.sin((50 + x + time / 10) / 100) * 3,
    y: y + Math.sin((45 + x + time / 10) / 100) * 4
  };
}

//функция времени 2:
function nextPoint2(x, y, time) {
  return {
    x: x + Math.sin((x + time / 10) / 100) * 5,
    y: y + Math.sin((10 + x + time / 10) / 100) * 2
  };
}

function getRandomNextPoint() {
  return random(1, 2, true) === 1 ? nextPoint1 : nextPoint2;
}

class Figure {
  constructor() {
    this.size = random(minSize, maxSize, false);
    this.startX = random(0, canvas.width, true);
    this.startY = random(0, canvas.height, true);
    this.nextPoint = getRandomNextPoint();
  }

  get lineWidth() {
    return this.size * multiLine;
  }
}

class Circle extends Figure {
  draw() {
    ctx.beginPath();
    const {x, y} = this.nextPoint(this.startX, this.startY, Date.now());
    ctx.arc(x, y, multiCircle * this.size, 0, 2 * Math.PI, false);
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}

class Cross extends Figure {
  constructor() {
    super();
    this.q = random(minQ, maxQ, true);
    this.v = random(minV, maxV, false);
    this.multiplier = Math.ceil(multiCross / 2);
  }

  set q(value) {
    if (value > 360) this.q -= 360;
    if (value <= -360) this.q += 360;
  }

  draw() {
    ctx.beginPath();
    const {x, y} = this.nextPoint(this.startX, this.startY, Date.now());

    ctx.moveTo(
      x - this.size * this.multiplier,
      y - this.size * this.multiplier
    );
    ctx.lineTo(
      x + this.size * this.multiplier,
      y + this.size * this.multiplier
    );
    ctx.moveTo(
      x + this.size * this.multiplier,
      y - this.size * this.multiplier
    );
    ctx.lineTo(
      x - this.size * this.multiplier,
      y + this.size * this.multiplier
    );
    ctx.translate(x, y);
    ctx.rotate((Math.PI / 180) * this.q);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    this.q += this.v;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}

function createObjects() {
  const countObject = Math.floor(random(minObject, maxObject, true) / 2);

  for (let i = 0; i < countObject; i++) {
    const circle = new Circle();
    circle.draw();
    object.push(circle);

    const cross = new Cross();
    cross.draw();
    object.push(cross);
  }
}

function random(minValue, maxValue, intValue) {
  return intValue
    ? Math.floor(Math.random() * (maxValue - minValue)) + minValue
    : Math.random() * (maxValue - minValue) + minValue;
}

document.addEventListener('DOMContentLoaded', createObjects);

setInterval(function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  object.forEach(elem => elem.draw());
}, 50);
