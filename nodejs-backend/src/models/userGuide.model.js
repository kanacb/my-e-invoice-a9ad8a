module.exports = function (app) {
  const modelName = "user_guide";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for userGuide model
  const schema = new Schema(
    {
      serviceName: {
        type: String,
        required: true,
      },
      expiry: { type: Date, required: false },
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
