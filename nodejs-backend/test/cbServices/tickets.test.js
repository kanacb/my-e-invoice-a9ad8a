const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Super User",
    email: "super@example.com",
    password: "password",
  },
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

const usersService = app.service("users").Model;
const service = app.service("tickets").Model;
let testData = [];
let usersRefDataResults = [];
const patch = {
  type: "error",
};

describe("tickets service", () => {
  let results = [];
  it("registered the service", () => {
    assert.ok(service, "Registered the service (tickets)");
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

  it("create tickets data", async () => {
    const superUser = await usersService.findOne({
      email: "super@example.com",
    });
    const standardUser = await usersService.findOne({
      email: "standard@example.com",
    });

    // create a object array of tickets test schema model
    testData = [
      {
        title: "Issue with login",
        description: "Unable to login with correct credentials",
        status: "open", 
        priority: "high",
        type: "bug",
        reporter: standardUser._id,
        asignee: superUser._id,
        closed: "Closed",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      }
    ];
    results = await service.create(testData).catch((err) => {
      console.error(err);
      throw err;
    });
    if (!results || results.length === 0)
      assert.fail("tickets creation failed!");
    assert.ok(service, `Created (${results.length} tickets) success!`);
  });

  it("verify tickets creation", async () => {
    for (let i = 0; i < results.length; i++) {
      const exists = await service.findById(results[i]._id);
      assert.ok(exists, `userPhone ${results[i]} exists!`);
    }
  });

  it("patch tickets", async () => {
    for (let i = 0; i < results.length; i++) {
      const patched = await service.findByIdAndUpdate(results[i]._id, patch, {
        new: true,
      } );
      assert.ok(patched, `tickets ${patched} patched!`);
      assert.strictEqual(patched.type, patch.type);
    }
  });

  it("remove all tickets test data", async () => {
    for (let i = 0; i < results.length; i++) {
      const removed = await service.findByIdAndDelete(results[i]._id);
      assert.ok(removed, `tickets data ${results[i].number} removed!`);
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
