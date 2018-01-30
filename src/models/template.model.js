const NeDB = require('nedb');
const path = require('path');

module.exports = function (app, filename) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, `${filename}.db`),
    autoload: true
  });

  return Model;
};
