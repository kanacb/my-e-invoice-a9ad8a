module.exports = function (app) {
  const modelName = "suppliers";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for suppliers model
  const schema = new Schema(
    {
      suppliersName: { type: Schema.Types.ObjectId, ref: "companies" },
      suppliersTin: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      suppliersSstRegistrationNumber: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      identifierType: { type: Schema.Types.ObjectId, ref: "identify_type" },
      identifierNumber: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      suppliersMsicCode: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      suppliersTourismTaxRegistrationNumber: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      suppliersBusinessActivityDescription: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      suppliersEMail: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      theFirstSuppliersContactNumber: {
        type: Schema.Types.ObjectId,
        ref: "phone_number_prefix",
      },
      suppliersContactNumber: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      countryName: { type: Schema.Types.ObjectId, ref: "country_codes" },
      stateName: { type: Schema.Types.ObjectId, ref: "state_codes" },
      cityName: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      postalZone: {
        type: String,
        minLength: null,
        maxLength: 150,
        index: true,
        trim: true,
      },
      suppliersBankAccountNumber: {
        type: Number
      },
      paymentTerms: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      prePaymentAmount: { type: Number, min: 0, max: 1000000 },
      prePaymentDate: { type: Date, required: false },
      prePaymentReferenceNumber: {
        type: String,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
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
