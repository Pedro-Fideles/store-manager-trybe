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

module.exports = {
  list,
  getById,
};
