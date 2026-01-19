module.exports = function (app) {
  const modelName = "inbox";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  // Define the schema for the "inbox" model
  const schema = new Schema(
    {
      from: { type: Schema.Types.ObjectId, ref: "users", required: true },
      toUser: { type: Schema.Types.ObjectId, ref: "users", required: true },
      subject: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      content: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      service: {
        type: String,

        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      read: { type: Boolean, default: false },
      flagged: { type: Boolean, default: false },
      sent: { type: Date, required: false },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
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
