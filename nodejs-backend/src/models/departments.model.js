module.exports = function (app) {
  const modelName = "departments";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "departments" model
  const schema = new Schema(
    {
      companyId: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        required: true,
      },
      name: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      code: {
        type: String,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 150,
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
