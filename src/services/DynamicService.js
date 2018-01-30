const createWithTemplate = require('./template/template.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = class DynamicService {
  constructor (app, _services) {
    this.getService = this.getService.bind(this);
    this.app = app;
    this._services = _services;
  }
  async find(params) {
    const { modelName } = params.route;
    const service = await this.getService(modelName);
    return await service.find(params);
  }

  async get(id, params) {
    const { modelName } = params.route;
    const service = await this.getService(modelName);
    return await service.get(id, params);
  }

  async create(data, params) {
    const { modelName } = params.route;
    const service = await this.getService(modelName);
    return await service.create(data, params);
  }

  async update(id, data, params) {
    const { modelName } = params.route;
    const service = await this.getService(modelName);
    return await service.update(id, data, params);
  }

  async patch(id, data, params) {
    const { modelName } = params.route;
    const service = await this.getService(modelName);
    return await service.patch(id, data, params);
  }

  async remove(id, params) {
    const { modelName } = params.route;
    const service = await this.getService(modelName);
    return await service.remove(id, params);
  }

  getService(name) {
    if(!this.app.service(name)) {
      createWithTemplate(this.app, name);
    }
    return new Promise((resolve, reject) => {
      if (!this._services[name]) {
        // TODO: check if exist before create
        this.app.service('_services').create({ name })
          .then(_service => {
            this._services[name] = _service;
            return resolve(this.app.service(name));
          })
          .catch(error => reject(error));
      } else {
        return resolve(this.app.service(name));
      }
    });
  }
};
