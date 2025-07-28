
import { faker } from "@faker-js/faker";
export default (user,count,invoiceTypeIds,classificationIds,countryOfOriginIds,taxTypeIds,taxType1Ids,teamIds,buyerIds,supplierIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceType: invoiceTypeIds[i % invoiceTypeIds.length],
invoiceDateAndTime: faker.lorem.sentence(""),
originalEInvoiceReferenceNumber: faker.lorem.sentence(""),
no: faker.lorem.sentence(""),
classification: classificationIds[i % classificationIds.length],
subtotal: faker.lorem.sentence(""),
countryOfOrigin: countryOfOriginIds[i % countryOfOriginIds.length],
totalExcludingTax: faker.lorem.sentence(""),
taxType: taxTypeIds[i % taxTypeIds.length],
taxRate: faker.lorem.sentence(""),
taxAmount: faker.lorem.sentence(""),
detailsOfExemption: faker.lorem.sentence(""),
amountExempted: faker.lorem.sentence(""),
discountRate: faker.lorem.sentence(""),
discountAmount: faker.lorem.sentence(""),
description1: faker.lorem.sentence(""),
feeChargeRate: faker.lorem.sentence(""),
feeChargeAmount: faker.lorem.sentence(""),
taxType1: taxType1Ids[i % taxType1Ids.length],
totalTaxableAmountPerTaxType: faker.lorem.sentence(""),
totalTaxAmountPerTaxType: faker.lorem.sentence(""),
detailsOfTaxExemption: faker.lorem.sentence(""),
amountExemptedFromTax: faker.lorem.sentence(""),
discountAmount1: faker.lorem.sentence(""),
description3: faker.lorem.sentence(""),
feeAmount: faker.lorem.sentence(""),
description4: faker.lorem.sentence(""),
invoiceNumber: faker.lorem.sentence(""),
consolidated: faker.datatype.boolean(""),
team: teamIds[i % teamIds.length],
buyer: buyerIds[i % buyerIds.length],
supplier: supplierIds[i % supplierIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
