function getPriceFormatted(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

'use strict'

let nodeCount, nodePrice, price = 0;

function init() {
  const container = document.getElementById('container');
  container.addEventListener('click', addProduct);
  nodeCount = document.getElementById('cart-count');
  nodePrice = document.getElementById('cart-total-price')
}

function addProduct(e) {
  if (e.target.tagName === 'BUTTON') {
    nodeCount.textContent = +nodeCount.innerText + 1;
    price += parseInt(e.target.getAttribute('data-price'));
    nodePrice.textContent = getPriceFormatted(price);
  }
}

document.addEventListener('DOMContentLoaded', init);

