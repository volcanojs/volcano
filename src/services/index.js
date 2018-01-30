const createWithTemplate = require('./template/template.service.js');
const DynamicService  = require('./DynamicService.js');
module.exports = function (app) {
  createWithTemplate(app, '_services');
  return new Promise((resolve, reject) => {
    app.service('_services').find()
      .then(({ data: _services }) => {
        const _servicesObject = {}
        for (let i = 0; i < _services.length; i++) {
          const _service = _services[i];
          _servicesObject[_service.name] = _service;
        }
        app.use('/d/:modelName', new DynamicService(app, _servicesObject));
        return resolve();
      })
      .catch(error => reject(error));
  });
};
