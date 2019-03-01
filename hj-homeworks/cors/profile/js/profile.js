'use strict';

const url = 'https://neto-api.herokuapp.com/profile/me';

function showUser(user) {
  document.querySelector('[data-name]').innerText = user.name;
  document.querySelector('[data-description]').innerText = user.description;
  document.querySelector('[data-pic]').src = user.pic;
  document.querySelector('[data-position]').innerText = user.position;
  const technologiesUrl = `https://neto-api.herokuapp.com/profile/${
    user.id
    }/technologies`;
  return loadData(technologiesUrl, 'addBadge');
}

function addBadge(data) {
  const badges = document.querySelector('[data-technologies]');
  badges.innerText = data.length;
  data.forEach(el => {
    const span = document.createElement('span');
    span.className = `devicons-${el} devicons`;
    badges.appendChild(span);
  });
  document.querySelector('.content').style.display = 'initial';
}

function loadData(url, functionName) {
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

loadData(url, 'show')
  .then(showUser)
  .then(addBadge);
