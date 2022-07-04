const sinon = require('sinon');
const { expect } = require('chai');

const Products = require('../../../controllers/Products');
const productsServiceMock = require('../../../services/Products');

describe('Na camada controller de Products:', () => {
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
      await Products.list(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });

    it('é chamado o json com as informações corretas', async () => {
      await Products.list(request, response);

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
        await Products.getById(request, response, next);

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
        await Products.getById(request, response);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('é chamado o json com as informações corretas', async () => {
        await Products.getById(request, response);

        expect(response.json.calledWith(result)).to.be.true;
      });
    });
  });

  describe('Ao criar um novo produto', () => {
    const result = { id: 1, name: 'Produto1' };
    const response = {};
    const request = { body: { name: result.name } };

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      sinon.stub(productsServiceMock, 'create').resolves(result);
    });

    after(() => {
      productsServiceMock.create.restore();
    });

    it('é chamado status com o código http 201', async () => {
      await Products.create(request, response);

      expect(response.status.calledWith(201)).to.be.true;
    });

    it('é chamado o json com as informações corretas', async () => {
      await Products.create(request, response);

      expect(response.json.calledWith(result)).to.be.true;
    });
  });

  describe('Ao atualizar um produto', () => {
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
      request.params = { id: '11' };
      request.body = { name: 'Produto1' };

      before(() => {
        const execute = false;

        sinon.stub(productsServiceMock, 'update').resolves(execute);
      });

      after(() => {
        productsServiceMock.update.restore();
      });

      it('é chamado o next passando o objeto certo', async () => {
        await Products.update(request, response, next);

        expect(next.calledWith(result)).to.be.true;
      });
    });

    describe('e o produto existe', () => {
      const result = {
        id: '1',
        name: 'Produto1',
      };
      request.params = { id: '1' };
      request.body = { name: 'Produto1' };

      before(() => {
        const execute = result;

        sinon.stub(productsServiceMock, 'update').resolves(execute);
      });

      after(() => {
        productsServiceMock.update.restore();
      });

      it('é chamado o status com código http 200', async () => {
        await Products.update(request, response);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('é chamado o json com as informações corretas', async () => {
        await Products.update(request, response);

        expect(response.json.calledWith(result)).to.be.true;
      });
    });
  });
});