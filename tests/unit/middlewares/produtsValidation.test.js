const sinon = require('sinon');
const { expect } = require('chai');

const productsValidation = require('../../../middlewares/productsValidation');

describe('Na camada de middleware:', () => {
  describe('validando nome', () => {
    const response = {};
    let next = () => { };

    before(() => {
      next = sinon.stub()
        .returns();
    });

    describe('campo "name" não existe', () => {
      const result = { code: 400, message: '"name" is required' }
      const request = { body: {} };

      it('é chamado o next com a mensagem correta', () => {
        productsValidation.validateName(request, response, next);

        expect(next.calledWith(result)).to.be.true;
      });
    });

    describe('campo "name" tem menos que 5 caracteres', () => {
      const result = { code: 422, message: '"name" length must be at least 5 characters long' }
      const request = { body: { name: 'Prod' } };

      it('é chamado o next com a mensagem correta', () => {
        productsValidation.validateName(request, response, next);

        expect(next.calledWith(result)).to.be.true;
      });
    });

    describe('campo "name" é válido', () => {
      const request = { body: { name: 'Produto1' } };

      it('é chamado o next', () => {
        productsValidation.validateName(request, response, next);

        expect(next.calledWith()).to.be.true;
      });
    });
  });
});