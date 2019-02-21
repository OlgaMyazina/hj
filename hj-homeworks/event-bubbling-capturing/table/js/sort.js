'use strict';

function handleTableClick(event) {
  if (event.target.getAttribute('data-prop-name')) sortByTh(event);
}

function sortByTh(event) {
  const thName = event.target.getAttribute('data-prop-name');
  let dir = event.target.getAttribute('data-dir');
  dir = (dir == '1') ? '-1' : '1';
  table.setAttribute('data-sort-by', thName);
  event.target.setAttribute('data-dir', dir);
  sortTable(thName, dir);
}