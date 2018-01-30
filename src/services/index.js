const DynamicService  = require('./DynamicService.js');
module.exports = function (app) {
  app.use('/d/:modelName', new DynamicService(app));
};
