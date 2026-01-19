module.exports = function (app) {
  const modelName = "identify_type";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for identifyType model
  const schema = new Schema(
    {
      identifyType: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      description: {
        type: String,
        maxLength: 1000,
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
