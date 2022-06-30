const { isRequired, isLessThan } = require('../errorMessages/messages');
const { isUndefined, lessThan } = require('./helpers/errors');

const validateName = (req, _res, next) => {
  const { name } = req.body;

  switch (true) {
    case isUndefined(name): return next(isRequired('name'));
    case lessThan(name, 5): return next(isLessThan('name', 5));
    default: return next();
  }
};

module.exports = {
  validateName,
};