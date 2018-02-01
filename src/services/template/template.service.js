// Initializes the `template` service on path `/_template`
const createService = require('../../packages/feathers-mongodb/lib');
const hooks = require('./template.hooks');

module.exports = function (app, modelName) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  return new Promise((resolve, reject) => {
    mongoClient.then(db => {
      options.Model = db.collection(modelName);
      // Initialize our service with any options it requires
      app.use(`/${modelName}`, createService(options));
    
      // Get our initialized service so that we can register hooks and filters
      const service = app.service(modelName);

      service.hooks(hooks);

      return resolve();
    }).catch(error => reject(error));
  });
};
