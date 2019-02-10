// Инициализация функционала модального окна
initModalUi();

function init() {
  const button = document.getElementsByClassName('btn')[0];
  button.addEventListener('click', modal);
}

document.addEventListener('DOMContentLoaded', initModalUi);
