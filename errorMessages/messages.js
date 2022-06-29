module.exports = {
  notFound: (value) => ({
    code: 404, message: `${value} not found`,
  }),
};
