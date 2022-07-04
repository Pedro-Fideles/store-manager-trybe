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

const exclude = async (id) => {
  const productExists = await Products.getById(id);

  if (!productExists) return false;

  await Products.exclude(id);

  return true;
};

const search = async (searchTerm) => {
  const products = await Products.list();

  const searchResult = products.filter(({ name }) => name.includes(searchTerm));

  return searchResult;
};

module.exports = {
  list,
  getById,
  create,
  update,
  exclude,
  search,
};
