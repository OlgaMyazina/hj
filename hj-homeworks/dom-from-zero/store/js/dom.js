'use strict';

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  if (typeof node !== 'object') {
    return;
  }

  const element = document.createElement(node.name);
  if (node.props) {
    Object.keys(node.props).map(key => element.setAttribute(key, node.props[key]));
  }
  if (node.childs) {
    node.childs.map(child => element.appendChild(createElement(child)));
  }
  
  return element;
}