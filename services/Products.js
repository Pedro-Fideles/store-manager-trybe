const Products = require('../models/Products');

const list = () => Products.list();

const getById = (id) => Products.getById(id);

module.exports = {
  list,
  getById,
};
