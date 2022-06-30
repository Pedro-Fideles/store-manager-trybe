module.exports = {
  notFound: (value) => ({
    code: 404, message: `${value} not found`,
  }),
  isRequired: (value) => ({
    code: 400, message: `"${value}" is required`,
  }),
  isLessThan: (value, min) => ({
    code: 422, message: `"${value}" length must be at least ${min} characters long`,
  }),
};
