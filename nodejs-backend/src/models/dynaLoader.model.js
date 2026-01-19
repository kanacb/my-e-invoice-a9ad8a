module.exports = function (app) {
  const modelName = "dyna_loader";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "dynaLoader" model
  const schema = new Schema(
    {
      from: {
        type: String,
        maxLength: 50,
      },
      to2: {
        type: String,
        maxLength: 50,
        default: "",
      },
      name: {
        type: String,
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
