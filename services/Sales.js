const Products = require('../models/Products');
const Sales = require('../models/Sales');
const SalesProducts = require('../models/SalesProducts');

const create = async (itemsSold) => {
  const productsExists = await Promise
    .all(itemsSold.map(({ productId }) => Products.getById(productId)));
  
  if (!productsExists.every(Boolean)) return false;

  const saleId = await Sales.create();

  await Promise.all(
    itemsSold.map((product) => SalesProducts.create({ saleId, ...product })),
  );

  return { id: saleId, itemsSold };
};

const list = () => Sales.list();

const getById = (id) => Sales.getById(id);

module.exports = {
  create,
  list,
  getById,
};