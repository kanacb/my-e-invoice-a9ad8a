module.exports = function (app) {
  const modelName = "user_phones";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for userPhones model
  const schema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "users" },
      countryCode: {
        type: Number
      },
      operatorCode: {
        type: Number
      },
      number: { type: Number, unique: true },
      type: {
        type: String,
        required: false,
        enum: ["Land line", "Mobile", "Fax"],
      },
      isDefault: { type: Boolean, required: false, default: true },

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
