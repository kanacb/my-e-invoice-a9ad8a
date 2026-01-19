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
const service = app.service("shipping").Model;
const patch = {
  shippingRecipientsAddressCityName: "Second City",
};
let testData = [];
let usersRefDataResults = [];
let companyResults = [];
let countryCodeResults = [];
let stateCodesResults = [];
let identifierTypeResults = [];

describe("shipping service", () => {
  let results = [];
  it("registered the service", () => {
    assert.ok(service, "Registered the service (shipping)");
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

  it("create shipping data", async () => {
    const standardUser = await usersService.findOne({
      email: "standard@example.com",
    });

    // create company test data
    const companyTestData = [
      {
        name: "Test Company",
        companyNo: "TC123456",
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

    // create countryCode test data
    const countryCodeTestData = [
      {
        countryCode: "IN",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    countryCodeResults = await app
      .service("countryCodes")
      .Model.create(countryCodeTestData)
      .catch(console.error);

    // create stateCodes test data
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

    // create IdentifierType test data
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

    // create a object array of shipping test schema model
    testData = [
      {
        shippingRecipientsName: companyResults[0]._id,
        shippingRecipientsAddressCountryName: countryCodeResults[0]._id,
        shippingRecipientsAddressStateName: stateCodesResults[0]._id,
        shippingRecipientsAddressCityName: "Petaling Jaya",
        shippingRecipientsAddressPostalZone: "47301",
        shippingRecipientsTin: "123456789",
        shippingRecipientsIdentifierType: identifierTypeResults[0]._id,
        businessRegistrationNumberIdentificationNumberPassportNumber:
          "BRN123456",
        billReferenceNumber: "Taman Sains Selangor",
        referenceNumberOfCustomsFormNo19Etc: "RFN123456",
        incoterms: "DAP",
        freeTradeAgreementFtaInformation: "FTA123456",
        authorisationNumberForCertifiedExporter: "AECE123456",
        referenceNumberOfCustomsFormNo2: "Net 30",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    results = await service.create(testData).catch((err) => {
      console.error(err);
      throw err;
    });
    if (!results || results.length === 0)
      assert.fail("shipping creation failed!");
    assert.ok(service, `Created (${results.length} shipping) success!`);
  });

  it("verify shipping creation", async () => {
    for (let i = 0; i < results.length; i++) {
      const exists = await service.findById(results[i]._id);
      assert.ok(exists, `userPhone ${results[i]} exists!`);
    }
  });

  it("patch shipping", async () => {
    for (let i = 0; i < results.length; i++) {
      const patched = await service.findByIdAndUpdate(results[i]._id, patch, {
        new: true,
      });
      assert.ok(patched, `shipping ${patched} patched!`);
      assert.strictEqual(patched.shippingRecipientsAddressCityName, patch.shippingRecipientsAddressCityName);
    }
  });

  it("remove all shipping test data", async () => {
    for (let i = 0; i < results.length; i++) {
      const removed = await service.findByIdAndDelete(results[i]._id);
      assert.ok(removed, `shipping data ${results[i].number} removed!`);
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
      ...companyResults.map((item) =>
        app.service("companies").Model.findByIdAndDelete(item._id),
      ),
      ...countryCodeResults.map((item) =>
        app.service("countryCodes").Model.findByIdAndDelete(item._id),
      ),
      ...stateCodesResults.map((item) =>
        app.service("stateCodes").Model.findByIdAndDelete(item._id),
      ),
      ...identifierTypeResults.map((item) =>
        app.service("identifyType").Model.findByIdAndDelete(item._id),
      ),
    ]);
  });
});
