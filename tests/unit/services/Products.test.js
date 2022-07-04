const sinon = require('sinon');
const { expect } = require('chai');

const Products = require('../../../services/Products');
const productsModelMock = require('../../../models/Products');

describe('Na camada service de Products:', () => {
  describe('Ao listar os produtos', () => {
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
      const execute = result;
  
      sinon.stub(productsModelMock, 'list').resolves(execute);
    });
  
    after(async () => {
      productsModelMock.list.restore();
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
        const execute = null;

        sinon.stub(productsModelMock, 'getById').resolves(execute);
      });

      after(async () => {
        productsModelMock.getById.restore();
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
        const execute = result;

        sinon.stub(productsModelMock, 'getById').resolves(execute);
      });

      after(async () => {
        productsModelMock.getById.restore();
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

  describe('Ao criar um novo produto', () => {
    const payload = { name: 'Produto1' };
    const result = { id: 1, ...payload };

    before(() => {
      const execute = result.id;

      sinon.stub(productsModelMock, 'create').resolves(execute);
    });

    after(() => {
      productsModelMock.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Products.create(payload);

      expect(response).to.be.an('object');
    });

    it('retorna as informações corretas', async () => {
      const response = await Products.create(payload);

      expect(response).to.deep.equal(result);
    });
  });

  describe('Ao atualizar um produto', () => {
    describe('e não existe o produto', () => {
      const payload = { id: 11, name: 'Produto1' };

      before(() => {
        const execute = null;

        sinon.stub(productsModelMock, 'getById').resolves(execute);
      });

      after(() => {
        productsModelMock.getById.restore();
      });

      it('retorna false', async () => {
        const response = await Products.update(payload);

        expect(response).to.be.false;
      });
    });

    describe('e o produto existe', () => {
      const payload = { id: 1, name: 'Produto1' };
  
      before(() => {
        const execute = payload.id;
  
        sinon.stub(productsModelMock, 'update').resolves(execute);
        sinon.stub(productsModelMock, 'getById').resolves(payload);
      });
  
      after(() => {
        productsModelMock.update.restore();
        productsModelMock.getById.restore();
      });
  
      it('retorna um objeto', async () => {
        const response = await Products.update(payload);
  
        expect(response).to.be.an('object');
      });
  
      it('retorna as informações corretas', async () => {
        const response = await Products.update(payload);
  
        expect(response).to.deep.equal(payload);
      });
    })
  });
});