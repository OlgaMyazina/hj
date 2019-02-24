'use strict';

const colorSwatch = document.querySelector('#colorSwatch');
fetch('https://neto-api.herokuapp.com/cart/colors')
  .then((res) => {
    return res.json()
  })
  //todo: добавить к input checked, если выбран по-умполчанию
  .then((data) => {
    data.forEach(colorItem => {
      const colorSnippet = document.createElement('template');
      colorSnippet.innerHTML =
        `<div data-value='${colorItem.type}' class='swatch-element color ${colorItem.type} ${colorItem.isAvailable ? 'available' : 'soldout'}'>
            <div class="tooltip">${colorItem.title}</div>
            <input quickbeam="color" id='swatch-1-${colorItem.type}' type="radio" name="color" value='${colorItem.type}' 
                ${colorItem.isAvailable ? '' : 'disabled'} ${localStorage.getItem('color') == colorItem.type ? 'checked' : ''} >
            <label for='swatch-1-${colorItem.type}' style="border-color: red;">
                <span style='background-color: ${colorItem.code};'></span>
                <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
            </label>
        </div>`;

      colorSwatch.appendChild(colorSnippet.content);
    })
  });

colorSwatch.addEventListener('click', switchColor);

function switchColor(event) {
  localStorage.setItem('color', event.target.value);
}

const sizeSwatch = document.querySelector('#sizeSwatch');
fetch('https://neto-api.herokuapp.com/cart/sizes')
  .then((res) => {
    return res.json()
  })
  //todo: добавить к input checked, если выбран по-умполчанию
  .then((data) => {
    data.forEach(sizeItem => {
      const sizeSnippet = document.createElement('template');
      sizeSnippet.innerHTML =
        `<div data-value='${sizeItem.type}' class='swatch-element plain ${sizeItem.type} ${sizeItem.isAvailable ? 'available' : 'soldout'}'>
            <input id='swatch-0-${sizeItem.type}' type='radio' name='size' value='${sizeItem.type}' 
                ${sizeItem.isAvailable ? '' : 'disabled'} ${localStorage.getItem('size') == sizeItem.type ? 'checked' : ''}>
            <label for='swatch-0-${sizeItem.type}'>
                ${sizeItem.title}
                <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
            </label>
         </div>`;

      sizeSwatch.appendChild(sizeSnippet.content);
    })
  });

sizeSwatch.addEventListener('click', switchSize);

function switchSize(event) {
  localStorage.setItem('size', event.target.value);
}

const cartSnippet = document.createElement('template');
cartSnippet.innerHTML =
  `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico">
    <span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">$800.00</span>
    </span>
   </a>`;

const cart = document.querySelector('#quick-cart');
fetch('https://neto-api.herokuapp.com/cart')
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    data.forEach(product => {
      const productSnippet = document.createElement('template');
      productSnippet.innerHTML = getTemplate(product)
      ;

      cart.appendChild(productSnippet.content);
    });
    cart.appendChild(cartSnippet.content);
    if (cart.querySelector('.quick-cart-product')) {
      const cartPay = cart.querySelector('#quick-cart-pay');
      cartPay.classList.add('open');
    }
  });

const getTemplate = (product) => {
  return `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${product.id}" style="opacity: 1;">
            <div class="quick-cart-product-wrap">
                <img src="${product.pic}" title="${product.title}">
                <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
                <span class="s2"></span>
            </div>
            <span class="count hide fadeUp" id="quick-cart-product-count-${product.id}">${product.quantity}</span>
            <span class="quick-cart-product-remove remove" data-id="${product.id}"></span>
         </div>`
}

const removeTemplate = ()=>{
  const product = cart.querySelector('.quick-cart-product-static');
  cart.removeChild(product);
}

const addToCartButton = document.querySelector('#AddToCart');
addToCartButton.addEventListener('click', addToCart);

function addToCart(event) {
  event.preventDefault();
  const form = document.querySelector('#AddToCartForm');
  const formData = new FormData(form);
  formData.append('productId', form.getAttribute('data-product-id'));
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://neto-api.herokuapp.com/cart')
  xhr.send(formData);
  xhr.onload = () => {
    const data = JSON.parse(xhr.response);
    updateCart(data[0]);
  }
}

cart.addEventListener('click', removeFromCart);

function removeFromCart(event) {
  if (event.target.classList.contains('remove')) {
    const formData = new FormData();
    formData.append('productId', event.target.getAttribute('data-id'));
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
    xhr.send(formData);
    xhr.onload = () => {
      const data = JSON.parse(xhr.response);
      updateCart(data[0]);
    }
  }
}

function updateCart(product) {
  const openCart = cart.querySelector('#quick-cart-pay');
  if (product) {
    const cartProductId = `quick-cart-product-count-${product.id}`;
    const productSnippet = cart.querySelector(`#${cartProductId}`);
    if (productSnippet) {
      productSnippet.textContent = product.quantity;
    } else {
      const productSnippet = document.createElement('template');
      productSnippet.innerHTML = getTemplate(product);
      cart.appendChild(productSnippet.content);
    }
    const priceCart = cart.querySelector('#quick-cart-price');
    priceCart.textContent = `$${product.price * product.quantity}`;
    openCart.classList.add('open');
  } else {
    openCart.classList.remove('open');
    removeTemplate();
  }
}
