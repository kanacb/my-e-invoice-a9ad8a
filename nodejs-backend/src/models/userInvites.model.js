module.exports = function (app) {
  const modelName = "user_invites";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // schema for userInvites model
  const schema = new Schema(
    {
      emailToInvite: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: null,
        maxLength: null,
        index: false,
        trim: false,
      },
      status: { type: Boolean, default: false },
      code: { type: Number, min: 0, max: 1000000 },
      position: {
        type: Schema.Types.ObjectId,
        ref: "positions",
      },
      role: {
        type: Schema.Types.ObjectId,
        ref: "roles",
      },
      sendMailCounter: {
        type: Number,

        min: 0,
        max: 10000000,
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
