const urlApi = (produto) => `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

const fetchProducts = async (produto) => {
  const url = urlApi(produto);
  const result = await fetch(url);
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
