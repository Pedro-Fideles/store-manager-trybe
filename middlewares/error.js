const errorRequest = (err, _req, res, _next) => {
  const { code, message } = err;
  res.status(code).json({ message });
};

module.exports = errorRequest;
