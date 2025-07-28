const assert = require('assert');
const app = require('../../src/app');

describe('\'countryCodes\' service', () => {
  it('registered the service', () => {
    const service = app.service('countryCodes');

    assert.ok(service, 'Registered the service (countryCodes)');
  });
});
