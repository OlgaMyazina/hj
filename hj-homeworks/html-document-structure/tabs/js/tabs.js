'use strict'

const tabs = document.querySelector('#tabs');
const tabsContent = tabs.querySelector('.tabs-content');
const tabsNav = tabs.querySelector('.tabs-nav');

const demo = tabsNav.firstElementChild;

Array.from(tabsContent.children).forEach(content => {
  const tab = demo.cloneNode(true);
  const tabLink = tab.querySelector('a');
  tabLink.textContent = content.dataset.tabTitle
  tabLink.classList.add(content.dataset.tabIcon);
  tabsNav.appendChild(tab);
});

tabsNav.removeChild(demo);
tabsNav.firstElementChild.classList.add('ui-tabs-active');
tabsNav.addEventListener('click', activeTab);

function activeTab(event) {
  Array.from(event.target.parentElement.parentElement.children).forEach(tab => {
    tab.classList.remove('ui-tabs-active');
  })
  event.target.parentElement.classList.add('ui-tabs-active');

  Array.from(tabsContent.children).forEach(content => {
    content.classList.add('hidden');
    if (content.dataset.tabTitle === event.target.textContent) {
      content.classList.remove('hidden');
    }
  });
}
