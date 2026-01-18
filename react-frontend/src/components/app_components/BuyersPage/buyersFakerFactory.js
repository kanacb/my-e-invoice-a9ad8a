import { faker } from "@faker-js/faker";
export default (
  user,
  count,
  buyersNameIds,
  identifierTypeIds,
  buyersAddressCountryNameIds,
  buyersAddressStateNameIds,
  theFirstBuyersContactNumberIds,
  invoiceCurrencyIds,
  frequencyOfBillingIds,
  paymentModeIds,
  teamIds,
  invoiceIdIds,
) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      buyersName: buyersNameIds[i % buyersNameIds.length],
      buyersTin: faker.date.past(""),
      buyersSstRegistrationNumber: faker.date.past(""),
      identifierType: identifierTypeIds[i % identifierTypeIds.length],
      businessRegistrationNumberIdentificationNumberPassportNumber:
        faker.date.past(""),
      buyersEMail: faker.date.past(""),
      buyersAddressCountryName:
        buyersAddressCountryNameIds[i % buyersAddressCountryNameIds.length],
      buyersAddressStateName:
        buyersAddressStateNameIds[i % buyersAddressStateNameIds.length],
      buyersAddressCityName: faker.date.past(""),
      buyersAddressPostalZone: faker.date.past(""),
      theFirstBuyersContactNumber:
        theFirstBuyersContactNumberIds[
          i % theFirstBuyersContactNumberIds.length
        ],
      buyersContactNumber: faker.date.past(""),
      invoiceCurrency: invoiceCurrencyIds[i % invoiceCurrencyIds.length],
      currencyExchangeRate: faker.date.past(""),
      frequencyOfBilling:
        frequencyOfBillingIds[i % frequencyOfBillingIds.length],
      billingPeriodStartDate: faker.date.past(""),
      billingPeriodEndDate: faker.date.past(""),
      paymentMode: paymentModeIds[i % paymentModeIds.length],
      team: teamIds[i % teamIds.length],
      invoiceId: invoiceIdIds[i % invoiceIdIds.length],

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
