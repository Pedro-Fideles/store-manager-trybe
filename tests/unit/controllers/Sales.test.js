const sinon = require('sinon');
const { expect } = require('chai');

const Sales = require('../../../controllers/Sales');
const salesServiceMock = require('../../../services/Sales');

describe('Na camada controllers de Sales:', () => {
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
    const response = {};
    const request = { body: payload };
    let next = () => { };

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      next = sinon.stub()
        .returns();
    });

    describe('e não existe um produto', () => {
      const result = { code: 404, message: 'Product not found' };

      before(() => {
        const execute = false;

        sinon.stub(salesServiceMock, 'create').resolves(execute);
      });

      after(() => {
        salesServiceMock.create.restore();
      });

      it('é chamado o next passando o objeto certo', async () => {
        await Sales.create(request, response, next);

        expect(next.calledWith(result)).to.be.true;
      });
    });

    describe('e todos os produtos existem', () => {
      const result = {
        id: 1,
        itemsSold: payload,
      };

      before(() => {
        sinon.stub(salesServiceMock, 'create').resolves(result);
      });

      after(() => {
        salesServiceMock.create.restore();
      });

      it('é chamado o status com código http 201', async () => {
        await Sales.create(request, response);

        expect(response.status.calledWith(201)).to.be.true;
      });

      it('é chamado o json com as informações corretas', async () => {
        await Sales.create(request, response);

        expect(response.json.calledWith(result)).to.be.true;
      });
    });
  });
});
