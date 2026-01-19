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
const service = app.service("suppliers").Model;
const patch = {
  suppliersMsicCode: "UPDATED",
};
let testData = [];
let usersRefDataResults = [];
let teamsResults = [];
let companyResults = [];
let countryCodesResults = [];
let stateCodesResults = [];
let identifierTypeResults = [];
let phoneNumberPrefixResults = [];

describe("suppliers service", () => {
  let results = [];
  it("registered the service", () => {
    assert.ok(service, "Registered the service (suppliers)");
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

  it("create suppliers data", async () => {
    const standardUser = await usersService.findOne({
      email: "standard@example.com",
    });

    // create phone number prefix
    const phoneNumberPrefixTestData = [
      {
        phoneNumberPrefix: "+1",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    phoneNumberPrefixResults = await app
      .service("phoneNumberPrefix")
      .Model.create(phoneNumberPrefixTestData)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // create identifyType test Data
    const identifierTypeTestData = [
      {
        identifyType: "GSTIN",
        description: "Goods and Services Tax Identification Number",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    identifierTypeResults = await app
      .service("identifyType")
      .Model.create(identifierTypeTestData)
      .catch(console.error);

    // create teams test schema model
    const teamsService = app.service("teams").Model;
    const teamsTestData = [
      {
        name: "Team A",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    teamsResults = await teamsService.create(teamsTestData).catch((err) => {
      console.error(err);
      throw err;
    });

    // create country code test data
    const countryCodesService = app.service("countryCodes").Model;
    const countryCodesTestData = [
      {
        countryCode: "US",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    countryCodesResults = await countryCodesService
      .create(countryCodesTestData)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    const stateCodesTestData = [
      {
        stateCode: "KA",
        description: "Karnataka",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    stateCodesResults = await app
      .service("stateCodes")
      .Model.create(stateCodesTestData)
      .catch(console.error);

    // create company test data
    const companyTestData = [
      {
        name: "Test Buyer Company",
        companyNo: "TC123456",
        newCompanyNumber: 123456,
        DateOfIncorporation: new Date("2020-01-01"),
        isdefault: false,
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
      {
        name: "Test Supplier Company",
        companyNo: "TC923456",
        newCompanyNumber: 123456,
        DateOfIncorporation: new Date("2020-01-01"),
        isdefault: true,
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    companyResults = await app
      .service("companies")
      .Model.create(companyTestData)
      .catch(console.error);

    // create a object array of suppliers test schema model
    testData = [
      {
        suppliersName: companyResults[1]._id,
        suppliersTin: "Value Added Tax",
        suppliersSstRegistrationNumber: "asfasdf",
        identifierType: identifierTypeResults[0]._id,
        identifierNumber: 12,
        suppliersMsicCode: "MCID",
        suppliersTourismTaxRegistrationNumber: "2EWE",
        suppliersBusinessActivityDescription: "RTERT",
        suppliersEMail: "sample@abc.com",
        theFirstSuppliersContactNumber: phoneNumberPrefixResults[0]._id,
        suppliersContactNumber: "123456768",
        countryName: countryCodesResults[0]._id,
        stateName: stateCodesResults[0]._id,
        cityName: "Petaling Jaya",
        postalZone: "47301",
        suppliersBankAccountNumber: 123456789,
        paymentTerms: "COD",
        prePaymentAmount: 1000,
        prePaymentDate: Date.now(),
        prePaymentReferenceNumber: "asdfasdf",
        team: teamsResults[0]._id,
        invoiceId: null,
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    results = await service.create(testData).catch((err) => {
      console.error(err);
      throw err;
    });
    if (!results || results.length === 0)
      assert.fail("suppliers creation failed!");
    assert.ok(service, `Created (${results.length} suppliers) success!`);
  });

  it("verify suppliers creation", async () => {
    for (let i = 0; i < results.length; i++) {
      const exists = await service.findById(results[i]._id);
      assert.ok(exists, `userPhone ${results[i]} exists!`);
    }
  });

  it("patch suppliers", async () => {
    for (let i = 0; i < results.length; i++) {
      const patched = await service.findByIdAndUpdate(results[i]._id, patch, {
        new: true,
      });
      assert.ok(patched, `suppliers ${patched} patched!`);
      assert.strictEqual(patched.suppliersMsicCode, patch.suppliersMsicCode);
    }
  });

  it("remove all suppliers test data", async () => {
    for (let i = 0; i < results.length; i++) {
      const removed = await service.findByIdAndDelete(results[i]._id);
      assert.ok(removed, `suppliers data ${results[i].number} removed!`);
    }
  });

  it("remove all user test data", async () => {
    for (let i = 0; i < usersRefDataResults.length; i++) {
      const removed = await usersService.findByIdAndDelete(
        usersRefDataResults[i]._id,
      );
      assert.ok(removed, `User data ${usersRefDataResults[i].name} removed!`);
    }

    await Promise.all([
      ...teamsResults.map((item) =>
        app.service("teams").Model.findByIdAndDelete(item._id),
      ),
      ...companyResults.map((item) =>
        app.service("companies").Model.findByIdAndDelete(item._id),
      ),
      ...countryCodesResults.map((item) =>
        app.service("countryCodes").Model.findByIdAndDelete(item._id),
      ),
      ...stateCodesResults.map((item) =>
        app.service("stateCodes").Model.findByIdAndDelete(item._id),
      ),
      ...identifierTypeResults.map((item) =>
        app.service("identifyType").Model.findByIdAndDelete(item._id),
      ),
      ...phoneNumberPrefixResults.map((item) =>
        app.service("phoneNumberPrefix").Model.findByIdAndDelete(item._id),
      ),
    ]);
  });
});
