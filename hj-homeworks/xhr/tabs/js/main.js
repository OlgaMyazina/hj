'use strict'

document.addEventListener('DOMContentLoaded', onLoad);

let contentBox;

function onLoad() {
  contentBox = document.getElementById('content');
  //Возможно, лучше воспользоваться всплытием события, чтобы навесить один обработчик
  const links = Array.from(document.querySelectorAll('a'));
  links.forEach((a) => {
    a.addEventListener('click', onLoadContent)
  });

  onLoadContent();
}

function onLoadContent(e) {
  if (e) {
    e.preventDefault();
    changeActive(e.currentTarget);
  }
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoadXHR);
  xhr.addEventListener('error', onErrorXHR);
  xhr.open(
    "GET",
    e ? e.currentTarget.href : document.querySelector('.active').href,
    true
  )
  xhr.send();
}

function onLoadXHR() {
  if (this.status === 200) {
    contentBox.innerHTML = this.responseText;
  } else {
    console.log(`Ошибка протокола ${this.status}`);
  }
}

function onErrorXHR() {
  console.log('Ошибка сети');
}

function changeActive(activeElement) {
  document.querySelector('.active').classList.toggle('active');
  activeElement.classList.toggle('active');
}
