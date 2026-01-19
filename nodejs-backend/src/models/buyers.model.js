module.exports = function (app) {
  const modelName = "buyers";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "buyers" model
  const schema = new Schema(
    {
      buyersName: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        required: true,
      },
      buyersTin: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      buyersSstRegistrationNumber: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      identifierType: { type: Schema.Types.ObjectId, ref: "identify_type" },
      businessRegistrationNumberIdentificationNumberPassportNumber: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      buyersEMail: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      buyersAddressCountryName: {
        type: Schema.Types.ObjectId,
        ref: "country_codes",
      },
      buyersAddressStateName: {
        type: Schema.Types.ObjectId,
        ref: "state_codes",
      },
      buyersAddressCityName: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      buyersAddressPostalZone: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      theFirstBuyersContactNumber: {
        type: Schema.Types.ObjectId,
        ref: "phone_number_prefix",
      },
      buyersContactNumber: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      invoiceCurrency: { type: Schema.Types.ObjectId, ref: "currency_codes" },
      currencyExchangeRate: {
        type: Number,
      },
      frequencyOfBilling: {
        type: Schema.Types.ObjectId,
        ref: "frequency_of_billing",
      },
      billingPeriodStartDate: { type: Date, required: false },
      billingPeriodEndDate: { type: Date, required: false },
      paymentMode: { type: Schema.Types.ObjectId, ref: "payment_modes" },
      team: { type: Schema.Types.ObjectId, ref: "teams" },
      invoiceId: { type: Schema.Types.ObjectId, ref: "invoices" },
      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
