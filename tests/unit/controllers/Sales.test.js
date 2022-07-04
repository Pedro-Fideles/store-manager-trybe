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

  describe('Ao listar vendas', () => {
    const response = {};
    const request = {};
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

    before(() => {
      const execute = result;

      sinon.stub(salesServiceMock, 'list').resolves(execute);

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    });

    after(() => {
      salesServiceMock.list.restore();
    });

    it('é chamado o status com código http 200', async () => {
      await Sales.list(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('é chamado o json com as informações corretas', async () => {
      await Sales.list(request, response);

      expect(response.json.calledWith(result)).to.be.true;
    });
  });

  describe('Ao buscar uma venda pelo "id"', () => {
    const response = {};
    const request = {};
    let next = () => { };

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      next = sinon.stub()
        .returns();
    });

    describe('e não existe a venda', () => {
      const result = { code: 404, message: 'Sale not found' };
      request.params = '11';

      before(() => {
        const execute = null;

        sinon.stub(salesServiceMock, 'getById').resolves(execute);
      });

      after(() => {
        salesServiceMock.getById.restore();
      });

      it('é chamado o next passando o objeto certo', async () => {
        await Sales.getById(request, response, next);

        expect(next.calledWith(result)).to.be.true;
      });
    });

    describe('e a venda é encontrada', () => {
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
      request.params = '1';

      before(() => {
        const execute = result;

        sinon.stub(salesServiceMock, 'getById').resolves(execute);
      });

      after(() => {
        salesServiceMock.getById.restore();
      });

      it('é chamado o status com código http 200', async () => {
        await Sales.getById(request, response);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('é chamado o json com as informações corretas', async () => {
        await Sales.getById(request, response);

        expect(response.json.calledWith(result)).to.be.true;
      });
    });
  });

  describe('Ao deletar uma venda', () => {
    const response = {};
    const request = {};
    let next = () => { };

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.end = sinon.stub()
        .returns();
      next = sinon.stub()
        .returns();
    });

    describe('e não existe a venda', () => {
      const result = { code: 404, message: 'Sale not found' };
      request.params = { id: '11' };

      before(() => {
        const execute = false;

        sinon.stub(salesServiceMock, 'exclude').resolves(execute);
      });

      after(() => {
        salesServiceMock.exclude.restore();
      });

      it('é chamado o next passando o objeto certo', async () => {
        await Sales.exclude(request, response, next);

        expect(next.calledWith(result)).to.be.true;
      });
    });

    describe('e a venda existe', () => {
      request.params = { id: '1' };

      before(() => {
        const execute = true;

        sinon.stub(salesServiceMock, 'exclude').resolves(execute);
      });

      after(() => {
        salesServiceMock.exclude.restore();
      });

      it('é chamado o status com código http 204', async () => {
        await Sales.exclude(request, response);

        expect(response.status.calledWith(204)).to.be.true;
      });

      it('é chamado o end', async () => {
        await Sales.exclude(request, response);

        expect(response.end.calledWith()).to.be.true;
      });
    });
  });

  describe('Ao atualizar uma venda', () => {
    const response = {};
    const request = {
      body: [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 5
        }
      ]
    };
    let next = () => { };

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      next = sinon.stub()
        .returns();
    });

    describe('e não existe a venda', () => {
      const result = { code: 404, message: 'Sale not found' };
      request.params = { id: '11' };

      before(() => {
        const execute = 'sale does not exist';

        sinon.stub(salesServiceMock, 'update').resolves(execute);
      });

      after(() => {
        salesServiceMock.update.restore();
      });

      it('é chamado o next passando o objeto certo', async () => {
        await Sales.update(request, response, next);

        expect(next.calledWith(result)).to.be.true;
      });
    });

    describe('e não existe um produto', () => {
      const result = { code: 404, message: 'Product not found' };
      request.params = { id: '1' };

      before(() => {
        const execute = 'a product does not exist';

        sinon.stub(salesServiceMock, 'update').resolves(execute);
      });

      after(() => {
        salesServiceMock.update.restore();
      });

      it('é chamado o next passando o objeto certo', async () => {
        await Sales.update(request, response, next);

        expect(next.calledWith(result)).to.be.true;
      });
    });

    describe('a venda e os produtos existem', () => {
      request.params = { id: '1' };
      const result = {
        saleId: '1',
        itemsUpdated: request.body,
      }

      before(() => {
        sinon.stub(salesServiceMock, 'update').resolves(result);
      });

      after(() => {
        salesServiceMock.update.restore();
      });

      it('é chamado o status com código http 200', async () => {
        await Sales.update(request, response);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('é chamado o json com as informações corretas', async () => {
        await Sales.update(request, response);

        expect(response.json.calledWith(result)).to.be.true;
      });
    });
  });
});
