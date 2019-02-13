'use strict'

const request = new XMLHttpRequest();
request.open('GET', 'https://neto-api.herokuapp.com/weather', true);
request.addEventListener('load', onLoad);
request.addEventListener('error', onError);
request.send();

function onLoad() {
  if (request.status === 200) {
    try {
      const response = JSON.parse(request.responseText);
      setData(response);
    } catch (err) {
      console.log(`Ошибка JSON: ${err}`);
    }
  }
}

function onError() {
  console.log('Ошибка при выполнении запроса');
}
