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
showArticle(tabsNav.firstElementChild);

tabsNav.addEventListener('click', activeTab);

function activeTab(event) {
  const tabClick = event.target.parentElement;
  Array.from(tabClick.parentElement.children).forEach(tab => {
    tab.classList.remove('ui-tabs-active');
  })
  tabClick.classList.add('ui-tabs-active');
  showArticle(event.target);

}

function showArticle(tab) {
  Array.from(tabsContent.children).forEach(content => {
    content.classList.add('hidden');
    if (content.dataset.tabTitle === tab.textContent) {
      content.classList.remove('hidden');
    }
  });
}

