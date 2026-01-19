module.exports = function (app) {
  const modelName = "teams";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for teams model
  const schema = new Schema(
    {
      name: { type: String, required: true },
      users: { type: [Schema.Types.ObjectId], ref: "users" },
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
