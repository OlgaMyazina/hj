'use strict';

const longPoolingSection = document.querySelectorAll('.long-pooling > div'),
  url = 'https://neto-api.herokuapp.com/comet/long-pooling';

function subscribe(url) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState != 4) return;

    if ((this.status >= 200) && (this.status < 300)) {
      selectedLPNumber(this.responseText);
    } else {
      console.log(`error:${this}`);
    }
    subscribe(url);
  };

  xhr.open("GET", url, true);
  xhr.send();
}

subscribe(url);

//выбор цифры
function selectedLPNumber(number) {
  clearLPSelected();
  Array.from(longPoolingSection)[number - 1].classList.add('flip-it');
}

//снимаем выделение
function clearLPSelected() {
  longPoolingSection.forEach(element => element.classList.remove('flip-it'));
}

