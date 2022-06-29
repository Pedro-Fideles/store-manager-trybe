const sinon = require('sinon');
const { expect } = require('chai');

const Products = require('../../../models/Products');
const connection = require('../../../models/connection');

describe('Ao listar produtos', () => {
  const result = [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    },
  ];

  before(async () => {
    const execute = [result];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('retorna um array', async () => {
    const response = await Products.list();

    expect(response).to.be.an('array');
  });

  it('retorna as informações corretas', async () => {
    const response = await Products.list();

    expect(response).to.deep.equal(result);
  });
});

describe('Ao buscar um produto pelo "id"', () => {
  describe('e não existe o produto', () => {
    const payload = 11;

    before(async () => {
      const execute = [[]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const response = await Products.getById(payload);

      expect(response).to.be.null;
    });
  });

  describe('e o produto é encontrado', () => {
    const payload = 1;
    const result = {
      id: 1,
      name: 'Martelo de Thor',
    };

    before(async () => {
      const execute = [[result]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Products.getById(payload);

      expect(response).to.be.an('object');
    });

    it('retorna as informações corretas', async () => {
      const response = await Products.getById(payload);

      expect(response).to.deep.equal(result);
    });
  });
});
