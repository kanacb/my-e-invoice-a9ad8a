module.exports = function (app) {
  const modelName = "superiors";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for superiors model
  const schema = new Schema(
    {
      superior: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      subordinate: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
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
