'use strict';

document.addEventListener('DOMContentLoaded', loadPage);

function loadPage() {
  let counterStorage = localStorage.getItem('counter');
  if (!counterStorage) {
    localStorage.setItem('counter', '0');
    counterStorage = '0';
  }
  updateCounter(counterStorage);

  const incrementButton = document.querySelector('#increment');
  const decrementButton = document.querySelector('#decrement');
  const resetButton = document.querySelector('#reset');

  incrementButton.addEventListener('click', incrementCounter);
  decrementButton.addEventListener('click', decrementCounter);
  resetButton.addEventListener('click', resetCounter);
}

function incrementCounter(){
  let counterStorage = localStorage.getItem('counter');
  localStorage.setItem('counter', ++counterStorage);
  updateCounter(counterStorage);
}

function decrementCounter(){
  let counterStorage = localStorage.getItem('counter');
  localStorage.setItem('counter', --counterStorage);
  updateCounter(counterStorage);
}

function resetCounter(){
  localStorage.setItem('counter', '0');
  updateCounter('0');
}

function updateCounter(counterStorage){
  const counter = document.querySelector('#counter');
  counter.textContent = counterStorage;
}



