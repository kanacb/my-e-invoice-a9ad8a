const assert = require("assert");
const app = require("../../src/app");

describe("'phoneNumberPrefix' service", () => {
  it("registered the service", () => {
    const service = app.service("phoneNumberPrefix");

    assert.ok(service, "Registered the service (phoneNumberPrefix)");
  });
});
