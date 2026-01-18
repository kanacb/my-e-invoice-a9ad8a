const assert = require("assert");
const app = require("../../src/app");

describe("'currencyCodes' service", () => {
  it("registered the service", () => {
    const service = app.service("currencyCodes");

    assert.ok(service, "Registered the service (currencyCodes)");
  });
});
