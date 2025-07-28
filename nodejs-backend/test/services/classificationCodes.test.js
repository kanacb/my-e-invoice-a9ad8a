const assert = require('assert');
const app = require('../../src/app');

describe('\'classificationCodes\' service', () => {
  it('registered the service', () => {
    const service = app.service('classificationCodes');

    assert.ok(service, 'Registered the service (classificationCodes)');
  });
});
