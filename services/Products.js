const Products = require('../models/Products');

const list = () => Products.list();

const getById = (id) => Products.getById(id);

const create = async (product) => {
  const id = await Products.create(product);

  return { id, ...product };
};

module.exports = {
  list,
  getById,
  create,
};
