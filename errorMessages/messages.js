module.exports = {
  notFound: (value) => ({
    code: 404, message: `${value} not found`,
  }),
  isRequired: (value) => ({
    code: 400, message: `"${value}" is required`,
  }),
  lengthIsLessThan: (value, min) => ({
    code: 422, message: `"${value}" length must be at least ${min} characters long`,
  }),
  isLessThan: (value, min) => ({
    code: 422, message: `"${value}" must be greater than or equal to ${min}`,
  }),
};
