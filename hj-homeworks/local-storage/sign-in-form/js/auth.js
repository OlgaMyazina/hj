'use strict';

const signIn = document.querySelector('.sign-in-htm');
const signUp = document.querySelector('.sign-up-htm');
const errorMsgSignIn = signIn.querySelector('.error-message');
const errorMsgSignUp = signUp.querySelector('.error-message');
const buttonSignIn = signIn.querySelector('.button');
const buttonSignUp = signUp.querySelector('.button');

buttonSignIn.addEventListener('click', onSubmitFormSignIn);
buttonSignUp.addEventListener('click', onSubmitFormSignUp);

function onSubmitFormSignIn(event) {
  event.preventDefault();
  const data = {
    email: signIn.querySelector('#email').value,
    pass: signIn.querySelector('#pass').value,
    isPermanent: signIn.querySelector('#check').value,
  }
  onSubmit('https://neto-api.herokuapp.com/signin', data, errorMsgSignIn,'авторизован');
}

function onSubmitFormSignUp(event) {
  event.preventDefault();
  const data = {
    email: signUp.querySelector('#email').value,
    password: signUp.querySelector('#pass[name=password]').value,
    passwordcopy: signUp.querySelector('#pass[name=passwordcopy]').value,
    name: signUp.querySelector('#name').value,
  }
  onSubmit('https://neto-api.herokuapp.com/signup', data, errorMsgSignUp,'зарегистрирован');
}

function onSubmit(url, data,node, text) {
  const request = fetch(url, {
    body: JSON.stringify(data),
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  onRequest(request, node,text);
}

function onRequest(request,node, text) {
  request
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        node.textContent = data.message;
      } else {
        node.textContent = `Пользователь ${data.name} успешно ${text}`;
      }
    })
    .catch((error) => {
      node.textContent = error;
    })
}


