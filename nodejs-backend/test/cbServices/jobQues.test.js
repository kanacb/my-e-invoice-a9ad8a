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
const service = app.service("jobQues").Model;
const patch = {
  name: "Administrator updated",
};
let testData = [];
let usersRefDataResults = [];
let dynaLoaderResults = [];

describe("jobQues service", () => {
  let results = [];
  it("registered the service", () => {
    assert.ok(service, "Registered the service (jobQues)");
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

  it("create jobQues data", async () => {
    const standardUser = await usersService.findOne({
      email: "standard@example.com",
    });

    // create dynaloader job queue test data
    dynaLoaderResults = await app.service("dynaLoader").Model.create({
      from: "ServiceA",
      to2: "ServiceB",
      name: "Admin",
      createdBy: standardUser._id,
      updatedBy: standardUser._id,
    }).catch(console.error); 

    // create a object array of jobQues test schema model
    testData = [
      {
        name: "Admin",
        type: "Administrator role with full permissions",
        fromService: "ServiceA",
        toService: "ServiceB",
        start: new Date("2026-01-01T00:00:00Z"),  
        end: new Date("2026-12-31T23:59:59Z"),
        jobId: 12345, 
        status: false,
        dynaLoaderId: dynaLoaderResults._id,
        email: "admin@example.com",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      }
    ];
    results = await service.create(testData).catch((err) => {
      console.error(err);
      throw err;
    });
    if (!results || results.length === 0)
      assert.fail("jobQues creation failed!");
    assert.ok(service, `Created (${results.length} jobQues) success!`);
  });

  it("verify jobQues creation", async () => {
    for (let i = 0; i < results.length; i++) {
      const exists = await service.findById(results[i]._id);
      assert.ok(exists, `userPhone ${results[i]} exists!`);
    }
  });

  it("patch jobQues", async () => {
    for (let i = 0; i < results.length; i++) {
      const patched = await service.findByIdAndUpdate(results[i]._id, patch, {
        new: true,
      } );
      assert.ok(patched, `jobQues ${patched} patched!`);
      assert.strictEqual(patched.name, patch.name);
    }
  });

  it("remove all jobQues test data", async () => {
    for (let i = 0; i < results.length; i++) {
      const removed = await service.findByIdAndDelete(results[i]._id);
      assert.ok(removed, `jobQues data ${results[i].number} removed!`);
    }
  });

  it("remove all user test data", async () => {
    await Promise.all([
      ...usersRefDataResults.map((item) =>
        usersService.findByIdAndDelete(item._id),
      ),
      ...[dynaLoaderResults].map((item) =>
        app.service("companies").Model.findByIdAndDelete(item._id),
      ),
      
    ]);

  });
});
