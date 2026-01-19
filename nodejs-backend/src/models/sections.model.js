module.exports = function (app) {
  const modelName = "sections";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for sections model
  const schema = new Schema(
    {
      departmentId: { type: Schema.Types.ObjectId, ref: "departments" },
      name: {
        type: String,
        required: true,
        unique: true,
        lowercase: false,
        uppercase: false,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      code: {
        type: String,
        unique: true,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      isDefault: { type: Boolean, default: false },

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
