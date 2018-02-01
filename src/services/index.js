const createWithTemplate = require('./template/template.service.js');
const DynamicService  = require('./DynamicService.js');
module.exports = function (app) {
  return new Promise((resolve, reject) => {
    createWithTemplate(app, '_services')
      .then(() => {
        app.service('_services').find()
          .then(({ data: _services }) => {
            const _servicesObject = {};
            for (let i = 0; i < _services.length; i++) {
              const _service = _services[i];
              _servicesObject[_service.name] = _service;
            }
            app.use('/d', new DynamicService(app, _servicesObject));
            console.log(Object.keys(app.services))
            return resolve();
          });
      })
      .catch(error => reject(error));
  });
};
