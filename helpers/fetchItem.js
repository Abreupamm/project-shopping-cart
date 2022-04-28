const urlItem = (item) => `https://api.mercadolibre.com/items/${item}`;

const fetchItem = async (item) => {
  const url = urlItem(item);
  const result = await fetch(url);
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
// console.log(fetchItem('MLB1341706310'));