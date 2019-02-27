'use strict';


const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

const chat = document.querySelector('.chat');
const chatStatus = chat.querySelector('.chat-status');
const messageSubmit = chat.querySelector('.message-submit');
const messagesContent = chat.querySelector('.messages-content');
const messageStatus = chat.querySelector('.message-status');
const loading = chat.querySelector('.loading');
const messagePersonal = chat.querySelector('.message-personal');
const messageInput = document.querySelector('.message-input');

connection.addEventListener('open', event => {
  status('online');
});

connection.addEventListener('message', event => {
  console.log(event.data);
  const newLoading = loading.cloneNode(true);
  newLoading.lastElementChild.textContent = 'Собеседник печатает сообщение';
  if (event.data === '...') messageContent.append(newLoading);
  else {
    pushMessage(
      messagePersonal.previousElementSibling.cloneNode(true),
      event.data
    );

    if (messagesContent.querySelector('.loading'))
      messagesContent.querySelector('.loading').remove();
  }
});

connection.addEventListener('close', event => {
  status('offline');
});

connection.addEventListener('error', error => {
  chatStatus.innerHTML = chatStatus.getAttribute('data-offline');
  console.log(`Произошла ошибка: ${error.data}`);
});

window.addEventListener('beforeunload', () => {
  connection.close(1000);
});

messageSubmit.addEventListener('click', event => {
  event.preventDefault();
  sendMessage(messageInput.value);
});

messageInput.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    sendMessage(event.target.value);
  }
});

function status(state) {
  let attr = '', submitDisabled = false, textStatus = '';
  if (state === 'online') {
    attr = 'data-online';
    submitDisabled = false;
    textStatus = 'Пользователь появился в сети';
  } else {
    attr = 'data-offline';
    submitDisabled = true;
    textStatus = 'Пользователь не в сети';
  }
  chatStatus.innerHTML = chatStatus.getAttribute(attr);
  messageSubmit.disabled = submitDisabled;
  const newStatus = messageStatus.cloneNode(true);
  newStatus.firstElementChild.textContent = textStatus;
  messagesContent.appendChild(newStatus);
}

function sendMessage(message) {
  if (!message) return;
  messageInput.value = '';
  pushMessage(messagePersonal.cloneNode(true), message);
  connection.send(message);
}

function pushMessage(node, message) {
  node.querySelector('.message-text').textContent = message;
  node.querySelector('.timestamp').textContent = getTime();
  messagesContent.appendChild(node);
  messagesContent.style.overflowY = 'auto';
}

function getTime() {
  const date = new Date();
  const options = {hour: '2-digit', minute: '2-digit'};
  const formatDate = new Intl.DateTimeFormat('ru-RU', options).format(date);
  return formatDate;
}
