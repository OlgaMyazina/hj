'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket'),
  websocketSection = document.querySelectorAll('.websocket > div');

ws.addEventListener('message', event => {
  selectedWSNumber(event.data);
})

//выбор цифры
function selectedWSNumber(number) {
  clearWSSelected();
  Array.from(websocketSection)[number - 1].classList.add('flip-it');
}

//снимаем выделение
function clearWSSelected() {
  websocketSection.forEach(element => element.classList.remove('flip-it'));
}