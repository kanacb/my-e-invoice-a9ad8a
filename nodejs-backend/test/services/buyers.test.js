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
const service = app.service("buyers").Model;
const patch = {
  description: "buyers updated",
};
let testData = [];
let usersRefDataResults = [];
let identifierTypeResults = [];
let countryCodesResults = [];
let stateCodesResults = [];
let phoneNumberPrefixResults = [];
let currencyCodesResults = [];
let frequencyOfBillingResults = [];
let paymentModesResults = [];
let teamsResults = [];
let invoiceResults = [];
let taxTypesResults = [];
let eInvoiceTypesResults = [];
let companyResults = [];

describe("buyers service", () => {
  let results = [];
  it("registered the service", () => {
    assert.ok(service, "Registered the service (buyers)");
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

  it("create buyers data", async () => {
    const standardUser = await usersService.findOne({
      email: "standard@example.com",
    });

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

    // create currency codes
    const currencyCodesTestData = [
      {
        currencyCode: "MYR2",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    currencyCodesResults = await app
      .service("currencyCodes")
      .Model.create(currencyCodesTestData)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // create freq of billing number prefix
    const freqOfBillingTestData = [
      {
        frequencyOfBilling: "monthly",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    frequencyOfBillingResults = await app
      .service("frequencyOfBilling")
      .Model.create(freqOfBillingTestData)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // create paymentModes
    const paymentModesTestData = [
      {
        paymentMode: "monthly",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    paymentModesResults = await app
      .service("paymentModes")
      .Model.create(paymentModesTestData)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // create teams
    const teamsTestData = [
      {
        name: "monthly",
        users: [standardUser._id],
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    teamsResults = await app
      .service("teams")
      .Model.create(teamsTestData)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // create a einvoiceTypes test schema model
    const eInvoiceTypesService = app.service("eInvoiceTypes").Model;
    const eInvoiceTypesTestData = [
      {
        eInvoiceTypes: "Type A",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    eInvoiceTypesResults = await eInvoiceTypesService
      .create(eInvoiceTypesTestData)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // create a taxTypes test schema model
    const taxTypesService = app.service("taxTypes").Model;
    const taxTypesTestData = [
      {
        taxType: "VAT",
        description: "Value Added Tax",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    taxTypesResults = await taxTypesService
      .create(taxTypesTestData)
      .catch((err) => {
        console.error(err);
        throw err;
      });

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

    // create invoice
    const invoiceTestData = [
      {
        invoiceType: eInvoiceTypesResults[0]._id,
        invoiceDateAndTime: new Date(),
        originalEInvoiceReferenceNumber: "INV-1001",
        no: 1,
        subtotal: 1000,
        countryOfOrigin: countryCodesResults[0]._id,
        totalExcludingTax: 1100,
        taxRate: 10,
        taxType: taxTypesResults[0]._id,
        taxAmount: 100,
        detailsOfExemption: "N/A",
        amountExempted: 0,
        discountRate: 5,
        discountAmount: 50,
        description1: "Test Invoice",
        feeChargeRate: 2,
        feeChargeAmount: 20,
        totalTaxableAmountPerTaxType: 1050,
        totalTaxAmountPerTaxType: 100,
        detailsOfTaxExemption: "N/A",
        amountExemptedFromTax: 0,
        discountAmount1: 50,
        description3: "Test Invoice",
        feeAmount: 20,
        description4: "Test Invoice",
        invoiceNumber: "INV-1001",
        consolidated: false,
        team: teamsResults[0]._id,
        buyer: companyResults[0]._id,
        supplier: companyResults[1]._id,
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];

    invoiceResults = await app
      .service("invoices")
      .Model.create(invoiceTestData)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // create a object array of buyers test schema model
    testData = [
      {
        buyersName: companyResults[0]._id,
        buyersTin: "123123",
        buyersSstRegistrationNumber: "sdasdfa",
        identifierType: identifierTypeResults[0]._id,
        businessRegistrationNumberIdentificationNumberPassportNumber: "Admin",
        buyersEMail: "Admin",
        buyersAddressCountryName: countryCodesResults[0]._id,
        buyersAddressStateName: stateCodesResults[0]._id,
        buyersAddressCityName: "Petaling Jaya",
        buyersAddressPostalZone: "02114",
        theFirstBuyersContactNumber: phoneNumberPrefixResults[0]._id,
        buyersContactNumber: "1212154",
        invoiceCurrency: currencyCodesResults[0]._id,
        currencyExchangeRate: 4.24,
        frequencyOfBilling: frequencyOfBillingResults[0]._id,
        billingPeriodStartDate: new Date("2026-01-10"),
        billingPeriodEndDate: Date.now(),
        paymentMode: paymentModesResults[0]._id,
        team: teamsResults[0]._id,
        invoiceId: invoiceResults[0]._id,
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    results = await service.create(testData).catch((err) => {
      console.error(err);
      throw err;
    });
    if (!results || results.length === 0)
      assert.fail("buyers creation failed!");
    assert.ok(service, `Created (${results.length} buyers) success!`);
  });

  it("verify buyers creation", async () => {
    for (let i = 0; i < results.length; i++) {
      const exists = await service.findById(results[i]._id);
      assert.ok(exists, `userPhone ${results[i]} exists!`);
    }
  });

  it("patch buyers", async () => {
    for (let i = 0; i < results.length; i++) {
      const patched = await service.findByIdAndUpdate(results[i]._id, patch, {
        new: true,
      });
      assert.ok(patched, `buyers ${patched} patched!`);
      assert.strictEqual(patched.type, patch.type);
    }
  });

  it("remove all buyers test data", async () => {
    for (let i = 0; i < results.length; i++) {
      const removed = await service.findByIdAndDelete(results[i]._id);
      assert.ok(removed, `buyers data ${results[i].number} removed!`);
    }
  });

  it("remove all user test data", async () => {
    await Promise.all([
      ...usersRefDataResults.map((item) =>
        usersService.findByIdAndDelete(item._id),
      ),
      ...companyResults.map((item) =>
        app.service("companies").Model.findByIdAndDelete(item._id),
      ),
      ...identifierTypeResults.map((item) =>
        app.service("identifyType").Model.findByIdAndDelete(item._id),
      ),
      ...countryCodesResults.map((item) =>
        app.service("countryCodes").Model.findByIdAndDelete(item._id),
      ),
      ...stateCodesResults.map((item) =>
        app.service("stateCodes").Model.findByIdAndDelete(item._id),
      ),
      ...phoneNumberPrefixResults.map((item) =>
        app.service("phoneNumberPrefix").Model.findByIdAndDelete(item._id),
      ),
      ...currencyCodesResults.map((item) =>
        app.service("currencyCodes").Model.findByIdAndDelete(item._id),
      ),
      ...frequencyOfBillingResults.map((item) =>
        app.service("frequencyOfBilling").Model.findByIdAndDelete(item._id),
      ),
      ...paymentModesResults.map((item) =>
        app.service("paymentModes").Model.findByIdAndDelete(item._id),
      ),
      ...eInvoiceTypesResults.map((item) =>
        app.service("eInvoiceTypes").Model.findByIdAndDelete(item._id),
      ),
      ...invoiceResults.map((item) =>
        app.service("invoices").Model.findByIdAndDelete(item._id),
      ),
      ...taxTypesResults.map((item) =>
        app.service("taxTypes").Model.findByIdAndDelete(item._id),
      ),
      ...eInvoiceTypesResults.map((item) =>
        app.service("eInvoiceTypes").Model.findByIdAndDelete(item._id),
      ),
      ...teamsResults.map((item) =>
        app.service("teams").Model.findByIdAndDelete(item._id),
      ),
    ]);
  });
});
