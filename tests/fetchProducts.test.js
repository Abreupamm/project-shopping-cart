require('../mocks/fetchSimulator');
const { json } = require('stylelint/lib/formatters');
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
    await expect(fetch).toHaveBeenCalled();
  });

  it('3 - Verifica se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await expect(fetch).toHaveBeenCalledWith(url);
  });

  it('4 - Verifica se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(products).toEqual(computadorSearch);
  });

  it('5 - verifica  se ao chamar a função fetchProducts sem argumento, retorna um erro', async () => {
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });
});
