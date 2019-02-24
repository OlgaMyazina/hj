'use strict';

/**
 * Варианты размера подставляются в тело тега с идентификатором colorSwatch.
 * Сниппет варианта цвета выглядит следующим образом:

 <div data-value="red" class="swatch-element color red available">
 <div class="tooltip">Красный</div>
 <input quickbeam="color" id="swatch-1-red" type="radio" name="color" value="red" checked>
 <label for="swatch-1-red" style="border-color: red;">
 <span style="background-color: red;"></span>
 <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
 </label>
 </div>

 Значение цвета подставляется в атрибуты data-value и class тега <div>,
 id и value тега <input>, for тега <label>.

 От доступности товара в данном цвете зависит наличие класса soldout или available у тега <div>,
 а также наличие атрибута disabled у тега <input>.

 Описание цвета подставляется в тело тега с классом tooltip.

 Код цвета подставляется в атрибут style тега <span>.

 Если цвет выбран по умолчанию, то в тег <input> добавляется атрибут checked.

 Для получения списка доступных цветов запросите JSON по адресу
 https://neto-api.herokuapp.com/cart/colors. Вам будут доступны следующие данные по каждому цвету:

 title — описание цвета;
 type — значение цвета, для сохранения в корзине;
 code — код цвета, для отображения фона;
 isAvailable — доступность товара в данном цвете.
 */

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

/**
 * Варианты размера подставляются в тело тега с идентификатором sizeSwatch. Сниппет варианта размера выглядит следующим образом:

 <div data-value="s" class="swatch-element plain s soldout">
 <input id="swatch-0-s" type="radio" name="size" value="s" disabled>
 <label for="swatch-0-s">
 S
 <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
 </label>
 </div>
 Обратите внимание на подстановку данных:

 Значение размера подставляется в атрибуты data-value и class тега <div>,
 id и value тега <input>,
 for тега <label>.

 От доступности товара в данном размере зависит наличие класса soldout или available у тега <div>,
 а также наличие атрибута disabled у тега <input>.

 Описание размера подставляется в тело тега <label>.
 Если размер выбран по умолчанию, то в тег <input> добавляется атрибут checked.

 Для получения списка доступных размеров запросите JSON по адресу https://neto-api.herokuapp.com/cart/sizes.
 Вам будут доступны следующие данные по каждому размеру:

 title — описание размера;
 type — значение размера, для сохранения в корзине;
 isAvailable — доступность товара данного размера.
 */

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

/**
 * Корзина доступна в теге с идентификатором quick-cart. Сначала идут сниппеты товаров. Сниппет товара в корзине выглядит следующим образом:

 <div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-2721888517" style="opacity: 1;">
 <div class="quick-cart-product-wrap">
 <img src="https://neto-api.herokuapp.com/hj/3.3/cart/product_1024x1024.png" title="Tony Hunfinger T-Shirt New York">
 <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
 <span class="s2"></span>
 </div>
 <span class="count hide fadeUp" id="quick-cart-product-count-2721888517">1</span>
 <span class="quick-cart-product-remove remove" data-id="2721888517"></span>
 </div>
 Обратите внимание на подстановку данных:

 Идентификатор товара подставляется в атрибут id тега <div>,
 в атрибут id тега <span> и
 в атрибут data-id тега с классом remove.

 Адрес картинки подставляется в атрибут src тега <img>.

 Название товара подставляется в атрибут title тега <img>.
 Количество товара в корзине подставляется в тело тега с классом count.

 Для получения текущего состояния корзины запросите JSON по адресу https://neto-api.herokuapp.com/cart. Вам будут доступны следующие данные по каждому товару:

 color — цвет товара;
 id — идентификатор товара;
 pic — адрес картинки товара;
 price — цена товара;
 quantity — количество единиц товара в корзине;
 size — размер товара;
 title — название товара.


 */

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
      productSnippet.innerHTML =
        `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${product.id}" style="opacity: 1;">
            <div class="quick-cart-product-wrap">
                <img src="${product.pic}" title="${product.title}">
                <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
                <span class="s2"></span>
            </div>
            <span class="count hide fadeUp" id="quick-cart-product-count-${product.id}">${product.quantity}</span>
            <span class="quick-cart-product-remove remove" data-id="${product.id}"></span>
         </div>`;

      cart.appendChild(productSnippet.content);
    });
    //todo: если нет товаров, общая стоисость, форма отправки
    cart.appendChild(cartSnippet.content);
  });

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
  const cartProductId = `quick-cart-product-count-${product.id}`;
  const productSnippet = cart.querySelector(`#${cartProductId}`);
  productSnippet.textContent = product.quantity;
  const openCart = cartSnippet.querySelector('#quick-cart-pay');
  if (product.quantity == 0) {
    openCart.classList.remove('open');
  } else {
    openCart.classList.add('open');
  }
  const priceCart = cartSnippet.querySelector('#quick-cart-price');
  priceCart.textContent = `$${product.price * product.quantity}`;
}

//todo: реализовать сниппет корзины

/**
 * Сниппет корзины идет сразу после сниппетов товаров:

 <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
 <span>
 <strong class="quick-cart-text">Оформить заказ<br></strong>
 <span id="quick-cart-price">$800.00</span>
 </span>
 </a>
 Подстановка данных:

 Если в корзине нет товаров, то класс open необходимо удалить.
 Общая стоимость всех товаров выводится в тег с идентификатором quick-cart-price.
 Форма отправки заказа имеет идентификатор AddToCartForm.

 Кнопка удаления товара из корзины имеет класс remove. Идентификатор удаляемого товара можно получить из атрибута data-id.
 */


/**
 * При открытии страницы необходимо отобразить выбор размера и цвета с учетом доступности.
 Любые изменения размера и цвета должны запоминаться на стороне клиента,
 и при повторном открытии должно быть выбрано последнее актуальное значение.

 При нажатии на кнопку «Добавить в корзину» необходимо отправить данные формы методом POST на адрес
 https://neto-api.herokuapp.com/cart.

 Данные формы необходимо дополнить идентификатором товара. Он доступен в атрибуте data-product-id формы.
 Его нужно отправить в запросе полем productId.

 В случае успеха вернется новое состояние корзины — обновите корзину, используя эти данные.
 В случае ошибки вы получите объект со свойством error, равным true, и свойством message с описанием причины ошибки.

 Для удаления товара из корзины отправьте его идентификатор полем productId на адрес
 https://neto-api.herokuapp.com/cart/remove методом POST.
 В случае успеха вы получите новое состояние корзины. Ошибка выглядит так же, как и при добавлении.*/

