const Sales = require('../services/Sales');
const { notFound } = require('../errorMessages/messages');

const create = async (req, res, next) => {
  const data = await Sales.create(req.body);

  if (!data) return next(notFound('Product'));

  res.status(201).json(data);
};

const list = async (_req, res) => {
  const data = await Sales.list();

  res.status(200).json(data);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const data = await Sales.getById(id);

  if (!data) {
    const message = notFound('Sale');
    return next(message);
  }

  res.status(200).json(data);
};

module.exports = {
  create,
  list,
  getById,
};
