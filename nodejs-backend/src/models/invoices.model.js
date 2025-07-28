
    module.exports = function (app) {
        const modelName = 'invoices';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceType: { type: Schema.Types.ObjectId, ref: "e_invoice_types" },
invoiceDateAndTime: { type: Date, required: false },
originalEInvoiceReferenceNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
no: { type: Number, required: false, min: 0, max: 1000000 },
classification: { type: Schema.Types.ObjectId, ref: "classification_codes" },
subtotal: { type: Number, required: false, min: 0, max: 1000000 },
countryOfOrigin: { type: Schema.Types.ObjectId, ref: "country_codes" },
totalExcludingTax: { type: Number, required: false, min: 0, max: 1000000 },
taxType: { type: Schema.Types.ObjectId, ref: "tax_types" },
taxRate: { type: Number, required: false, min: 0, max: 1000000 },
taxAmount: { type: Number, required: false, min: 0, max: 1000000 },
detailsOfExemption: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
amountExempted: { type: Number, required: false, min: 0, max: 1000000 },
discountRate: { type: Number, required: false, min: 0, max: 1000000 },
discountAmount: { type: Number, required: false, min: 0, max: 1000000 },
description1: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
feeChargeRate: { type: Number, required: false, min: 0, max: 1000000 },
feeChargeAmount: { type: Number, required: false, min: 0, max: 1000000 },
taxType1: { type: Schema.Types.ObjectId, ref: "tax_types" },
totalTaxableAmountPerTaxType: { type: Number, required: false, min: 0, max: 1000000 },
totalTaxAmountPerTaxType: { type: Number, required: false, min: 0, max: 1000000 },
detailsOfTaxExemption: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
amountExemptedFromTax: { type: Number, required: false, min: 0, max: 1000000 },
discountAmount1: { type: Number, required: false, min: 0, max: 1000000 },
description3: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
feeAmount: { type: Number, required: false, min: 0, max: 1000000 },
description4: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
invoiceNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
consolidated: { type: Boolean, required: false },
team: { type: Schema.Types.ObjectId, ref: "team" },
buyer: { type: Schema.Types.ObjectId, ref: "companies" },
supplier: { type: Schema.Types.ObjectId, ref: "companies" },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };