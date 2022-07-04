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

const update = async (product) => {
  const { id, name } = product;

  const query = `
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
  `;
  const params = [name, id];

  await connection.execute(query, params);

  return id;
};

module.exports = {
  list,
  getById,
  create,
  update,
};
