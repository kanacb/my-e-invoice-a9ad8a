

module.exports = function (app) {
  const modelName = "roles";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for roles model
  const schema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      description: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      isDefault: { type: Boolean, default: false },
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
