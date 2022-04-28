const saveCartItems = () => {
  const ol = document.getElementsByClassName('cart__items')[0];
  localStorage.setItem('cartItems', JSON.stringify(ol.innerHTML));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
