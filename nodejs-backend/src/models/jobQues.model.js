
module.exports = function (app) {
  const modelName = "job_ques";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "job_ques" model
  const schema = new Schema(
    {
      name: {
        type: String,
        required: true,
        index: true,
        trim: true,
      },
      type: {
        type: String,
      },
      fromService: {
        type: String,
      },
      toService: {
        type: String,
      },
      start: { type: Date, required: false },
      end: { type: Date, required: false },
      jobId: { type: Number, min: 2, max: 1000000 },
      status: { type: Boolean, default: false },
      dynaLoaderId: { type: Schema.Types.ObjectId, ref: "dyna_loader" },
      email: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
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
