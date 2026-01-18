const assert = require("assert");
const app = require("../../src/app");

describe("'frequencyOfBilling' service", () => {
  it("registered the service", () => {
    const service = app.service("frequencyOfBilling");

    assert.ok(service, "Registered the service (frequencyOfBilling)");
  });
});
