const sinon = require('sinon');
const { expect } = require('chai');

const SalesProducts = require('../../../models/SalesProducts');
const connection = require('../../../models/connection');

describe('Na camada de models de SalesProducts:', () => {
  describe('ao criar um novo relacionamento', () => {
    const payload = { productId: 1, saleId: 1, quantity: 3 };

    before(() => {
      const execute = [];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const response = await SalesProducts.create(payload);

      expect(response).to.be.null;
    });
  });

  describe('Ao excluir uma venda', () => {
    const payload = 1;

    before(async () => {
      const execute = [];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('não retorna nada', async () => {
      const response = await SalesProducts.exclude(payload);

      expect(response).to.be.undefined;
    });
  });
});
