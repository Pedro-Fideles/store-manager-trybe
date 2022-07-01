const Sales = require('../services/Sales');
const { notFound } = require('../errorMessages/messages');

const create = async (req, res, next) => {
  const data = await Sales.create(req.body);

  if (!data) return next(notFound('Product'));

  res.status(201).json(data);
};

module.exports = {
  create,
};
