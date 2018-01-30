// Initializes the `_template` service on path `/_template`
const createService = require('feathers-nedb');
const createModel = require('../../models/template.model');
const hooks = require('./template.hooks');

module.exports = function (app, modelName) {
  const Model = createModel(app, modelName);
  const paginate = app.get('paginate');

  const options = {
    name: modelName,
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use(`/${modelName}`, createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(modelName);

  service.hooks(hooks);
};
