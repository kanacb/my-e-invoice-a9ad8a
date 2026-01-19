module.exports = function (app) {
  const modelName = "mail_ques";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: true },
      from: { type: String, required: true },
      recipients: { type: [String], required: true },
      status: { type: Boolean, default: false },
      data: { type: Schema.Types.Mixed },
      templateId: { type: String, required: true },
      subject: { type: String, required: true },
      content: { type: String },
      jobId: { type: Number },
      errorMessage: { type: String },
      end: { type: Date, required: false },
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
