module.exports = function (app) {
  const modelName = "mail_w_h";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "mail_w_h" model
  const schema = new Schema(
    {
      date: { type: Date, required: false },
      data: { type: Schema.Types.Mixed, required: false },

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
