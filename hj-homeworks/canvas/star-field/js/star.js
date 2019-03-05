'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.addEventListener('click', drawSky);
document.addEventListener('DOMContentLoaded', drawSky);

function drawSky() {
  const height = canvas.height;
  const width = canvas.width;

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();

  canvas.style.backgroundColor = '#000000';

  const colorStar = ['#ffffff', '#ffe9c4', '#d4fbff'];
  const countStars = generate(200, 400, true);
  for (let i = 0; i < countStars; ++i) {
    const sizeStar = generate(0, 1.1, false);
    const posXStar = generate(0, width, true);
    const posYStar = generate(0, height, true);
    ctx.beginPath();
    ctx.arc(posXStar, posYStar, sizeStar, 0, 2 * Math.PI, true);
    ctx.fillStyle = colorStar[generate(0, 3, true)];
    ctx.globalAlpha = generate(0.8, 1, false);
    ctx.fill();
  }
}

/* функция генерации
minValue - минимальное значение,
maxValue - максимальное значение (не включительно),
intValue - булевое значение - true - целое/ false - с плавающей точкой
*/
function generate(minValue, maxValue, intValue) {
  return intValue
    ? Math.floor(Math.random() * (maxValue - minValue)) + minValue
    : Math.random() * (maxValue - minValue) + minValue;
}
