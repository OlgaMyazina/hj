'use strict'

function contactLoader() {
  const contactList = JSON.parse(loadContacts());
  const contactLiElem = document.getElementsByClassName("contacts-list")[0];
  let resultStr = "";
  for (let elem of contactList) {
    resultStr += `<li data-email=${elem.email} data-phone =${elem.phone}><strong>${elem.name}</strong></li>`;
  }
  contactLiElem.innerHTML = resultStr;
}

document.addEventListener('DOMContentLoaded', contactLoader);