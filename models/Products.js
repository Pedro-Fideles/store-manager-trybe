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

module.exports = {
  list,
  getById,
};
