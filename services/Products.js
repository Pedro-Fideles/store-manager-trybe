const Products = require('../models/Products');

const list = () => Products.list();

const getById = (id) => Products.getById(id);

const create = async (product) => {
  const id = await Products.create(product);

  return { id, ...product };
};

const update = async (product) => {
  const { id } = product;

  const productExists = await Products.getById(id);

  if (!productExists) return false;

  await Products.update(product);

  return product;
};

module.exports = {
  list,
  getById,
  create,
  update,
};
