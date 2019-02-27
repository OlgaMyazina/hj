'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', () => {
  showBubbles(connection);
  console.log('Вебсокет-соединение открыто');
});

connection.addEventListener('close', event => {
  console.log('Вебсокет-соединение закрыто');
});

connection.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`);
});

document.addEventListener("click", event => {
  const coordinates = { x: event.clientX, y: event.clientY };
  connection.send(JSON.stringify(coordinates));
});

