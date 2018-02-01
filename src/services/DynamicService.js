const createWithTemplate = require('./template/template.service.js');

const VOLCANO_ACTION = {
  OFF: 'off',
  ON: 'on',
  ONCE: 'once',
};

// eslint-disable-next-line no-unused-vars
module.exports = class DynamicService {
  constructor (app, _services) {
    this.getService = this.getService.bind(this);
    this.app = app;
    this._services = _services;
  }
  async find(params) {
    console.log(params);
    const service = await this.getService(params.query.modelName);
    delete params.query.modelName;
    return await service.find(params);
  }

  async get(id, params) {
    console.log(params);
    const service = await this.getService(params.query.modelName);
    delete params.query.modelName;
    return await service.get(id, params);
  }

  async create(data, params) {
    const service = await this.getService(params.query.modelName);
    delete params.query.modelName;
    return await service.create(data, params);
  }

  async update(id, data, params) {
    const service = await this.getService(params.query.modelName);
    delete params.query.modelName;
    const _volcano = Object.assign({}, params.query._volcano);
    delete params.query._volcano;
    if (_volcano.action) {
      return await service[`v_${_volcano.action}`](params, _volcano);
    } else {
      return await service.update(id, data, params);
    }
  }

  async patch(id, data, params) {
    const service = await this.getService(params.query.modelName);
    delete params.query.modelName;
    return await service.patch(id, data, params);
  }

  async remove(id, params) {
    const service = await this.getService(params.query.modelName);
    delete params.query.modelName;
    return await service.remove(id, params);
  }

  async getService(name) {
    if(!this.app.service(name)) {
      await createWithTemplate(this.app, name);
    }
    
    if (!this._services[name]) {
      // TODO: check if exist before create
      const _service = await this.app.service('_services').create({ name });

      this._services[name] = _service;
      return this.app.service(name);
    } else {
      return this.app.service(name);
    }
  }
};
