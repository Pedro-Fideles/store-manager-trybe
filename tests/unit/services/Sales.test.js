const sinon = require('sinon');
const { expect } = require('chai');

const Sales = require('../../../services/Sales');
const salesModelMock = require('../../../models/Sales');
const productModelMock = require('../../../models/Products');
const salesProductsModelMock = require('../../../models/SalesProducts');

describe('Na camada services de Sales:', () => {
  describe('ao criar uma nova venda', () => {
    const payload = [
      {
        productId: 1,
        quantity: 1
      },
      {
        productId: 2,
        quantity: 5
      }
    ];

    describe('e um produto não existe', () => {
      before(() => {
        sinon.stub(productModelMock, 'getById').resolves(null);
      });

      after(() => {
        productModelMock.getById.restore();
      });

      it('retorna false', async () => {
        const response = await Sales.create(payload);

        expect(response).to.be.false;
      });
    });

    describe('e todos os produtos existem', () => {
      const result = {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 1
          },
          {
            productId: 2,
            quantity: 5
          }
        ]
      }

      before(() => {
        sinon.stub(productModelMock, 'getById').resolves({});
        sinon.stub(salesModelMock, 'create').resolves(1);
        sinon.stub(salesProductsModelMock, 'create').resolves(null);
      });

      after(() => {
        productModelMock.getById.restore();
        salesModelMock.create.restore();
        salesProductsModelMock.create.restore();
      });

      it('retorna as informações corretas', async () => {
        const response = await Sales.create(payload);

        expect(response).to.deep.equal(result);
      });
    });
  });

  describe('Ao listar as vendas', () => {
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
      const execute = result;

      sinon.stub(salesModelMock, 'list').resolves(execute);
    });

    after(async () => {
      salesModelMock.list.restore();
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
        const execute = null;

        sinon.stub(salesModelMock, 'getById').resolves(execute);
      });

      after(async () => {
        salesModelMock.getById.restore();
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
        const execute = result;

        sinon.stub(salesModelMock, 'getById').resolves(execute);
      });

      after(async () => {
        salesModelMock.getById.restore();
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

  describe('Ao deletar uma venda', () => {
    describe('e não existe a venda', () => {
      const payload = '11';

      before(() => {
        const execute = null;

        sinon.stub(salesModelMock, 'getById').resolves(execute);
      });

      after(() => {
        salesModelMock.getById.restore();
      });

      it('retorna false', async () => {
        const response = await Sales.exclude(payload);

        expect(response).to.be.false;
      });
    });

    describe('e a venda existe', () => {
      const payload = '1';

      before(() => {
        const execute = [
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

        sinon.stub(salesModelMock, 'getById').resolves(execute);
        sinon.stub(salesProductsModelMock, 'exclude').resolves();
        sinon.stub(salesModelMock, 'exclude').resolves();
      });

      after(() => {
        salesModelMock.exclude.restore();
        salesProductsModelMock.exclude.restore();
        salesModelMock.getById.restore();
      });

      it('retorna true', async () => {
        const response = await Sales.exclude(payload);

        expect(response).to.be.true;
      });
    })
  });
});