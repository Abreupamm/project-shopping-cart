require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {

  beforeEach(async () => {
    return products = await fetchProducts('computador');
  });
  // fail('Teste vazio');
  it('1 - Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it('2 - Verifica se fetch foi chamada quando chamada a função fetchProducts com o argumento "computador"', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const expectedFetch = await fetch(url);
    const expectedJson = await expectedFetch.json();
    const expected = expectedJson.results;
    expect(products).toEqual(expected);
  });

  it('Verifica se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const expected = typeof computadorSearch;
    expect(typeof products).toEqual(expected);
  });

  // it('verifica  se ao chamar a função fetchProducts sem argumento, retorna um erro', async () => {
  // });
});
