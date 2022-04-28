const getSavedCartItems = () => {
  const ol = document.getElementsByClassName('cart__items')[0];
  const lista = JSON.parse(localStorage.getItem('cartItems', ol.innerHTML));
  if (lista) {
    ol.innerHTML = lista;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
