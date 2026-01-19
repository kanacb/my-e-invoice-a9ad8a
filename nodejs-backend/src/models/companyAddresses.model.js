module.exports = function (app) {
  const modelName = "company_addresses";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "companyAddresses" model
  const schema = new Schema(
    {
      companyId: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        required: true,
      },
      Street1: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      Street2: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      Poscode: {
        type: String,
        minLength: 0,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      City: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      State: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      Province: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      Country: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      isDefault: { type: Boolean, default: false },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
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
