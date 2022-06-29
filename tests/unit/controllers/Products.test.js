const sinon = require('sinon');
const { expect } = require('chai');

const Products = require('../../../controllers/Products');
const productsServiceMock = require('../../../services/Products');

describe('Na camada controller:', () => {
  describe('Ao listar produtos', () => {
    const response = {};
    const request = {};
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
    
    before(() => {
      const execute = result;

      sinon.stub(productsServiceMock, 'list').resolves(execute);

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    })
    
    it('é chamado o status com código http 200', async () => {
      await Products.list(response, request);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('é chamado o json com as informações corretas', async () => {
      await Products.list(response, request);

      expect(response.json.calledWith(result)).to.be.true;
    });
  });

  describe('Ao buscar um produto pelo "id"', () => {
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

    describe('e não existe o produto', () => {
      const result = { code: 404, message: 'Product not found' };
      request.params = '11';

      before(() => {
        const execute = null;

        sinon.stub(productsServiceMock, 'getById').resolves(execute);
      });

      after(() => {
        productsServiceMock.getById.restore();
      });

      it('é chamado o next passando o objeto certo', async () => {
        await Products.getById(response, request, next);

        expect(next.calledWith(result)).to.be.true;
      });
    });

    describe('e o produto é encontrado', () => {
      const result = {
        id: 1,
        name: 'Martelo de Thor',
      };
      request.params = '1';

      before(() => {
        const execute = result;

        sinon.stub(productsServiceMock, 'getById').resolves(execute);
      });

      after(() => {
        productsServiceMock.getById.restore();
      });

      it('é chamado o status com código http 200', async () => {
        await Products.getById(response, request);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('é chamado o json com as informações corretas', async () => {
        await Products.getById(response, request);

        expect(response.json.calledWith(result)).to.be.true;
      });
    })
  });
});