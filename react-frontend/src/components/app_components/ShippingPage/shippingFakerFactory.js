
import { faker } from "@faker-js/faker";
export default (user,count,shippingRecipientsNameIds,shippingRecipientsAddressCountryNameIds,shippingRecipientsAddressStateNameIds,shippingRecipientsIdentifierTypeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
shippingRecipientsName: shippingRecipientsNameIds[i % shippingRecipientsNameIds.length],
shippingRecipientsAddressCountryName: shippingRecipientsAddressCountryNameIds[i % shippingRecipientsAddressCountryNameIds.length],
shippingRecipientsAddressStateName: shippingRecipientsAddressStateNameIds[i % shippingRecipientsAddressStateNameIds.length],
shippingRecipientsAddressCityName: faker.lorem.sentence("8"),
shippingRecipientsAddressPostalZone: faker.lorem.sentence(""),
shippingRecipientsTin: faker.lorem.sentence("8"),
shippingRecipientsIdentifierType: shippingRecipientsIdentifierTypeIds[i % shippingRecipientsIdentifierTypeIds.length],
businessRegistrationNumberIdentificationNumberPassportNumber: faker.lorem.sentence(""),
billReferenceNumber: faker.lorem.sentence(""),
referenceNumberOfCustomsFormNo19Etc: faker.lorem.sentence(""),
incoterms: faker.lorem.sentence("8"),
freeTradeAgreementFtaInformation: faker.lorem.sentence(""),
authorisationNumberForCertifiedExporter: faker.lorem.sentence(""),
referenceNumberOfCustomsFormNo2: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
