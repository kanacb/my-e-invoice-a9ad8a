const assert = require('assert');
const app = require('../../src/app');

describe('\'stateCodes\' service', () => {
  it('registered the service', () => {
    const service = app.service('stateCodes');

    assert.ok(service, 'Registered the service (stateCodes)');
  });
});
