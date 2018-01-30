const assert = require('assert');
const app = require('../../src/app');

describe('\'_template\' service', () => {
  it('registered the service', () => {
    const service = app.service('_template');

    assert.ok(service, 'Registered the service');
  });
});
