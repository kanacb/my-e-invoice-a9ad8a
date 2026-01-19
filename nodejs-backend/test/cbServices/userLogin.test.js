const assert = require("assert");
const app = require("../../src/app");

const service = app.service("userLogin").Model;
let testData = [
  {
    loginEmail: "super@examplpe.com",
    code: 123456,
    access: "full",
    sendMailCounter: 1,
  },
];
const patch = {
  access: "patched_access",
};

describe("'userLogin' service", () => {
  let results = [];
  it("registered the service", () => {
    assert.ok(service, "Registered the service (userLogin)");
  });
  
  it("create multi userlogin service", async () => {
    results = await service.create(testData).catch((err) => {
      console.error(err);
      throw err;
    });
    if (results.length === 0) assert.fail("userlogin creation failed!");
    assert.ok(service, `Created (${results.length} userlogin ) success!`);
    assert.ok(service, "Registered the service (userLogin)");
  });

  it("verify userLogin creation", async () => {
    for (let i = 0; i < results.length; i++) {
      const exists = await service.findById(results[i]._id);
      assert.ok(exists, `userLogin ${results[i]} exists!`);
    }
  });

  it("patch users", async () => {
    for (let i = 0; i < results.length; i++) {
      const patched = await service.findByIdAndUpdate(results[i]._id, patch, {
        new: true,
      });
      assert.ok(patched, `userLogin ${patched} patched!`);
    }
  });

  it("remove all userLogin test data", async () => {
    for (let i = 0; i < results.length; i++) {
      const removed = await service.findByIdAndDelete(results[i]._id);
      assert.ok(removed, `userLogin data ${results[i].number} removed!`);
    }
  });
});
