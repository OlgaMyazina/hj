'use strict';

function addScript(src) {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
}

addScript('https://neto-api.herokuapp.com/food/42?callback=addRecept');
addScript('https://neto-api.herokuapp.com/food/42/rating?callback=addRating');
addScript(
  'https://neto-api.herokuapp.com/food/42/consumers?callback=addConsumers'
);

function addRecept(data) {
  document.querySelector('[data-pic]').style.backgroundImage = `url(${
    data.pic
    })`;
  document.querySelector('[data-title]').innerText = data.title;
  document.querySelector(
    '[data-ingredients]'
  ).innerText = data.ingredients.join(', ');
}

function addRating(data) {
  document.querySelector('[data-rating]').innerText = data.rating.toFixed(2);
  document.querySelector('[data-star]').style.width = `(${data.rating * 10} %`;
  document.querySelector('[data-votes]').innerText = `(${data.votes} оценок)`;
}

function addConsumers(data) {
  const consumerList = document.querySelector('[data-consumers]');
  data.consumers.forEach(el => {
    const pic = document.createElement('img');
    pic.src = el.pic;
    pic.title = el.name;
    document.querySelector('[data-consumers]').appendChild(pic);
  });
  const total = document.createElement('span');
  total.innerText = `(+${data.total})`;
  consumerList.appendChild(total);
}

