module.exports = function (app) {
  const modelName = "companies";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for companies model
  const schema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      companyNo: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      newCompanyNumber: {
        type: Number,
      },
      DateIncorporated: { type: Date, required: false },
      isdefault: { type: Boolean, default: false },

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
