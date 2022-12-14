const buttonAdd = document.getElementsByClassName('item__add');
const sectionIntems = document.getElementById('items');
const elementCartItems = document.getElementById('cart__items');
const totalPrice = document.getElementById('total-price');

function createCardLoading() {
  for (let index = 0; index < 25; index++) {
    const section = document.createElement('section');
    section.className = 'loading';
    section.innerText = 'Carregando...';
    sectionIntems.appendChild(section);
  }
}

createCardLoading();

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'price', price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

const buttonRemoveItems = () => {
  const li = document.getElementsByClassName('cart__item');
  for (let i = li.length - 1; i >= 0; i -= 1) {
    elementCartItems.removeChild(li[i]);
  }
 
  totalPrice.innerText = 0,00;
  saveCartItems();
};


const calculateSomaTotalValue = (priceTotal, soma) => {
  let value;
  const price = parseFloat(totalPrice.innerText);
  if (soma === true) {
    value = price + priceTotal;
  } else {
    value = price - priceTotal;
  }
  totalPrice.innerText = value.toFixed(2);
};

function cartItemClickListener(event) {
  const produto = event.target.parentNode;
  elementCartItems.removeChild(produto);
  const price = parseFloat(produto.id);
  calculateSomaTotalValue(price, false);
  return saveCartItems();
}

function createCartItemElement({ image, name, salePrice }) {
  const li = document.createElement('li');
  const spanPrice = document.createElement('span');
  const spanName = document.createElement('span');
  const img = document.createElement('img');
  const buttonRemove = document.createElement('button');
  buttonRemove.addEventListener('click', cartItemClickListener);

  img.src = image;
  spanName.className = 'cart__item__name';
  spanName.innerText = name;
  spanPrice.className = 'cart__item__price';
  spanPrice.innerText = salePrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  buttonRemove.innerText = 'Remover do carrinho';
  li.className = 'cart__item';

  li.appendChild(img);
  li.appendChild(spanName);
  li.appendChild(spanPrice);
  li.appendChild(buttonRemove);
  li.id = salePrice;
  return li;
}

const createProducts = async () => {
  const { results } = await fetchProducts('computador');
  const fetch = results;
  const loading = document.getElementsByClassName('loading');
  for (let i = loading.length - 1; i >= 0; i -= 1) {
    sectionIntems.removeChild(loading[i]);
  }
  await fetch.forEach((obj) => {
    console.log(obj);
    const { id, title, thumbnail, price } = obj;
    const result = createProductItemElement({ sku: id, name: title, image: thumbnail , price});
    sectionIntems.appendChild(result);
  });
};

const createCart = async (event) => {
  const produto = event.target.parentElement.children;
  const sku = produto[1].innerText;
  const item = await fetchItem(sku);
  const {title, price, thumbnail } = item;
  const create = createCartItemElement({  image: thumbnail, name: title, salePrice: price });
  elementCartItems.appendChild(create);
  calculateSomaTotalValue(price, true);
  return saveCartItems();
};

window.onload = async () => {
  await createProducts();
  const button = document.getElementsByClassName('empty-cart')[0];
  button.addEventListener('click', buttonRemoveItems);
  for (let i = 0; i < buttonAdd.length; i += 1) {
    buttonAdd[i].addEventListener('click', createCart);
  }
  getSavedCartItems();
  const li = document.getElementsByClassName('cart__item');
  if (li !== undefined) {
    for (let i = 0; i < li.length; i += 1) {
      li[i].addEventListener('click', cartItemClickListener);
    }
  }
};
