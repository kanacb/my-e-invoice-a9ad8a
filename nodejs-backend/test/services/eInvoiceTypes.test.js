const assert = require("assert");
const app = require("../../src/app");

describe("'eInvoiceTypes' service", () => {
  it("registered the service", () => {
    const service = app.service("eInvoiceTypes");

    assert.ok(service, "Registered the service (eInvoiceTypes)");
  });
});
