'use strict'

function changeList(event) {
  const done = document.querySelector('.done');
  const undone = document.querySelector('.undone');
  let current = event.target.parentElement;
  if (current === undone) {
    done.appendChild(event.target)
  } else {
    undone.appendChild(event.target)
  };
}

const label = document.getElementsByTagName('label');
Array.from(label).forEach(label => label.addEventListener('click', changeList));
