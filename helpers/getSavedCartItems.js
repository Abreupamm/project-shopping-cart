const getSavedCartItems = () => {
  const ol = document.getElementsByClassName('cart__items')[0];
  const span = document.getElementsByClassName('total-price')[0];
  const lista = JSON.parse(localStorage.getItem('cartItems', ol.innerHTML));
  const value = JSON.parse(localStorage.getItem('value', span.innerText));
  if (lista) {
    ol.innerHTML = lista;
    span.innerText = value;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
