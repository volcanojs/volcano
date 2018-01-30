const createWithTemplate = require('./template/template.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = class DynamicService {
  constructor (app) {
    this.getService = this.getService.bind(this);
    this.app = app;
  }
  find(params) {
    return this.getService(params.route.modelName).find(params);
  }

  get(id, params) {
    return this.getService(params.route.modelName).get(id, params);
  }

  create(data, params) {
    return this.getService(params.route.modelName).create(data, params);
  }

  update(id, data, params) {
    return this.getService(params.route.modelName).update(id, data, params);
  }

  patch(id, data, params) {
    return this.getService(params.route.modelName).patch(id, data, params);
  }

  remove(id, params) {
    return this.getService(params.route.modelName).remove(id, params);
  }

  getService(name) {
    if(!this.app.service(name)) {
      createWithTemplate(this.app, name);
    }

    return this.app.service(name);
  }
};
