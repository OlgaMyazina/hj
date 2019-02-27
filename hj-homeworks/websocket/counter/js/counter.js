'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('open', event => {
  console.log('соединение установлено');
});

const connections = document.querySelector('.counter');
const errors = document.querySelector('output.errors');

connection.addEventListener('message', event => {
  const messageData = JSON.parse(event.data);
  connections.innerHTML = messageData.connections;
  errors.innerHTML = messageData.errors;
});

connection.addEventListener('close', event => {
  console.log('Соединение закрыто');
});

//обработка ошибок - вывод в консоль
connection.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`);
});

window.addEventListener('beforeunload', () => {
  connection.close(1000);
});
