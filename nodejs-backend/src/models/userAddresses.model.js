module.exports = function (app) {
  const modelName = "user_addresses";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "users" },
      Street1: {
        type: String,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      Street2: {
        type: String,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      Poscode: {
        type: String,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      City: {
        type: String,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      State: {
        type: String,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      Province: {
        type: String,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      Country: {
        type: String,
        maxLength: 1000,
        index: true,
        trim: true,
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
