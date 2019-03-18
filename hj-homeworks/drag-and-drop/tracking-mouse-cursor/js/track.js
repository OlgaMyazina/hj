'use strict';

const leftEyeWrap = document.querySelector('.cat_position_for_left_eye'),
  rightEyeWrap = document.querySelector('.cat_position_for_right_eye '),
  leftEye = leftEyeWrap.querySelector('.cat_eye_left'),
  rightEye = rightEyeWrap.querySelector('.cat_eye_right');

function throttle(callback) {
  let isWaiting = false;
  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    }
  }
}

document.addEventListener('mousemove', (event) => {
  throttle(moveEyes(event.clientX, event.clientY));
});

//смещение зрачка
const maxShift = 10;
//размер зрачка
const size = 12;

function moveEyes(mouseX, mouseY) {
  // движение глаз
  moveEye('left', mouseX, mouseY);
  moveEye('right', mouseX, mouseY);
}

//определяем центр
function positionCenter(eye) {
  const eyePos = eye.getBoundingClientRect();
  return {
    x: eyePos.left - ((eyePos.left - eyePos.right) / 2),
    y: eyePos.top - ((eyePos.top - eyePos.bottom) / 2)
  }
}

//движение глаза
//position - определение какой глаз
//координаты мыши
function moveEye(position, mouseX, mouseY) {
  let eye, center;
  if (position === 'right') {
    eye = rightEye;
    center = positionCenter(rightEyeWrap);
  }
  if (position === 'left') {
    eye = leftEye;
    center = positionCenter(leftEyeWrap);
  }

  if (mouseX < center.x) {
    eye.style.left = `${size - (maxShift * (1 - (mouseX / center.x)))}px`;
  } else {
    eye.style.left = `${size + (maxShift * (mouseX - center.x) /
      (document.documentElement.clientWidth - center.x))}px`;
  }

  if (mouseY < center.y) {
    eye.style.top = `${size - (maxShift * (1 - (mouseY / center.y)))}px`;
  } else {
    eye.style.top = `${size + (maxShift * (mouseY - center.y) /
      (document.documentElement.clientHeight - center.y))}px`;
  }
}