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

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  const params = [id];

  await connection.execute(query, params);
};

module.exports = {
  create,
  exclude,
};
