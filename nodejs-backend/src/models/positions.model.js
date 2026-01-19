module.exports = function (app) {
  const modelName = "positions";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      roleId: { type: Schema.Types.ObjectId, ref: "roles", required: true },
      name: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      description: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 3,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      abbr: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
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
