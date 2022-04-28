const buttonAdd = document.getElementsByClassName('item__add');
const sectionIntems = document.getElementsByClassName('items')[0];
const elementCartItems = document.getElementsByClassName('cart__items')[0];

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  const produto = event.target;
  elementCartItems.removeChild(produto);
  return saveCartItems();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createProducts = async () => {
  const fetch = await fetchProducts('computador');
  await fetch.forEach((obj) => {
    const { id, title, thumbnail } = obj;
    const result = createProductItemElement({ sku: id, name: title, image: thumbnail });
    sectionIntems.appendChild(result);
  });
};

const createCart = async (event) => {
  const produto = event.target.parentElement.children;
  const sku = produto[1].innerText;
  const item = await fetchItem(sku);
  const { id, title, price } = item;
  const create = createCartItemElement({ sku: id, name: title, salePrice: price });
  elementCartItems.appendChild(create);
  return saveCartItems();
};

window.onload = async () => {
  await createProducts();
  for (let i = 0; i < buttonAdd.length; i += 1) {
    buttonAdd[i].addEventListener('click', createCart);
  }
  getSavedCartItems();
};
module.exports = cartItemClickListener;