const saveCartItems = () => {
  const ol = document.getElementsByClassName('cart__items')[0];
  const span = document.getElementsByClassName('total-price')[0];
  localStorage.setItem('cartItems', JSON.stringify(ol.innerHTML));
  localStorage.setItem('value', JSON.stringify(span.innerText));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
