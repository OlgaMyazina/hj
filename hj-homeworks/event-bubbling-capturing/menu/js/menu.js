'use strict';

function toggleMenu(event) {
  if (this.classList.contains('show')) {
    this.classList.remove('show');
    this.classList.add('hide');
  } else {
    this.classList.add('show');
    this.classList.remove('hide');
  }
}

function openLink(event) {
  console.log(this.textContent);
}

function init(node) {
  node.addEventListener('click', toggleMenu);
}

function initLink(node) {
  if (node.dataset.toggle) {
    return;
  }
  node.addEventListener('click', openLink);
}

Array
  .from(document.querySelectorAll('.dropdown'))
  .forEach(init);

Array
  .from(document.querySelectorAll('a'))
  .forEach(initLink);

/**
 * Решение: при клике на пункт меню второго уровня (серый фон)
 переход по ссылке не осуществлялся, меню не схлопывалось и оставалось раскрытым.
 */

Array
  .from(document.querySelectorAll('.dropdown-menu'))
  .forEach(clickNode);

function clickNode(node){
  node.addEventListener('click', clickLink);
}

function clickLink(event){
  event.stopPropagation();
  event.preventDefault();
}
