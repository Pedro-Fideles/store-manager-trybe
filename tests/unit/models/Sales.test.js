const sinon = require('sinon');
const { expect } = require('chai');

const Sales = require('../../../models/Sales');
const connection = require('../../../models/connection');

describe('Na camada model de Sales:', () => {
  describe('ao criar uma nova venda', () => {
    const result = 1;

    before(() => {
      const execute = [{ insertId: result }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna o id', async () => {
      const response = await Sales.create();

      expect(response).to.be.equal(result);
    });
  });
});