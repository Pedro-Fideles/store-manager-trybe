const connection = require('./connection');

const create = async () => {
  const query = 'INSERT INTO StoreManager.sales () VALUES ()';

  const [{ insertId }] = await connection.execute(query);

  return insertId;
};

const list = async () => {
  const query = `
    SELECT
      s.id AS saleId,
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity
    FROM StoreManager.sales s
    INNER JOIN StoreManager.sales_products sp
    ON s.id = sp.sale_id
    ORDER BY s.id, sp.product_id
  `;

  const [data] = await connection.execute(query);

  return data;
};

const getById = async (id) => {
  const query = `
    SELECT
      s.date AS date,
      sp.product_id AS productId,
      sp.quantity
    FROM StoreManager.sales s
    INNER JOIN StoreManager.sales_products sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
  `;
  const params = [id];

  const [data] = await connection.execute(query, params);

  if (data.length === 0) return null;

  return data;
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const params = [id];

  await connection.execute(query, params);
};

module.exports = {
  create,
  list,
  getById,
  exclude,
};
