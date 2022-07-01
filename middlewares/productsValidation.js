const { isRequired, lengthIsLessThan } = require('../errorMessages/messages');
const { isUndefined, lengthLessThan } = require('./helpers/errors');

const validateName = (req, _res, next) => {
  const { name } = req.body;

  switch (true) {
    case isUndefined(name): return next(isRequired('name'));
    case lengthLessThan(name, 5): return next(lengthIsLessThan('name', 5));
    default: return next();
  }
};

module.exports = {
  validateName,
};