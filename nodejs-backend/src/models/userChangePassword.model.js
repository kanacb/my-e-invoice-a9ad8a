module.exports = function (app) {
  const modelName = "user_change_password";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for user_change_password model
  const schema = new Schema(
    {
      userEmail: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      server: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      environment: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      code: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      status: { type: Boolean, default: false },
      sendEmailCounter: {
        type: Number,

        min: 0,
        max: 1000000,
        default: 0,
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
