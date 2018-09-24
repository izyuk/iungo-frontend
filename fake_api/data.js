const data = require('./data.json');

module.exports = {
  get: (key) => {
    return data[key];
  },

  set: (key, val) => {
    data[key] = val;
  }
};
