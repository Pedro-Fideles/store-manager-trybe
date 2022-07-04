const { notFound } = require('../errorMessages/messages');
const Products = require('../services/Products');

const list = async (_req, res) => {
  const data = await Products.list();

  res.status(200).json(data);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const data = await Products.getById(id);

  if (!data) {
    const message = notFound('Product');
    return next(message);
  }

  res.status(200).json(data);
};

const create = async (req, res) => {
  const { name } = req.body;

  const data = await Products.create({ name });

  res.status(201).json(data);
};

const update = async (req, res, next) => {
  const { id, name } = req.body;

  const alteredProduct = await Products.update({ id, name });

  if (!alteredProduct) return next(notFound('Product'));

  res.status(200).json({ id, name });
};

module.exports = {
  list,
  getById,
  create,
  update,
};
