const assert = require("assert");
const app = require("../../src/app");

describe("'buyers' service", () => {
  it("registered the service", () => {
    const service = app.service("buyers");

    assert.ok(service, "Registered the service (buyers)");
  });
});
