import { faker } from "@faker-js/faker";
export default (
  user,
  count,
  suppliersNameIds,
  identifierTypeIds,
  theFirstSuppliersContactNumberIds,
  countryNameIds,
  stateNameIds,
  teamIds,
  invoiceIdIds,
) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      suppliersName: suppliersNameIds[i % suppliersNameIds.length],
      suppliersTin: faker.lorem.sentence(""),
      suppliersSstRegistrationNumber: faker.lorem.sentence(""),
      identifierType: identifierTypeIds[i % identifierTypeIds.length],
      identifierNumber: faker.lorem.sentence(""),
      suppliersMsicCode: faker.lorem.sentence(""),
      suppliersTourismTaxRegistrationNumber: faker.lorem.sentence(""),
      suppliersBusinessActivityDescription: faker.lorem.sentence(""),
      suppliersEMail: faker.lorem.sentence(""),
      theFirstSuppliersContactNumber:
        theFirstSuppliersContactNumberIds[
          i % theFirstSuppliersContactNumberIds.length
        ],
      suppliersContactNumber: faker.lorem.sentence(""),
      countryName: countryNameIds[i % countryNameIds.length],
      stateName: stateNameIds[i % stateNameIds.length],
      cityName: faker.lorem.sentence(""),
      postalZone: faker.lorem.sentence("8"),
      suppliersBankAccountNumber: faker.lorem.sentence(""),
      paymentTerms: faker.lorem.sentence(""),
      prePaymentAmount: faker.lorem.sentence(""),
      prePaymentDate: faker.lorem.sentence(""),
      prePaymentReferenceNumber: faker.lorem.sentence(""),
      team: teamIds[i % teamIds.length],
      invoiceId: invoiceIdIds[i % invoiceIdIds.length],

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
