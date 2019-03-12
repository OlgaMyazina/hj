'use strict';

const poolingSection = document.querySelectorAll('.pooling > div');

const timerId = setInterval(setTimer, 5000);

function setTimer() {
  try {
    fetch('https://neto-api.herokuapp.com/comet/pooling')
      .then(res => res.json())
      .then(data => selectedNumber(data))
  } catch (err) {
    console.log(err);
  }
}

//выбор цифры
function selectedNumber(number) {
  clearAllSelected();
  Array.from(poolingSection)[number - 1].classList.add('flip-it');
}

//снимаем выделение
function clearAllSelected() {
  poolingSection.forEach(element => element.classList.remove('flip-it'));
}

//через 50 сек будут остановлены повторы
setTimeout(function () {
  clearInterval(timerId);
}, 50000);