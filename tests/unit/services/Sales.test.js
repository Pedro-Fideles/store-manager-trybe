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
});