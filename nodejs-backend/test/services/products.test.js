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
const service = app.service("products").Model;
const patch = {
  productName: "Products updated",
};
let testData = [];
let usersRefDataResults = [];
let measurementResults = [];
let taxTypesResults = [];
let teamsResults = [];
let companyResults = [];
let eInvoiceTypesResults = [];
let countryCodesResults = [];
let invoiceResults = [];

describe("products service", () => {
  let results = [];
  it("registered the service", () => {
    assert.ok(service, "Registered the service (products)");
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

  it("create products data", async () => {
    const standardUser = await usersService.findOne({
      email: "standard@example.com",
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

    // create measurements test schema model
    const measurementsService = app.service("measurements").Model;
    const measurementTestData = [
      {
        measurement: "Kilogram",
        createdBy: standardUser._id,
        updatedBy: standardUser._id,
      },
    ];
    measurementResults = await measurementsService
      .create(measurementTestData)
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

    // create an invoice to link with products
    const invoicesService = app.service("invoices").Model;
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
    invoiceResults = await invoicesService
      .create(invoiceTestData)
      .catch((err) => {
        console.error(err);
        throw err;
      });

    // create a object array of products test schema model
    testData = [
      {
        productName: "Product A",
        quantity: 100,
        unitPrice: 10.5,
        measurement: measurementResults[0]._id,
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
      assert.fail("products creation failed!");
    assert.ok(service, `Created (${results.length} products) success!`);
  });

  it("verify products creation", async () => {
    for (let i = 0; i < results.length; i++) {
      const exists = await service.findById(results[i]._id);
      assert.ok(exists, `userPhone ${results[i]} exists!`);
    }
  });

  it("patch products", async () => {
    for (let i = 0; i < results.length; i++) {
      const patched = await service.findByIdAndUpdate(results[i]._id, patch, {
        new: true,
      });
      assert.ok(patched, `products ${patched} patched!`);
      assert.strictEqual(patched.productName, patch.productName);
    }
  });

  it("remove all products test data", async () => {
    for (let i = 0; i < results.length; i++) {
      const removed = await service.findByIdAndDelete(results[i]._id);
      assert.ok(removed, `products data ${results[i].number} removed!`);
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
      ...countryCodesResults.map((item) =>
        app.service("countryCodes").Model.findByIdAndDelete(item._id),
      ),
      ...eInvoiceTypesResults.map((item) =>
        app.service("eInvoiceTypes").Model.findByIdAndDelete(item._id),
      ),
      ...measurementResults.map((item) =>
        app.service("measurements").Model.findByIdAndDelete(item._id),
      ),
      ...taxTypesResults.map((item) =>
        app.service("taxTypes").Model.findByIdAndDelete(item._id),
      ),
      ...teamsResults.map((item) =>
        app.service("teams").Model.findByIdAndDelete(item._id),
      ),
      ...invoiceResults.map((item) =>
        app.service("invoices").Model.findByIdAndDelete(item._id),
      ),
    ]);
  });
});
