module.exports = function (app) {
  const modelName = "currency_codes";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "currencyCodes" model
  const schema = new Schema(
    {
      currencyCode: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },

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
