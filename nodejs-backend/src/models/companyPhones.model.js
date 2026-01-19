module.exports = function (app) {
  const modelName = "company_phones";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "companyPhones" model
  const schema = new Schema(
    {
      companyId: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        required: true,
      },
      countryCode: {
        type: Number,
      },
      operatorCode: {
        type: Number,
      },
      number: { type: Number },
      type: {
        type: String,
        enum: ["Land line", "Mobile", "Fax"],
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
