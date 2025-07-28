
    module.exports = function (app) {
        const modelName = 'shipping';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            shippingRecipientsName: { type: Schema.Types.ObjectId, ref: "companies" },
shippingRecipientsAddressCountryName: { type: Schema.Types.ObjectId, ref: "country_codes" },
shippingRecipientsAddressStateName: { type: Schema.Types.ObjectId, ref: "state_codes" },
shippingRecipientsAddressCityName: { type:  String , maxLength: 150, index: true, trim: true },
shippingRecipientsAddressPostalZone: { type: Number, required: false, min: 0, max: 10000000 },
shippingRecipientsTin: { type:  String , maxLength: 150, index: true, trim: true },
shippingRecipientsIdentifierType: { type: Schema.Types.ObjectId, ref: "identify_type" },
businessRegistrationNumberIdentificationNumberPassportNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
billReferenceNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
referenceNumberOfCustomsFormNo19Etc: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
incoterms: { type:  String , maxLength: 150, index: true, trim: true },
freeTradeAgreementFtaInformation: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
authorisationNumberForCertifiedExporter: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
referenceNumberOfCustomsFormNo2: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },

            
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