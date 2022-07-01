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

  describe('Ao listar vendas', () => {
    const result = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ];

    before(async () => {
      const execute = [result];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await Sales.list();

      expect(response).to.be.an('array');
    });

    it('retorna as informações corretas', async () => {
      const response = await Sales.list();

      expect(response).to.deep.equal(result);
    });
  });

  describe('Ao buscar uma venda pelo "id"', () => {
    describe('e não existe a venda', () => {
      const payload = 11;

      before(async () => {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna null', async () => {
        const response = await Sales.getById(payload);

        expect(response).to.be.null;
      });
    });

    describe('e a venda é encontrada', () => {
      const payload = 1;
      const result = [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2
        }
      ];

      before(async () => {
        const execute = [result];

        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna um array', async () => {
        const response = await Sales.getById(payload);

        expect(response).to.be.an('array');
      });

      it('retorna as informações corretas', async () => {
        const response = await Sales.getById(payload);

        expect(response).to.deep.equal(result);
      });
    });
  });
});