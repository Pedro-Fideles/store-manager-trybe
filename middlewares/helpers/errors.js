module.exports = {
  isUndefined: (value) => !value && value !== 0,
  lengthLessThan: (value, min) => value.length < min,
  arrayOfObject: (value, key, check, number) => {
    if (number) return value.some((obj) => check(obj[key], number));
    
    return value.some((obj) => check(obj[key]));
  },
  lessThan: (value, min) => value < min,
};