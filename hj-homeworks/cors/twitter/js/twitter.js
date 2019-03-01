'use strict';

const url = 'https://neto-api.herokuapp.com/twitter/jsonp';

function showUser(user) {
  document.querySelector('[data-wallpaper]').src = user.wallpaper;
  document.querySelector('[data-username]').innerText = user.username;
  document.querySelector('[data-description]').innerText = user.description;
  document.querySelector('[data-pic]').src = user.pic;
  document.querySelector('[data-tweets]').innerText = user.tweets;
  document.querySelector('[data-followers]').innerText = user.followers;
  document.querySelector('[data-following]').innerText = user.following;
}

function loadData(url) {
  return new Promise((done) => {
    window.loadData = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=loadData`;
    document.body.appendChild(script);
  });
}

loadData(url).then(showUser);