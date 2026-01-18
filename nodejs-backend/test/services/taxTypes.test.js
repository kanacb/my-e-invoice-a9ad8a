const assert = require("assert");
const app = require("../../src/app");

describe("'taxTypes' service", () => {
  it("registered the service", () => {
    const service = app.service("taxTypes");

    assert.ok(service, "Registered the service (taxTypes)");
  });
});
