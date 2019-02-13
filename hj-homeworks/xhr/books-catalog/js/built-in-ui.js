/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

/* Домашняя работа */

'use strict'
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://neto-api.herokuapp.com/book/",
  true
);

xhr.send();
xhr.addEventListener("load", onLoad);

function onLoad() {
  try {
    const catalog = JSON.parse(xhr.responseText);
    const contentList = catalog.reduce((store, book) => {
      return `${store}
        <li data-title="${book.title}" 
        data-author="${book.author.name}"
        data-info="${book.description}"
        data-price="${book.price}">
            <img src="${book.cover.small}">
        </li>`;
    }, '');
    document.getElementById('content').innerHTML = contentList;
  } catch (err) {
    console.log(`Ошибка данных: ${err}`);
  }
}
