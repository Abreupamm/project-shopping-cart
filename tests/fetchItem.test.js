require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // fail('Teste vazio');
  beforeEach(async () => {
    return fet = await fetchItem('MLB1615760527');
  });

  it('1 - Verifica se fetchItem é uma função;', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    expect(fetch).toHaveBeenCalled();
  });

  it('3 - Verifica se ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint correto', async () => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    await expect(fetch).toHaveBeenCalledWith(url);
  });

  it('4 - Verifica se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    expect(fet).toEqual(item);
  });

  it('5 - Verifica se ao chamar a função fetchItem sem argumento, retorna um erro', async () => {
    await expect(fetchItem()).rejects.toThrow('You must provide an url');
  });
});
