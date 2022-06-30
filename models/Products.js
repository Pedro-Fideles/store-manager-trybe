const connection = require('./connection');

const list = async () => {
  const query = 'SELECT * FROM StoreManager.products';

  const [data] = await connection.execute(query);

  return data;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const params = [id];

  const [[data]] = await connection.execute(query, params);

  if (!data) return null;

  return data;
};

const create = async (product) => {
  const { name } = product;

  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const params = [name];

  const [{ insertId }] = await connection.execute(query, params);

  return insertId;
};

module.exports = {
  list,
  getById,
  create,
};
