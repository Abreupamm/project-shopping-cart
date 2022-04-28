const cartItemsClick = require('./cartItemClickListener');
const getSavedCartItems = () => {
  const ol = document.getElementsByClassName('cart__items')[0];
  const lista = JSON.parse(localStorage.getItem('cartItems', ol.innerHTML));
  if (lista) {
    ol.innerHTML = lista;
    const li = document.getElementsByClassName('cart__item');
    for (let i = 0; i < li.length; i += 1) {
      li[i].addEventListener('click', cartItemsClick);
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
