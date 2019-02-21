'use strict';

const itemsList = document.querySelector('.items-list');
itemsList.addEventListener('click', clickAddToCard);

function clickAddToCard(event){
  const item = {
    title: event.target.getAttribute('data-title'),
    price: event.target.getAttribute('data-price'),
  }
  addToCart(item);
}
