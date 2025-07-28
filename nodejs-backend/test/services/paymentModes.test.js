const assert = require('assert');
const app = require('../../src/app');

describe('\'paymentModes\' service', () => {
  it('registered the service', () => {
    const service = app.service('paymentModes');

    assert.ok(service, 'Registered the service (paymentModes)');
  });
});
