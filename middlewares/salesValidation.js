const { isRequired, isLessThan } = require('../errorMessages/messages');
const { isUndefined, arrayOfObject, lessThan } = require('./helpers/errors');

const validateSale = (req, _res, next) => {
  const sale = req.body;

  switch (true) {
    case arrayOfObject(sale, 'productId', isUndefined): return next(isRequired('productId'));
    case arrayOfObject(sale, 'quantity', isUndefined): return next(isRequired('quantity'));
    case arrayOfObject(sale, 'quantity', lessThan, 1): return next(isLessThan('quantity', 1));
    default: return next();
  }
};

module.exports = {
  validateSale,
};
