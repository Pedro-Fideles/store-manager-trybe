const connection = require('./connection');

const create = async (relationship) => {
  const query = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;
  const params = Object.values(relationship);

  await connection.execute(query, params);

  return null;
};

module.exports = {
  create,
};
