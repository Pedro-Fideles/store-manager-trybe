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

const exclude = async (id) => {
  const saleExists = await Sales.getById(id);

  if (!saleExists) return false;

  await SalesProducts.exclude(id);
  await Sales.exclude(id);

  return true;
};

const update = async (saleId, newProducts) => {
  const saleExists = await Sales.getById(saleId);

  if (!saleExists) return 'sale does not exist';

  const products = await Products.list();

  if (!newProducts
    .every(({ productId }) => products
      .some(({ id }) => +id === +productId))) {
    return 'a product does not exist';
  }

  await SalesProducts.exclude(saleId);
  await Promise.all(
    newProducts.map((product) => SalesProducts.create({ saleId, ...product })),
  );

  return { saleId, itemsUpdated: newProducts };
};

module.exports = {
  create,
  list,
  getById,
  exclude,
  update,
};