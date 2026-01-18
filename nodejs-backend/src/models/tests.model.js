module.exports = function (app) {
  const modelName = "tests";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for tests model
  const schema = new Schema(
    {
      stack: {
        type: String,
        maxLength: 1000,
        index: true
      },
      service: {
        type: String,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      passed: { type: Number, required: false, min: 0, max: 10000 },
      failed: { type: Number, required: false, min: 0, max: 10000 },
      notes: {
        type: String,
        maxLength: 1000,
        index: true
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
