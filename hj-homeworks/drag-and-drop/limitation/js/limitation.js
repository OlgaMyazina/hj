'use strict';

const block = document.querySelector('.block'),
  message = document.querySelector('.message'),
  textarea = document.querySelector('textarea');

function debounce(callback, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback();
    }, delay);
  };
};

textarea.addEventListener('keydown', () => {
  viewDown();
});

textarea.addEventListener('focus', () => {
  viewDown();
});

//потеря фокуса, взгляд прямо
textarea.addEventListener('blur', () => {
  message.classList.remove('view');
  block.classList.remove('active');
});

//сообщение через 2 сек
textarea.addEventListener('keyup', debounce(() => {
  message.classList.add('view');
  block.classList.remove('active');
}, 2000));

//смотреть вниз
function viewDown(){
  message.classList.remove('view');
  block.classList.add('active');
}