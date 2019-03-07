'use strict'

const selectPlane = document.querySelector('#acSelect'),
  btnSeatMap = document.querySelector('#btnSeatMap');

btnSeatMap.addEventListener('click', showScheme);

function showScheme(event) {
  event.preventDefault();

  fetch(`https://neto-api.herokuapp.com/plane/${selectPlane.value}`)
    .then(res => res.json())
    .then(showSeatMap);
}

const btnSetFull = document.querySelector('#btnSetFull'),
  btnSetEmpty = document.querySelector('#btnSetEmpty');

document.addEventListener('DOMContentLoaded', () => {
  btnSetFull.disabled = true;
  btnSetEmpty.disabled = true;
});


function showSeatMap(list) {
  const seatMapTitle = document.querySelector('#seatMapTitle'),
    seatMapDiv = document.querySelector('#seatMapDiv');
  seatMapTitle.textContent = `${list.title} (${list.passengers} пассажиров).`;

  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;

  const fragment = list.scheme.reduce((f, scheme, index) => {
    if (scheme === 4)
      f.appendChild(showRow(++index, list.letters4));
    if (scheme === 6)
      f.appendChild(showRow(++index, list.letters6));
    if (scheme === 0)
      f.appendChild(showRow(++index));
    return f;
  }, document.createDocumentFragment());

  clear(seatMapDiv);
  seatMapDiv.appendChild(fragment);

  const seats = document.querySelectorAll('div.seat');
  Array.from(seats).forEach(seat => {
    seat.addEventListener('click', event => {
      if (seat.classList.contains('adult') || seat.classList.contains('half')) {
        toRefund(seat);
      } else {
        event.altKey ? toSale(seat, 'half') : toSale(seat, 'adult');
      }
    });
  });
}


function showRow(rowNumber, letters = []) {
  const row = document.createElement('div');
  row.classList.add('row', 'seating-row', 'text-center');

  const rowPart = document.createElement('div');
  rowPart.classList.add('col-xs-1', 'row-number');
  row.appendChild(rowPart);

  const rowHead = document.createElement('h2');
  rowHead.textContent = rowNumber;
  rowPart.appendChild(rowHead);

  const rowPart1 = document.createElement('div');
  rowPart1.classList.add('col-xs-5');
  row.appendChild(rowPart1);
  rowPart1.appendChild(createSeatNode(letters, 'A'));
  rowPart1.appendChild(createSeatNode(letters, 'B'));
  rowPart1.appendChild(createSeatNode(letters, 'C'));

  const rowPart2 = document.createElement('div');
  rowPart2.classList.add('col-xs-5');
  row.appendChild(rowPart2);
  rowPart2.appendChild(createSeatNode(letters, 'D'));
  rowPart2.appendChild(createSeatNode(letters, 'E'));
  rowPart2.appendChild(createSeatNode(letters, 'F'));

  return row;
}

function createSeatNode(letters, letter) {
  if (letters.indexOf(letter) === -1) {
    const seatNode = document.createElement('div');
    seatNode.classList.add('col-xs-4', 'no-seat')
    return seatNode;
  } else {
    const letterSeatNode = document.createElement('div');
    letterSeatNode.classList.add('col-xs-4', 'seat');
    const textSeatNode = document.createElement('span');
    textSeatNode.classList.add('seat-label')
    textSeatNode.textContent = letter;
    letterSeatNode.appendChild(textSeatNode);
    return letterSeatNode;
  }
}


btnSetFull.addEventListener('click', (event) => {
  event.preventDefault();

  const seats = document.querySelectorAll('div.seat');
  Array.from(seats).forEach(seat => {
    toRefund(seat);
  });

  Array.from(seats).forEach(seat => {
    toSale(seat, 'adult');
  });
});

btnSetEmpty.addEventListener('click', event => {
  event.preventDefault();

  const seats = document.querySelectorAll('div.seat');
  Array.from(seats).forEach(seat => {
    toRefund(seat);
  });
});

const totalPax = document.getElementById('totalPax'),
  totalAdult = document.getElementById('totalAdult'),
  totalHalf = document.getElementById('totalHalf');
let countPax = 0,
  countAdult = 0,
  countHalf = 0;

function toRefund(seat) {
  if (seat.classList.contains('adult')) {
    seat.classList.remove('adult');
    countAdult--;
    totalAdult.textContent = countAdult;
    countPax--;
    totalPax.textContent = countPax;
  }
  if (seat.classList.contains('half')) {
    seat.classList.remove('half');
    countHalf--;
    totalHalf.textContent = countHalf;
    countPax--;
    totalPax.textContent = countPax;
  }
}

function toSale(seat, className) {
  seat.classList.add(className);
  countPax++;
  totalPax.textContent = countPax;
  if (className === 'adult') {
    countAdult++;
    totalAdult.textContent = countAdult;
  }
  if (className === 'half') {
    countHalf++;
    totalHalf.textContent = countHalf;
  }
}

function clear(elem) {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
}
