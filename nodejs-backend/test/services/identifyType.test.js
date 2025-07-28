const assert = require('assert');
const app = require('../../src/app');

describe('\'identifyType\' service', () => {
  it('registered the service', () => {
    const service = app.service('identifyType');

    assert.ok(service, 'Registered the service (identifyType)');
  });
});
