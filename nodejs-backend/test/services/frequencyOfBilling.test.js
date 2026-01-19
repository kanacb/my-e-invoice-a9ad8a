const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

const usersService = app.service("users").Model;
const service = app.service("frequencyOfBilling").Model;
const patch = {
  frequencyOfBilling: "frequencyOfBilling updated",
};
let testData = [];
let usersRefDataResults = [];

describe("frequencyOfBilling service", () => {
  let results = [];
  it("registered the service", () => {
    assert.ok(service, "Registered the service (frequencyOfBilling)");
  });

  it("create multi ref users", async () => {
    usersRefDataResults = await usersService
      .create(usersRefData)
      .catch((err) => {
        console.error(err);
        throw err;
      });
    if (usersRefDataResults.length === 0) assert.fail("User creation failed!");
    assert.ok(
      usersService,
      `Created (${usersRefDataResults.length} users) success!`,
    );
  });

  it("create frequencyOfBilling data", async () => {
    const standardUser = await usersService.findOne({
      email: "standard@example.com",
    });

    // create a object array of frequencyOfBilling test schema model
    testData = [
      {
        frequencyOfBilling: "Admin",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      }
    ];
    results = await service.create(testData).catch((err) => {
      console.error(err);
      throw err;
    });
    if (!results || results.length === 0)
      assert.fail("frequencyOfBilling creation failed!");
    assert.ok(service, `Created (${results.length} frequencyOfBilling) success!`);
  });

  it("verify frequencyOfBilling creation", async () => {
    for (let i = 0; i < results.length; i++) {
      const exists = await service.findById(results[i]._id);
      assert.ok(exists, `userPhone ${results[i]} exists!`);
    }
  });

  it("patch frequencyOfBilling", async () => {
    for (let i = 0; i < results.length; i++) {
      const patched = await service.findByIdAndUpdate(results[i]._id, patch, {
        new: true,
      } );
      assert.ok(patched, `frequencyOfBilling ${patched} patched!`);
      assert.strictEqual(patched.frequencyOfBilling, patch.frequencyOfBilling);
    }
  });

  it("remove all frequencyOfBilling test data", async () => {
    for (let i = 0; i < results.length; i++) {
      const removed = await service.findByIdAndDelete(results[i]._id);
      assert.ok(removed, `frequencyOfBilling data ${results[i].number} removed!`);
    }
  });

  it("remove all user test data", async () => {
    for (let i = 0; i < usersRefDataResults.length; i++) {
      const removed = await usersService.findByIdAndDelete(
        usersRefDataResults[i]._id,
      );
      assert.ok(removed, `User data ${usersRefDataResults[i].name} removed!`);
    }
  });
});
